import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { PageTextService } from './v2/PageTextService';
import { PageTextController } from './v2/PageTextController';

@Module({
  providers: [PageTextService],
  controllers: [PageTextController],
  exports: [PageTextService],
  imports: [PrismaModule, AccessModule, MapperModule],
})
export class PageTextModule {}
