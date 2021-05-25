import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  validationExceptionFactory,
} from './common/common.exception';
import { systemLogger } from './logger/logger.core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyStaticMiddleware } from './static/static.util';

async function bootstrap() {
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
      exceptionFactory: validationExceptionFactory(),
    })
  );

  await app.listen(port);

  systemLogger.info(`Started server on 127.0.0.1:${port}`);
}
bootstrap();
