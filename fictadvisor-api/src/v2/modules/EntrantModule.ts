import { Module } from '@nestjs/common';
import { EntrantController } from '../api/controllers/EntrantController';
import { EntrantService } from '../api/services/EntrantService';
import { MapperModule } from './MapperModule';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from './AccessModule';
import { AdmissionAPI } from '../telegram/AdmissionAPI';

@Module({
  controllers: [EntrantController],
  providers: [EntrantService, AdmissionAPI],
  imports: [PrismaModule, MapperModule, AccessModule],
  exports: [EntrantService],
})
export class EntrantModule {}