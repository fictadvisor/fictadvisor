import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { ResourceController } from './v2/resource.controller';
import { ResourceService } from './v2/resource.service';
import { AccessModule } from '../access/access.module';
import { ResourceMapperModule } from './v2/mappers/resource-mapper.module';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
  imports: [PrismaModule, AccessModule, ResourceMapperModule],
})
export class ResourceModule {}
