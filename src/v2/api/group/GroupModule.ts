import { forwardRef, Module } from '@nestjs/common';
import { GroupController } from './GroupController';
import { GroupService } from './GroupService';
import { GroupByIdPipe } from './GroupByIdPipe';
import { DisciplineModule } from '../discipline/DisciplineModule';
import { PrismaModule } from '../../database/PrismaModule';
import { UserModule } from '../user/UserModule';
import { TeacherModule } from '../teacher/TeacherModule';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupByIdPipe],
  exports: [GroupService, GroupByIdPipe],
  imports: [forwardRef(() => DisciplineModule), forwardRef(() => PrismaModule), forwardRef(() => UserModule), forwardRef(() => TeacherModule)],
})
export class GroupModule {}