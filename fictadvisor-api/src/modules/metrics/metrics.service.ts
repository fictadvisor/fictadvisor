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

// Upper bound on distinct client IPs tracked at once for the per-IP breakdown.
// Unlike the hashed unique-visitor count, this metric carries the raw IP as a
// Prometheus label, so its cardinality must be capped: a scanner or botnet
// could otherwise spray thousands of unique source IPs and blow up the series
// count on both the app and Prometheus. Once full, new IPs are dropped (known
// IPs keep updating) until the retention sweep frees space.
const MAX_TRACKED_IPS = 5000;
const UNKNOWN_COUNTRY = 'unknown';

interface VisitorHit {
  count: number;
  lastSeen: number;
  country: string;
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

  // Hashed client id -> last-seen epoch ms. Prometheus can't count uniques via
  // labels (cardinality blows up), so we keep the set here and expose only its
  // size per window as a gauge. Pruned on every scrape, bounded by retention.
  private readonly visitorLastSeen = new Map<string, number>();

  // Raw client IP -> request count / last-seen / resolved country, for the
  // per-IP breakdown table. Bounded by MAX_TRACKED_IPS and by the retention
  // sweep in the gauge's collect() hook.
  private readonly visitorHits = new Map<string, VisitorHit>();

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

    // Distinct client IPs (hashed) seen within each rolling window. Recomputed
    // from `visitorLastSeen` at scrape time, which also prunes stale entries.
    this.uniqueVisitors = new Gauge({
      name: 'http_unique_visitors',
      help: 'Number of distinct client IPs seen within a rolling time window',
      labelNames: ['window'],
      registers: [this.registry],
      collect: () => {
        const now = Date.now();
        const counts = new Map(VISITOR_WINDOWS.map((w) => [w.label, 0]));
        for (const [id, lastSeen] of this.visitorLastSeen) {
          const age = now - lastSeen;
          if (age > VISITOR_RETENTION_MS) {
            this.visitorLastSeen.delete(id);
            continue;
          }
          for (const w of VISITOR_WINDOWS) {
            if (age <= w.ms) counts.set(w.label, counts.get(w.label) + 1);
          }
        }
        for (const w of VISITOR_WINDOWS) {
          this.uniqueVisitors.set({ window: w.label }, counts.get(w.label));
        }
      },
    });

    // Per-IP request counts within the retention window, labelled with the raw
    // client IP and its GeoIP-resolved country. Recomputed from `visitorHits`
    // at scrape time; the map is fully re-emitted each collect so pruned IPs
    // drop out of the exposition instead of lingering as stale series.
    this.visitorRequests = new Gauge({
      name: 'http_visitor_requests',
      help: 'Requests per distinct client IP within the retention window, labelled by IP and country',
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
  }

  // Records one hit from a client identifier (its IP). Feeds two metrics:
  //  - the hashed unique-visitor counts (raw IP never retained there), and
  //  - the per-IP breakdown, which intentionally keeps the raw IP + country.
  recordVisitor (clientId: string | undefined): void {
    if (!clientId) return;

    const hash = createHash('sha256').update(clientId).digest('hex').slice(0, 16);
    this.visitorLastSeen.set(hash, Date.now());

    const existing = this.visitorHits.get(clientId);
    if (existing) {
      existing.count += 1;
      existing.lastSeen = Date.now();
    } else if (this.visitorHits.size < MAX_TRACKED_IPS) {
      this.visitorHits.set(clientId, {
        count: 1,
        lastSeen: Date.now(),
        country: geoip.lookup(clientId)?.country || UNKNOWN_COUNTRY,
      });
    }
  }
}
