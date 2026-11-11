import { Body, Controller, INestApplication, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { TelegramAPI } from '../../src/modules/telegram-api/telegram-api';
import { clientErrorStatus } from '../../src/common/utils/error-status.util';
import { deployEnvLabel } from '../../src/common/utils/deploy-env.util';

@Controller()
class EchoController {
  @Post('echo')
  echo (@Body() body: unknown) {
    return body;
  }

  @Post('boom')
  boom () {
    throw new Error('kaboom');
  }
}

// Body-parser rejects these before any route runs, with `http-errors` objects
// rather than Nest HttpExceptions. They used to come back as 500 and land in
// the Telegram error channel -- a scanner posting big bodies at / /api /health
// /graphql produced one alert per path.
describe('HttpExceptionFilter', () => {
  let app: INestApplication;
  const telegramApi = { error: jest.fn().mockResolvedValue(undefined) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EchoController],
    }).compile();

    app = moduleRef.createNestApplication({ logger: false });
    app.useGlobalFilters(
      new HttpExceptionFilter(
        { get: () => 'info' } as unknown as ConfigService,
        telegramApi as unknown as TelegramAPI,
      ),
    );
    await app.init();
  });

  afterAll(() => app.close());

  beforeEach(() => {
    telegramApi.error.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it('answers an oversized body with 413 and does not report it', async () => {
    const res = await request(app.getHttpServer())
      .post('/healthz')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ blob: 'x'.repeat(200 * 1024) }));

    expect(res.status).toBe(413);
    expect(res.body.error).toBe('PayloadTooLargeError');
    expect(telegramApi.error).not.toHaveBeenCalled();
  });

  it('answers malformed JSON with 400 and does not report it', async () => {
    const res = await request(app.getHttpServer())
      .post('/echo')
      .set('Content-Type', 'application/json')
      .send('{"username": "abc",');

    expect(res.status).toBe(400);
    expect(telegramApi.error).not.toHaveBeenCalled();
  });

  it('still reports a genuine server error', async () => {
    const res = await request(app.getHttpServer()).post('/boom');

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('An error occurred on the server side');
    expect(telegramApi.error).toHaveBeenCalledTimes(1);
  });
});

describe('clientErrorStatus', () => {
  it.each([
    [{ status: 413 }, 413],
    [{ statusCode: 400 }, 400],
    [{ status: 500 }, undefined],
    [{ status: '404' }, undefined],
    [new Error('plain'), undefined],
    [null, undefined],
  ])('%p -> %p', (error, expected) => {
    expect(clientErrorStatus(error)).toBe(expected);
  });
});

describe('deployEnvLabel', () => {
  const saved = { ...process.env };
  afterEach(() => {
    process.env = { ...saved };
  });

  it('prefers DEPLOY_ENV over NODE_ENV', () => {
    process.env.NODE_ENV = 'production';
    process.env.DEPLOY_ENV = 'development';
    expect(deployEnvLabel()).toBe('DEVELOPMENT');
  });

  it('falls back to NODE_ENV', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.DEPLOY_ENV;
    expect(deployEnvLabel()).toBe('PRODUCTION');
  });
});
