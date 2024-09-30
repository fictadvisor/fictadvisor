import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { PrismaService } from '../../database/PrismaService';

@ApiTags('Health')
@Controller({
  version: '2',
  path: '/health',
})
export class HealthController {
  constructor (
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @ApiEndpoint({
    summary: 'Healthcheck endpoint',
  })
  @Get()
  @HealthCheck()
  async healthCheck () {
    return this.health.check([
      () => this.db.pingCheck('database', this.prisma),
    ]);
  }
}