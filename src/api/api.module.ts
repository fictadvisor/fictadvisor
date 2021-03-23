import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSearchIndex } from 'src/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/database/entities/teacher-view.entity';
import { Teacher } from 'src/database/entities/teacher.entity';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherSearchIndex, TeacherView])],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class ApiModule {}
