import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { PageTextService } from '../api/services/PageTextService';
import { PageTextController } from '../api/controllers/PageTextController';

@Module({
  providers: [PageTextService],
  controllers: [PageTextController],
  exports: [PageTextService],
  imports: [PrismaModule, AccessModule, MapperModule],
})
export class PageTextModule {}