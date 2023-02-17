import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/PrismaModule';
import { ResourceService } from './ResourceService';
import { ResourceController } from './ResourceController';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
  imports: [PrismaModule],
})
export class ResourceModule {}