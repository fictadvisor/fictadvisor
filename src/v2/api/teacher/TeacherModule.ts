import { forwardRef, Module } from '@nestjs/common';
import { TeacherController } from './TeacherController';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { PollModule } from "../poll/PollModule";
import { DateService } from "../../utils/date/DateService";

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, DisciplineTeacherService, DateService],
  exports: [TeacherService, DisciplineTeacherService],
  imports: [forwardRef(() => DisciplineModule), PrismaModule, forwardRef(() => UserModule), forwardRef(() => PollModule)],
})
export class TeacherModule {}