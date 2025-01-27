import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './v2/AppModule';
import { HttpExceptionFilter, validationExceptionFactory } from './v2/security/exception-handler/CommonExceptions';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyStaticMiddleware } from './v2/utils/StaticUtil';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join, resolve } from 'path';
import * as cookieParser from 'cookie-parser';
import { TestType, TestCoverage } from './v2/utils/TestCoverage';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
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
  app.useGlobalFilters(new HttpExceptionFilter(configService));
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

  await app.listen(port);

  console.info(
    `Started server on 127.0.0.1:${port}\n` +
    `Swagger: http://127.0.0.1:${port}/api\n` +
    `Unit coverage: http://127.0.0.1:${port}/unit-coverage/\n` +
    `Integration coverage: http://127.0.0.1:${port}/integration-coverage/`
  );
}
bootstrap();
