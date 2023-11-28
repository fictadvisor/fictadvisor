import { Module } from '@nestjs/common';
import { StudentController } from '../api/controllers/StudentController';
import { StudentService } from '../api/services/StudentService';
import { MapperModule } from './MapperModule';
import { PrismaModule } from './PrismaModule';
import { AllStudentsPipe } from '../api/pipes/AllStudentsPipe';
import { GroupByIdPipe } from '../api/pipes/GroupByIdPipe';
import { PermissionModule } from './PermissionModule';

@Module({
  controllers: [StudentController],
  providers: [StudentService, AllStudentsPipe, GroupByIdPipe],
  imports: [MapperModule, PrismaModule, PermissionModule],
  exports: [StudentService],
})
export class StudentModule {}