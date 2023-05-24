import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { ResourceService } from '../api/services/ResourceService';
import { ResourceController } from '../api/controllers/ResourceController';
import { AccessModule } from './AccessModule';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule, AccessModule],
})
export class ResourceModule {}