import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { ResourceService } from './v2/resource.service';
import { ResourceController } from './v2/resource.controller';
import { AccessModule } from '../access/access.module';
import { MapperModule } from '../../common/mappers/mapper.module';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule, AccessModule, MapperModule],
})
export class ResourceModule {}
