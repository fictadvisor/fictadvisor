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

    this.metrics.recordVisitor(this.clientIp(req));

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

  // The API sits behind a reverse proxy, so `req.ip` is the proxy address.
  // Prefer the first hop in X-Forwarded-For (the real client) when present.
  private clientIp (req: any): string | undefined {
    const forwarded = req.headers?.['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length) {
      return forwarded.split(',')[0].trim();
    }
    if (Array.isArray(forwarded) && forwarded.length) {
      return forwarded[0];
    }
    return req.ip ?? req.socket?.remoteAddress;
  }
}
