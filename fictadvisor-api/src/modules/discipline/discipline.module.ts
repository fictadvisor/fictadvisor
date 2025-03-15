import { Module } from '@nestjs/common';
import { DisciplineController } from './v2/discipline.controller';
import { DisciplineService } from './v2/discipline.service';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { MapperModule } from '../../common/mappers/mapper.module';
import { TeacherModule } from '../teacher/teacher.module';
import { GroupModule } from '../group/group.module';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService],
  exports: [DisciplineService],
  imports: [AccessModule, PrismaModule, MapperModule, TeacherModule, GroupModule],
})
export class DisciplineModule {}
