import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, State } from '@prisma-client/fictadvisor';
import { PrismaPg } from '@prisma/adapter-pg';
import { MetricsService } from '../../modules/metrics/metrics.service';
import { createMetricsExtension } from './prisma-metrics.extension';

const connectionString = process.env.FICTADVISOR_DATABASE_URL;

// Prisma 7 connects through a driver adapter (node-postgres) rather than a URL
// in the schema. The pool size used to be expressed via the `connection_limit`
// query param on the URL, so preserve that knob by mapping it to pg's `max`.
function poolMax (url?: string): number | undefined {
  const match = url ? /[?&]connection_limit=(\d+)/.exec(url) : null;
  return match ? Number(match[1]) : undefined;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor (private readonly metrics: MetricsService) {
    super({
      adapter: new PrismaPg({ connectionString, max: poolMax(connectionString) }),
    });

    // `$extends` returns a *new* client and never mutates `this`, so the model
    // delegates the repositories read (`prisma.user`, ...) must come from the
    // extended client. Return a Proxy that serves the extended client for
    // everything except the Nest lifecycle hook defined on this class.
    const extended = this.$extends(createMetricsExtension(this.metrics));
    return new Proxy(extended, {
      get: (target, property, receiver) =>
        property === 'onModuleInit'
          ? this.onModuleInit.bind(this)
          : Reflect.get(target, property, receiver),
    }) as unknown as PrismaService;
  }

  async onModuleInit () {
    await this.$connect();
    await this.user.deleteMany({
      where: {
        state: State.PENDING,
        password: {
          not: {
            equals: null,
          },
        },
      },
    });
  }
}
