import { ConfigModule as _ConfigModule } from '@nestjs/config';
import configuration from './config.configuration';

export const ConfigModule = _ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
});
