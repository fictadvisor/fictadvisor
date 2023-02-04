import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './v2/AppModule';
import { HttpExceptionFilter, validationExceptionFactory } from './v1/common/common.exception';
import { systemLogger } from './v1/logger/logger.core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyStaticMiddleware } from './v1/static/static.util';

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');

  applyStaticMiddleware(app);

  app.enableCors();

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

  await app.listen(port);

  systemLogger.info(`Started server on 127.0.0.1:${port}`);
}
bootstrap();
