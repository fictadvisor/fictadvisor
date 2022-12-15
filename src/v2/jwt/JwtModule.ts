import { Module } from '@nestjs/common';
import { SecurityConfigService } from '../config/SecurityConfigService';

@Module({
  providers: [SecurityConfigService]
})
export class JwtModule {}