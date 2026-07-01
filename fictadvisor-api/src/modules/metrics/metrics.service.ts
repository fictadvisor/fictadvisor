import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { collectDefaultMetrics, Counter, Gauge, Histogram, Registry } from 'prom-client';

// Rolling windows over which distinct visitors are counted. Ordered so the
// largest one doubles as the retention horizon for the last-seen map.
const VISITOR_WINDOWS: ReadonlyArray<{ label: string; ms: number }> = [
  { label: '5m', ms: 5 * 60 * 1000 },
  { label: '1h', ms: 60 * 60 * 1000 },
  { label: '24h', ms: 24 * 60 * 60 * 1000 },
];
const VISITOR_RETENTION_MS = VISITOR_WINDOWS[VISITOR_WINDOWS.length - 1].ms;

@Injectable()
export class MetricsService {
  readonly registry = new Registry();
  readonly httpRequestDuration: Histogram<string>;
  readonly httpRequestsTotal: Counter<string>;
  readonly prismaQueryDuration: Histogram<string>;
  readonly prismaQueriesTotal: Counter<string>;
  readonly uniqueVisitors: Gauge<string>;

  // Hashed client id -> last-seen epoch ms. Prometheus can't count uniques via
  // labels (cardinality blows up), so we keep the set here and expose only its
  // size per window as a gauge. Pruned on every scrape, bounded by retention.
  private readonly visitorLastSeen = new Map<string, number>();

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
        const counts = new Map(VISITOR_WINDOWS.map(w => [w.label, 0]));
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
  }

  // Records one hit from a client identifier (its IP). The value is hashed so
  // raw IPs are never retained in memory or exposed on the metrics endpoint.
  recordVisitor (clientId: string | undefined): void {
    if (!clientId) return;
    const hash = createHash('sha256').update(clientId).digest('hex').slice(0, 16);
    this.visitorLastSeen.set(hash, Date.now());
  }
}
