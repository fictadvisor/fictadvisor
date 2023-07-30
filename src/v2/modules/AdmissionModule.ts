import { Module } from '@nestjs/common';
import { AdmissionService } from '../api/services/AdmissionService';
import { AdmissionController } from '../api/controllers/AdmissionController';
import { PrismaModule } from './PrismaModule';

@Module({
  providers: [AdmissionService],
  exports: [AdmissionService],
  controllers: [AdmissionController],
  imports: [PrismaModule],
})
export class AdmissionModule {}