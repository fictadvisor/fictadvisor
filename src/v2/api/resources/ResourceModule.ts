import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/PrismaModule';
import { ResourceService } from './ResourcesService';
import { ResourceController } from './ResourcesController';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule],
})
export class ResourceModule {}