import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join, resolve } from 'path';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app.module';
import { TelegramAPI } from './modules/telegram-api/telegram-api';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { validationExceptionFactory } from './common/utils/validation-exception.factory';
import { applyStaticMiddleware } from './common/utils/apply-static-middleware';
import { TestType, TestCoverage } from './common/utils/test-coverage';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const telegramApi = app.get<TelegramAPI>(TelegramAPI);
  const port = configService.get<number>('port');

  applyStaticMiddleware(app);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  TestCoverage.setup({
    app,
    prefix: 'unit-coverage',
    testType: TestType.UNIT,
  });

  TestCoverage.setup({
    app,
    prefix: 'integration-coverage',
    testType: TestType.INTEGRATION,
  });

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter(configService, telegramApi));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: validationExceptionFactory(),
    })
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  const config = new DocumentBuilder()
    .setTitle('FICE ADVISOR API')
    .setDescription('Here is FICE ADVISOR API documentation')
    .setVersion('2.0.4')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(resolve(), '/static/'));
  const server = app.getHttpServer();

  server.keepAliveTimeout = 61 * 1000;
  server.headersTimeout = 62 * 1000;
  await app.listen(port, '0.0.0.0');

  console.info(
    `Started server on 0.0.0.0:${port}\n` +
    `Swagger: http://0.0.0.0:${port}/api\n` +
    `Unit coverage: http://0.0.0.0:${port}/unit-coverage/\n` +
    `Integration coverage: http://0.0.0.0:${port}/integration-coverage/`
  );
}
bootstrap();
