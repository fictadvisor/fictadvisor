import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Counter, Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService {
  readonly registry = new Registry();
  readonly httpRequestDuration: Histogram<string>;
  readonly httpRequestsTotal: Counter<string>;
  readonly prismaQueryDuration: Histogram<string>;
  readonly prismaQueriesTotal: Counter<string>;

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
  }
}
