import { Module } from '@nestjs/common';
import { CathedraController } from '../api/controllers/CathedraController';
import { CathedraService } from '../api/services/CathedraService';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { TeacherByIdPipe } from '../api/pipes/TeacherByIdPipe';

@Module({
  controllers: [CathedraController],
  providers: [CathedraService, TeacherByIdPipe],
  exports: [CathedraService],
  imports: [AccessModule, MapperModule],
})
export class CathedraModule {}
