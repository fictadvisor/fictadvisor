import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/PrismaModule';
import { ResourceService } from './v2/ResourceService';
import { ResourceController } from './v2/ResourceController';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule, AccessModule, MapperModule],
})
export class ResourceModule {}
