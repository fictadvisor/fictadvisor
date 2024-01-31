import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { ResourceService } from '../api/services/ResourceService';
import { ResourceController } from '../api/controllers/ResourceController';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule, AccessModule, MapperModule],
})
export class ResourceModule {}