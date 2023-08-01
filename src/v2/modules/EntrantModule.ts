import { Module } from '@nestjs/common';
import { EntrantController } from '../api/controllers/EntrantController';
import { EntrantService } from '../api/services/EntrantService';
import { MapperModule } from './MapperModule';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from './AccessModule';

@Module({
  controllers: [EntrantController],
  providers: [EntrantService],
  imports: [PrismaModule, MapperModule, AccessModule],
  exports: [EntrantService],
})
export class EntrantModule {}