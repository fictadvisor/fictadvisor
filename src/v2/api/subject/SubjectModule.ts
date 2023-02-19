import { Module } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { SubjectController } from './SubjectController';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { DisciplineModule } from "../discipline/DisciplineModule";
import { TeacherModule } from "../teacher/TeacherModule";

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
  imports: [PrismaModule, UserModule, DisciplineModule, TeacherModule],
})
export class SubjectModule {}