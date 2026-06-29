import { Prisma } from '@prisma-client/fictadvisor';
import { MetricsService } from '../../modules/metrics/metrics.service';

// Prisma Client extension that records latency and counts for every model
// operation, labelled by model (e.g. User) and action (findMany, create, ...).
// `$allOperations` wraps each top-level repository query exactly once.
// See https://www.prisma.io/docs/orm/prisma-client/client-extensions/query
export function createMetricsExtension (metrics: MetricsService) {
  return Prisma.defineExtension({
    name: 'metrics',
    query: {
      $allModels: {
        async $allOperations ({ model, operation, args, query }) {
          const stopTimer = metrics.prismaQueryDuration.startTimer();

          try {
            const result = await query(args);
            const labels = { model, action: operation, status: 'success' };
            stopTimer(labels);
            metrics.prismaQueriesTotal.inc(labels);
            return result;
          } catch (error) {
            const labels = { model, action: operation, status: 'error' };
            stopTimer(labels);
            metrics.prismaQueriesTotal.inc(labels);
            throw error;
          }
        },
      },
    },
  });
}
