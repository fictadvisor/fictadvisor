import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

export const applyStaticMiddleware = (app: NestExpressApplication) => {
    const express = loadPackage('express', 'static.util', () => require('express'));
    const config = app.get<ConfigService>(ConfigService);

    app.use(
        config.get<string>('static.servePath'), 
        express.static(config.get<string>('static.dir'))
    );
};
