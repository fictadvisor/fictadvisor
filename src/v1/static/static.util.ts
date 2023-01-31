import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { mkdirSync, existsSync } from 'fs';

export const applyStaticMiddleware = (app: NestExpressApplication) => {
  const express = loadPackage('express', 'static.util', () =>
    require('express')
  );
  const config = app.get<ConfigService>(ConfigService);
  const staticDir = config.get<string>('static.dir');

  if (!existsSync) {
    mkdirSync(staticDir, { recursive: true });
  }

  app.use(config.get<string>('static.servePath'), express.static(staticDir));
};
