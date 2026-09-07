import { Injectable, OnModuleInit } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
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

// A transaction is ambient rather than threaded through arguments. `PrismaRepository`
// binds its model delegate once, in the constructor (`super(prisma.teacher, ...)`),
// across 21 repositories, so passing a `tx` client down to every call site would have
// meant touching all of them and every method in between. Instead the delegates handed
// out below resolve their client at *call* time: the transaction's when this store
// holds one, the base client's otherwise. A `transaction()` callback therefore covers
// everything it touches, however deep, with no change to any repository.
type TransactionClient = Record<string, any>;
const transactionStore = new AsyncLocalStorage<TransactionClient>();

export interface TransactionOptions {
  timeout?: number;
  maxWait?: number;
}

// Prisma defaults to 5s, which a single group's schedule import (~80-100 queries) can
// out-run on a slow night; the wait is what a caller spends queuing for a pool slot.
const DEFAULT_TIMEOUT_MS = 30 * 1000;
const DEFAULT_MAX_WAIT_MS = 10 * 1000;

function isModelDelegate (value: unknown): boolean {
  return !!value && typeof value === 'object' &&
    typeof (value as Record<string, unknown>).findFirst === 'function';
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Served by the proxy below, declared here so callers can see it on the type.
  transaction!: <T> (work: () => Promise<T>, options?: TransactionOptions) => Promise<T>;

  constructor (private readonly metrics: MetricsService) {
    super({
      adapter: new PrismaPg({ connectionString, max: poolMax(connectionString) }),
    });

    // `$extends` returns a *new* client and never mutates `this`, so the model
    // delegates the repositories read (`prisma.user`, ...) must come from the
    // extended client. Return a Proxy that serves the extended client for
    // everything except the Nest lifecycle hook defined on this class.
    const extended = this.$extends(createMetricsExtension(this.metrics));
    const delegates = new Map<string, unknown>();

    const runTransaction = async <T> (
      work: () => Promise<T>,
      options?: TransactionOptions,
    ): Promise<T> => {
      // Nesting joins the transaction already in progress instead of opening a second
      // one, so a helper that transacts stays safe to call from inside a larger unit.
      if (transactionStore.getStore()) return work();

      return (extended as any).$transaction(
        (tx: TransactionClient) => transactionStore.run(tx, work),
        { timeout: DEFAULT_TIMEOUT_MS, maxWait: DEFAULT_MAX_WAIT_MS, ...options },
      );
    };

    return new Proxy(extended, {
      get: (target, property, receiver) => {
        if (property === 'onModuleInit') return this.onModuleInit.bind(this);
        if (property === 'transaction') return runTransaction;

        const value = Reflect.get(target, property, receiver);
        if (typeof property !== 'string' || !isModelDelegate(value)) return value;

        if (!delegates.has(property)) {
          delegates.set(property, new Proxy(value as object, {
            get: (base, method) => {
              const active = transactionStore.getStore();
              const delegate = (active?.[property] ?? base) as Record<string, any>;
              const resolved = delegate[method as string];
              return typeof resolved === 'function' ? resolved.bind(delegate) : resolved;
            },
          }));
        }
        return delegates.get(property);
      },
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
