import { Body, Controller, Get, INestApplication, NotFoundException, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import request from 'supertest';
import { MetricsService } from '../../src/modules/metrics/metrics.service';
import { rejectedRequestsMiddleware } from '../../src/modules/metrics/rejected-requests.middleware';

@Controller()
class ProbeController {
  @Get('ok')
  ok () {
    return { ok: true };
  }

  @Post('echo')
  echo (@Body() body: unknown) {
    return body;
  }

  @Get('missing-thing')
  missing () {
    throw new NotFoundException('no such thing');
  }
}

// Scanner traffic -- unknown paths, oversized bodies -- never reaches a route,
// so HttpMetricsInterceptor can't see it. The middleware is registered the way
// main.ts does it: app.use() before init(), ahead of Nest's parsers and 404.
describe('rejectedRequestsMiddleware', () => {
  let app: INestApplication;
  let metrics: MetricsService;
  let warn: jest.SpyInstance;

  const rejected = async (status: string, method: string) => {
    const metric = await metrics.httpRejectedRequestsTotal.get();
    return metric.values.find(
      (v) => v.labels.status_code === status && v.labels.method === method,
    )?.value ?? 0;
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProbeController],
    }).compile();

    app = moduleRef.createNestApplication({ logger: false });
    metrics = new MetricsService();
    app.use(rejectedRequestsMiddleware(metrics));
    await app.init();
  });

  afterAll(() => app.close());

  beforeEach(() => {
    metrics.httpRejectedRequestsTotal.reset();
    warn = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it('counts and logs a 404 for a path the API does not have', async () => {
    await request(app.getHttpServer())
      .get('/healthz?token=secret')
      .set('X-Forwarded-For', '203.0.113.7, 10.0.0.1')
      .set('User-Agent', 'zgrab/0.x')
      .expect(404);

    expect(await rejected('404', 'GET')).toBe(1);
    expect(warn).toHaveBeenCalledTimes(1);
    const line = warn.mock.calls[0][0] as string;
    expect(line).toContain('404 GET /healthz ip=203.0.113.7');
    expect(line).toContain('ua="zgrab/0.x"');
    expect(line).not.toContain('secret');
  });

  it('counts a body-parser 413 that never reaches routing', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ blob: 'x'.repeat(200 * 1024) }))
      .expect(413);

    expect(await rejected('413', 'POST')).toBe(1);
  });

  it('counts malformed JSON on a real route, rejected before routing', async () => {
    await request(app.getHttpServer())
      .post('/echo')
      .set('Content-Type', 'application/json')
      .send('{"a":')
      .expect(400);

    expect(await rejected('400', 'POST')).toBe(1);
  });

  it('leaves matched routes to the interceptor, whatever their status', async () => {
    await request(app.getHttpServer()).get('/ok').expect(200);
    await request(app.getHttpServer()).get('/missing-thing').expect(404);

    expect((await metrics.httpRejectedRequestsTotal.get()).values).toHaveLength(0);
    expect(warn).not.toHaveBeenCalled();
  });
});
