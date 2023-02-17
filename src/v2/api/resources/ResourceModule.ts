import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/PrismaModule';
import { ResourceService } from './ResourceService';
import { ResourceController } from './ResourceController';
import { UserModule } from '../user/UserModule';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule, UserModule],
})
export class ResourceModule {}