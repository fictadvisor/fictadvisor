import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import type { UserHit, VisitorHit, VisitorKind } from './metrics.service';

// Visitor statistics live in memory on the hot request path, which means every
// API restart — and the API is restarted by watchtower on every deploy, several
// times on a busy day — used to zero the 24h breakdowns. This store keeps a
// snapshot of that state in Redis so a restart resumes where it left off.
//
// Redis is optional: with REDIS_URL unset (unit tests, local runs) the store is
// disabled and the metrics behave exactly as before, in memory only. It also
// deliberately reads process.env directly instead of ConfigService — MetricsModule
// is @Global and gets pulled into narrow test modules that never set up
// @nestjs/config, so anything it provides must resolve without one.
const REDIS_URL = 'REDIS_URL';

// How often the in-memory maps are written to Redis. The maps stay the source of
// truth and the request path never touches Redis, so this is the only cost — and
// the only loss window if the process is killed without running its shutdown hook.
const DEFAULT_FLUSH_INTERVAL_MS = 60 * 1000;

// Ceiling on how long we wait for Redis at startup before giving up and starting
// with empty maps. This runs before the HTTP server listens, so it is added to
// startup time on every deploy when Redis is genuinely down — kept short for that
// reason. Redis is a `depends_on` of the API and connects in well under a second.
const READY_TIMEOUT_MS = 5 * 1000;

// Snapshots outlive the retention window by enough to survive a long outage, but
// not forever: a key orphaned by a renamed prefix expires on its own.
const SNAPSHOT_TTL_SECONDS = 48 * 60 * 60;

// One serialized copy of each in-memory map. Stored as three plain JSON strings
// rather than Redis hashes: the maps are small (bounded by MAX_TRACKED) and are
// always read and written whole, so three GETs and three SETs beat field-level
// bookkeeping.
export interface MetricsSnapshot {
  visitors: Array<[string, VisitorHit]>;
  users: Array<[string, UserHit]>;
  seen: Array<[string, { lastSeen: number; kind: VisitorKind }]>;
}

type SnapshotPart = keyof MetricsSnapshot;

const PARTS: readonly SnapshotPart[] = ['visitors', 'users', 'seen'];

@Injectable()
export class MetricsStore {
  private readonly logger = new Logger(MetricsStore.name);
  private readonly client?: Redis;
  private readonly prefix: string;

  readonly flushIntervalMs: number;

  constructor () {
    const url = process.env[REDIS_URL];
    // The prefix keeps the prod and dev APIs apart when they share one Redis;
    // a database index in the URL (redis://redis:6379/1) works just as well.
    this.prefix = process.env.METRICS_REDIS_PREFIX || 'fa:metrics';
    this.flushIntervalMs =
      parseInt(process.env.METRICS_FLUSH_INTERVAL_MS ?? '') || DEFAULT_FLUSH_INTERVAL_MS;

    if (!url) return;

    this.client = new Redis(url, {
      // Snapshots are periodic and idempotent, so a failed write is never worth
      // queueing or retrying for long — the next flush carries the same state.
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 3000,
      retryStrategy: (times) => Math.min(times * 1000, 30 * 1000),
    });
    // ioredis turns an unhandled 'error' into a process-level crash, and a
    // metrics side-channel must never be able to take the API down.
    this.client.on('error', (error: Error) => this.logConnectionIssue(error));
  }

  get enabled (): boolean {
    return !!this.client;
  }

  // Reads the snapshot written by the previous run. Returns null when the store
  // is disabled, Redis is unreachable, or nothing has been persisted yet — all
  // of which just mean "start with empty maps".
  async load (): Promise<MetricsSnapshot | null> {
    if (!this.client) return null;

    try {
      await this.waitUntilReady();
      const raw = await this.client.mget(PARTS.map((part) => this.key(part)));
      if (raw.every((value) => value === null)) return null;

      const snapshot = {} as MetricsSnapshot;
      PARTS.forEach((part, index) => {
        (snapshot[part] as unknown) = this.parse(raw[index], part);
      });
      return snapshot;
    } catch (error) {
      this.logger.warn(`Could not load the metrics snapshot: ${(error as Error).message}`);
      return null;
    }
  }

  // Overwrites the stored snapshot. Failures are logged and swallowed: losing one
  // flush costs at most the requests recorded since the previous one.
  async save (snapshot: MetricsSnapshot): Promise<void> {
    if (!this.client) return;

    try {
      const pipeline = this.client.pipeline();
      for (const part of PARTS) {
        pipeline.set(this.key(part), JSON.stringify(snapshot[part]), 'EX', SNAPSHOT_TTL_SECONDS);
      }
      await pipeline.exec();
    } catch (error) {
      this.logger.warn(`Could not save the metrics snapshot: ${(error as Error).message}`);
    }
  }

  async disconnect (): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.quit();
    } catch {
      this.client.disconnect();
    }
  }

  private key (part: SnapshotPart): string {
    return `${this.prefix}:${part}`;
  }

  private parse (raw: string | null, part: SnapshotPart): unknown[] {
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // A snapshot written by an older, incompatible version of this code is not
      // worth failing a boot over — drop that part and carry on.
      this.logger.warn(`Discarded an unreadable metrics snapshot part: ${part}`);
      return [];
    }
  }

  private waitUntilReady (): Promise<void> {
    const client = this.client!;
    if (client.status === 'ready') return Promise.resolve();

    return new Promise((resolve, reject) => {
      const finish = (error?: Error) => {
        clearTimeout(timer);
        client.off('ready', onReady);
        if (error) reject(error); else resolve();
      };
      const onReady = () => finish();
      const timer = setTimeout(
        () => finish(new Error(`Redis was not ready within ${READY_TIMEOUT_MS}ms`)),
        READY_TIMEOUT_MS,
      );
      client.once('ready', onReady);
    });
  }

  // Connection errors arrive once per reconnect attempt, which is once every
  // 30s at worst — noisy enough to collapse into a single line per minute.
  private lastConnectionLogAt = 0;

  private logConnectionIssue (error: Error): void {
    const now = Date.now();
    if (now - this.lastConnectionLogAt < 60 * 1000) return;
    this.lastConnectionLogAt = now;
    this.logger.warn(`Metrics Redis is unavailable: ${error.message}`);
  }
}
