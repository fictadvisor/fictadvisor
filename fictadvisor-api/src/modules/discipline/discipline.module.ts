import { Module } from '@nestjs/common';
import { DisciplineController } from './v2/discipline.controller';
import { DisciplineService } from './v2/discipline.service';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { TeacherModule } from '../teacher/teacher.module';
import { GroupModule } from '../group/group.module';
import { DisciplineMapperModule } from './v2/mappers/discipline-mapper.module';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService],
  exports: [DisciplineService],
  imports: [AccessModule, PrismaModule, TeacherModule, GroupModule, DisciplineMapperModule],
})
export class DisciplineModule {}
