import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/PrismaModule';
import { ResourceService } from './ResourceService';
import { ResourceController } from './ResourceController';
import { AccessModule } from '../../security/AccessModule';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule, AccessModule],
})
export class ResourceModule {}