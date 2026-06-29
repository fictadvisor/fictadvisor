import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, State } from '@prisma-client/fictadvisor';
import { MetricsService } from '../../modules/metrics/metrics.service';
import { createMetricsExtension } from './prisma-metrics.extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor (private readonly metrics: MetricsService) {
    super();

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
