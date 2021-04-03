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
import { Subject } from "../database/entities/subject.entity";
import { SubjectSearchIndex } from "../database/entities/subject-search-index";
import { SubjectView } from "../database/entities/subject-view.entity";
import { SubjectController } from "./subject/subject.controller";
import { SubjectService } from "./subject/subject.service";
import { OAuthController } from './oauth/oauth.controller';
import { OAuthService } from './oauth/oauth.service';
import { User } from 'src/database/entities/user.entity';
import { RefreshToken } from 'src/database/entities/refresh-token.entity';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature(
      [
        Teacher,
        TeacherSearchIndex,
        TeacherView,
        StudentResource,
        Subject,
        SubjectSearchIndex,
        SubjectView,
        User,
        RefreshToken,
      ]
    )
],
  controllers: [
    TeacherController,
    StudentResourceController,
    SubjectController,
    OAuthController,
  ],
  providers: [
    TeacherService,
    StudentResourceService,
    SubjectService,
    OAuthService,
  ],
})
export class ApiModule {}
