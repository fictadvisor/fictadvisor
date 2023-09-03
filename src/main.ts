import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './v2/AppModule';
import { HttpExceptionFilter, validationExceptionFactory } from './v2/security/exception-handler/CommonExceptions';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyStaticMiddleware } from './v2/utils/StaticUtil';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
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

  const config = new DocumentBuilder()
    .setTitle('FICT ADVISOR API')
    .setDescription('Here is FICT ADVISOR API documentation')
    .setVersion('2.0.4')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (process.env.NODE_ENV === 'production') {
    app.useStaticAssets(join(__dirname, '/swagger'), {
      prefix: '/api',
    });
  }

  app.useStaticAssets(join(__dirname, '/static/'));

  await app.listen(port);

  console.info(`Started server on 127.0.0.1:${port}`);
}
bootstrap();
