import { Injectable, OnModuleInit } from '@nestjs/common';
import { MetricsService, UserIdentity } from '../../modules/metrics/metrics.service';
import { PrismaService } from './prisma.service';

// Gives the per-user metrics table its human-readable labels: the username
// (or email, for accounts that never set one) and the group the user studies
// in. MetricsService can't look these up itself — PrismaModule imports
// MetricsModule, not the other way round — so the dependency is inverted: this
// provider lives on the database side and hands the metrics service a resolver
// callback at startup.
@Injectable()
export class MetricsUserResolver implements OnModuleInit {
  constructor (
    private readonly prisma: PrismaService,
    private readonly metrics: MetricsService,
  ) {}

  onModuleInit () {
    this.metrics.setIdentityResolver((userIds) => this.resolve(userIds));
  }

  // Called off the request path, at most once per scrape and only for users
  // whose identity is missing or stale, so a single batched query is enough.
  private async resolve (userIds: string[]): Promise<Map<string, UserIdentity>> {
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
        email: true,
        student: {
          select: {
            group: { select: { code: true } },
          },
        },
      },
    });

    return new Map(users.map(({ id, username, email, student }) => [
      id,
      { label: username || email, group: student?.group?.code },
    ]));
  }
}
