import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { MetricsService } from './metrics.service';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor (
    private readonly metrics: MetricsService,
    private readonly jwt: JwtService,
  ) {}

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

    const user = this.identifyUser(req);
    this.metrics.recordVisitor({
      userId: user.userId,
      username: user.username,
      ip: user.userId ? undefined : this.clientIp(req),
    });

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

  // Identifies the logged-in user, if any. On guarded routes the auth guard has
  // already populated `req.user`. On public routes there is no guard, but the
  // SPA still sends the Bearer token on every request, so we verify it here.
  // The signature is checked (an attacker can't forge a username, unlike an
  // X-Forwarded-For header); expiry is ignored because we only need identity for
  // attribution, not authorization.
  private identifyUser (req: any): { userId?: string; username?: string } {
    if (req.user?.id) {
      return { userId: req.user.id, username: req.user.username };
    }
    const token = this.bearerToken(req);
    if (!token) return {};
    try {
      const payload = this.jwt.verify(token, { ignoreExpiration: true });
      if (payload?.sub) {
        return { userId: payload.sub, username: payload.username };
      }
    } catch {
      // Invalid / forged token -> treat as anonymous.
    }
    return {};
  }

  private bearerToken (req: any): string | undefined {
    const header = req.headers?.authorization;
    if (typeof header !== 'string') return undefined;
    const [scheme, value] = header.split(' ');
    // The web client sends the literal "Bearer undefined" when logged out.
    if (scheme?.toLowerCase() !== 'bearer' || !value || value === 'undefined') {
      return undefined;
    }
    return value;
  }

  // The API sits behind a reverse proxy (nginx) behind Cloudflare, so `req.ip`
  // is the proxy address. The first hop of X-Forwarded-For is the real client:
  // for direct browser->CF->API calls CF sets it, and for Next.js SSR calls the
  // web app forwards the visitor's IP into it on purpose (see web instance.ts).
  // Falls back to CF-Connecting-IP, then the socket, when XFF is absent.
  private clientIp (req: any): string | undefined {
    const forwarded = req.headers?.['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length) {
      return forwarded.split(',')[0].trim();
    }
    if (Array.isArray(forwarded) && forwarded.length) {
      return forwarded[0];
    }
    const cfIp = req.headers?.['cf-connecting-ip'];
    if (typeof cfIp === 'string' && cfIp.length) {
      return cfIp;
    }
    return req.ip ?? req.socket?.remoteAddress;
  }
}
