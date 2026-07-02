import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import geoip from 'geoip-lite';
import { collectDefaultMetrics, Counter, Gauge, Histogram, Registry } from 'prom-client';

// Rolling windows over which distinct visitors are counted. Ordered so the
// largest one doubles as the retention horizon for the last-seen map.
const VISITOR_WINDOWS: ReadonlyArray<{ label: string; ms: number }> = [
  { label: '5m', ms: 5 * 60 * 1000 },
  { label: '1h', ms: 60 * 60 * 1000 },
  { label: '24h', ms: 24 * 60 * 60 * 1000 },
];
const VISITOR_RETENTION_MS = VISITOR_WINDOWS[VISITOR_WINDOWS.length - 1].ms;

// Upper bound on distinct identities tracked at once for the per-identity
// breakdowns (per-user and per-IP). These carry the raw user/IP as a Prometheus
// label, so cardinality must be capped: a scanner or botnet could otherwise
// spray thousands of unique source IPs and blow up the series count on both the
// app and Prometheus. Once full, new identities are dropped (known ones keep
// updating) until the retention sweep frees space.
const MAX_TRACKED = 5000;
const UNKNOWN_COUNTRY = 'unknown';

// A distinct visitor is either an authenticated user (counted by user id, so
// they count once across devices/IPs) or an anonymous client (counted by IP).
type VisitorKind = 'user' | 'anon';

interface VisitorHit {
  count: number;
  lastSeen: number;
  country: string;
}

interface UserHit {
  count: number;
  lastSeen: number;
  username: string;
}

// Internal / infrastructure traffic (Docker bridge, loopback, private LAN) is
// not a real visitor and must never appear in the visitor metrics — otherwise
// the in-cluster fa-bot (172.18.x) and health checks (127.0.0.1) drown out the
// actual users. Covers loopback, RFC1918, link-local, CGNAT and IPv6 ULA.
function isInternalIp (ip: string): boolean {
  const v = ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  return (
    v === '127.0.0.1' ||
    v === '::1' ||
    v === 'localhost' ||
    /^10\./.test(v) ||
    /^192\.168\./.test(v) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(v) || // 172.16.0.0/12 (Docker bridges live here)
    /^169\.254\./.test(v) ||
    /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(v) || // 100.64.0.0/10 CGNAT
    v.startsWith('fc') ||
    v.startsWith('fd')
  );
}

@Injectable()
export class MetricsService {
  readonly registry = new Registry();
  readonly httpRequestDuration: Histogram<string>;
  readonly httpRequestsTotal: Counter<string>;
  readonly prismaQueryDuration: Histogram<string>;
  readonly prismaQueriesTotal: Counter<string>;
  readonly uniqueVisitors: Gauge<string>;
  readonly visitorRequests: Gauge<string>;
  readonly userRequests: Gauge<string>;

  // Hashed identity -> { last-seen epoch ms, kind }. Prometheus can't count
  // uniques via labels (cardinality blows up), so we keep the set here and
  // expose only its size per window/kind as a gauge. The identity is the user
  // id for logged-in requests and the client IP for anonymous ones, so the
  // unique count is (distinct logged-in users) + (distinct anonymous IPs).
  // Pruned on every scrape, bounded by retention.
  private readonly visitorLastSeen = new Map<string, { lastSeen: number; kind: VisitorKind }>();

  // Raw client IP -> request count / last-seen / resolved country, for the
  // anonymous per-IP breakdown table. Bounded by MAX_TRACKED and by the
  // retention sweep in the gauge's collect() hook.
  private readonly visitorHits = new Map<string, VisitorHit>();

  // User id -> request count / last-seen / username, for the per-user breakdown
  // table. Same bounds as visitorHits.
  private readonly userHits = new Map<string, UserHit>();

