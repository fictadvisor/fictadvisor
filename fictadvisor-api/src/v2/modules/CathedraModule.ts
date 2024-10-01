import { Module } from '@nestjs/common';
import { CathedraController } from '../api/controllers/CathedraController';
import { CathedraService } from '../api/services/CathedraService';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { TeacherByIdPipe } from '../api/pipes/TeacherByIdPipe';
import { CathedraByIdPipe } from '../api/pipes/CathedraByIdPipe';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService, TeacherByIdPipe, CathedraByIdPipe],
  exports: [CathedraService, CathedraByIdPipe],
  imports: [AccessModule, MapperModule],
})
export class CathedraModule {}
