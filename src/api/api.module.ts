import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSearchIndex } from 'src/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/database/entities/teacher-view.entity';
import { Teacher } from 'src/database/entities/teacher.entity';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';
import { StudentResourceService } from './student-resource/student-resource.service';
import { StudentResourceController } from './student-resource/student-resource.controller';
import { StudentResource } from 'src/database/entities/student-resource.entity';
import {Subject} from "../database/entities/subject.entity";
import {SubjectSearchIndex} from "../database/entities/subject-search-index";
import {SubjectView} from "../database/entities/subject-view.entity";
import {SubjectController} from "./subject/subject.controller";
import {SubjectService} from "./subject/subject.service";

@Module({
  imports: [TypeOrmModule.forFeature([
    Teacher,
    TeacherSearchIndex,
    TeacherView,
    StudentResource,
    Subject,
    SubjectSearchIndex,
    SubjectView,
  ])],
  controllers: [
    TeacherController,
    StudentResourceController,
    SubjectController,
  ],
  providers: [
    TeacherService,
    StudentResourceService,
    SubjectService,
  ],
})
export class ApiModule {}
