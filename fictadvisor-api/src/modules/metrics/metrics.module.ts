import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { HttpMetricsInterceptor } from './http-metrics.interceptor';

@Global()
@Module({
  imports: [
    // No secret is configured here on purpose: this module is global and pulled
    // into narrow unit-test contexts that don't set up @nestjs/config, so it must
    // not depend on ConfigService. The interceptor passes the secret (read from
    // the same env var as the auth strategy) to verify() at request time instead.
    JwtModule.register({}),
  ],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpMetricsInterceptor,
    },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
