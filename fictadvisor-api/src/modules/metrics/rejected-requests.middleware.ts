import { Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { MetricsService } from './metrics.service';
import { clientIp } from './client-ip';

const logger = new Logger('RejectedRequest');

// Long enough to recognise a probe, short enough that a crafted URL can't bloat a log line.
const MAX_LOGGED_PATH = 200;
const MAX_LOGGED_USER_AGENT = 200;

// Counts and logs requests that were answered with an error without ever
// reaching a route: 404s for paths we don't have, and anything Express
// middleware turned away first (body-parser's 413 for an oversized body, ...).
// That is what scanners produce, and none of it reaches HttpMetricsInterceptor,
// which only runs for matched routes -- so without this they leave no trace in
// Prometheus, and the IP and User-Agent are in no log we keep.
//
// It has to be a plain Express middleware registered in main.ts with app.use():
// Nest adds body-parser and its 404 handler in init(), i.e. during listen(), so
// everything registered before that runs ahead of them and sees every request.
export function rejectedRequestsMiddleware (metrics: MetricsService) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.once('finish', () => {
      // A matched route is HttpMetricsInterceptor's to record, whatever its status.
      if (req.route || res.statusCode < 400) return;

      const status = String(res.statusCode);
      metrics.httpRejectedRequestsTotal.inc({ method: req.method, status_code: status });

      // Path only: a query string can carry tokens.
      const path = (req.originalUrl ?? req.url ?? '').split('?')[0].slice(0, MAX_LOGGED_PATH);
      const userAgent = String(req.headers['user-agent'] ?? '-').slice(0, MAX_LOGGED_USER_AGENT);
      const bodyBytes = req.headers['content-length'] ?? '-';

      logger.warn(
        `${status} ${req.method} ${path} ip=${clientIp(req) ?? '-'} ` +
        `body=${bodyBytes} ua="${userAgent}"`,
      );
    });
    next();
  };
}