  constructor () {
    this.registry.setDefaultLabels({ app: 'fictadvisor-api' });

    // Node.js process / runtime metrics (cpu, memory, event loop lag, gc, ...)
    collectDefaultMetrics({ register: this.registry });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      registers: [this.registry],
    });

    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    // Prisma repository / query metrics, recorded via a client middleware.
    // `model` is the Prisma model (e.g. user), `action` is the operation
    // (findMany, create, updateMany, ...), `status` is success | error.
    this.prismaQueryDuration = new Histogram({
      name: 'prisma_query_duration_seconds',
      help: 'Duration of Prisma queries in seconds',
      labelNames: ['model', 'action', 'status'],
      buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
      registers: [this.registry],
    });

    this.prismaQueriesTotal = new Counter({
      name: 'prisma_queries_total',
      help: 'Total number of Prisma queries',
      labelNames: ['model', 'action', 'status'],
      registers: [this.registry],
    });

    // Distinct visitors seen within each rolling window, split by kind
    // (logged-in user vs anonymous IP). Recomputed from `visitorLastSeen` at
    // scrape time, which also prunes stale entries. Summing over `kind` gives
    // the total unique-visitor count.
    this.uniqueVisitors = new Gauge({
      name: 'http_unique_visitors',
      help: 'Distinct visitors within a rolling window, by kind (logged-in user vs anonymous IP)',
      labelNames: ['window', 'kind'],
      registers: [this.registry],
      collect: () => {
        const now = Date.now();
        const kinds: VisitorKind[] = ['user', 'anon'];
        const counts = new Map<string, number>();
        for (const w of VISITOR_WINDOWS) {
          for (const k of kinds) counts.set(`${w.label}|${k}`, 0);
        }
        for (const [id, entry] of this.visitorLastSeen) {
          const age = now - entry.lastSeen;
          if (age > VISITOR_RETENTION_MS) {
            this.visitorLastSeen.delete(id);
            continue;
          }
          for (const w of VISITOR_WINDOWS) {
            if (age <= w.ms) {
              const key = `${w.label}|${entry.kind}`;
              counts.set(key, counts.get(key) + 1);
            }
          }
        }
        this.uniqueVisitors.reset();
        for (const w of VISITOR_WINDOWS) {
          for (const k of kinds) {
            this.uniqueVisitors.set({ window: w.label, kind: k }, counts.get(`${w.label}|${k}`));
          }
        }
      },
    });

    // Per-IP request counts for anonymous visitors within the retention window,
    // labelled with the raw client IP and its GeoIP-resolved country. Recomputed
    // from `visitorHits` at scrape time; the map is fully re-emitted each collect
    // so pruned IPs drop out of the exposition instead of lingering as stale
    // series.
    this.visitorRequests = new Gauge({
      name: 'http_visitor_requests',
      help: 'Requests per anonymous client IP within the retention window, labelled by IP and country',
      labelNames: ['ip', 'country'],
      registers: [this.registry],
      collect: () => {
        const now = Date.now();
        this.visitorRequests.reset();
        for (const [ip, hit] of this.visitorHits) {
          if (now - hit.lastSeen > VISITOR_RETENTION_MS) {
            this.visitorHits.delete(ip);
            continue;
          }
          this.visitorRequests.set({ ip, country: hit.country }, hit.count);
        }
      },
    });

    // Per-user request counts for authenticated visitors within the retention
    // window, labelled with the username. Same re-emit/prune scheme as above.
    this.userRequests = new Gauge({
      name: 'http_user_requests',
      help: 'Requests per authenticated user within the retention window, labelled by username',
      labelNames: ['user'],
      registers: [this.registry],
      collect: () => {
        const now = Date.now();
        this.userRequests.reset();
        for (const [id, hit] of this.userHits) {
          if (now - hit.lastSeen > VISITOR_RETENTION_MS) {
            this.userHits.delete(id);
            continue;
          }
          this.userRequests.set({ user: hit.username }, hit.count);
        }
      },
    });
  }

  // Records one hit. Authenticated requests (identified by a verified JWT) are
  // attributed to the user; everyone else to their client IP. Internal
  // infrastructure IPs are ignored entirely. Each request feeds:
  //  - the unique-visitor windows (deduplicated by user id or IP), and
  //  - exactly one per-identity breakdown (per-user OR per-IP).
  recordVisitor (visitor: { userId?: string; username?: string; ip?: string }): void {
    const now = Date.now();

    if (visitor.userId) {
      this.visitorLastSeen.set(this.hashId(`u:${visitor.userId}`), { lastSeen: now, kind: 'user' });
      const existing = this.userHits.get(visitor.userId);
      if (existing) {
        existing.count += 1;
        existing.lastSeen = now;
        if (visitor.username) existing.username = visitor.username;
      } else if (this.userHits.size < MAX_TRACKED) {
        this.userHits.set(visitor.userId, {
          count: 1,
          lastSeen: now,
          username: visitor.username || visitor.userId,
        });
      }
      return;
    }

    const ip = visitor.ip;
    if (!ip || isInternalIp(ip)) return;

    this.visitorLastSeen.set(this.hashId(`i:${ip}`), { lastSeen: now, kind: 'anon' });
    const existing = this.visitorHits.get(ip);
    if (existing) {
      existing.count += 1;
      existing.lastSeen = now;
    } else if (this.visitorHits.size < MAX_TRACKED) {
      this.visitorHits.set(ip, {
        count: 1,
        lastSeen: now,
        country: geoip.lookup(ip)?.country || UNKNOWN_COUNTRY,
      });
    }
  }

  // Short, stable hash used only to key the unique-visitor set (never exposed).
  private hashId (id: string): string {
    return createHash('sha256').update(id).digest('hex').slice(0, 16);
  }
}
