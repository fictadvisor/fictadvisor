import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricsService } from './metrics.service';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor (private readonly metrics: MetricsService) {}

  intercept (context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();

    // Don't measure the scrape endpoint itself.
    if (req.url?.startsWith('/metrics')) {
      return next.handle();
    }

    const stopTimer = this.metrics.httpRequestDuration.startTimer();

    // 'finish' fires after the exception filter has set the final status code,
    // so labels reflect the real response.
    res.once('finish', () => {
      const route: string =
        req.route?.path ?? req.url?.split('?')[0] ?? 'unknown';
      const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
      };
      stopTimer(labels);
      this.metrics.httpRequestsTotal.inc(labels);
    });

    return next.handle();
  }
}
