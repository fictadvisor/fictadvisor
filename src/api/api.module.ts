import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSearchIndex } from 'src/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/database/entities/teacher-view.entity';
import { Teacher } from 'src/database/entities/teacher.entity';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';
import { TeacherContact } from 'src/database/entities/teacher-contact.entity';
import { StudentResourceService } from './student-resource/student-resource.service';
import { StudentResourceController } from './student-resource/student-resource.controller';
import { StudentResource } from 'src/database/entities/student-resource.entity';
import { Subject } from "../database/entities/subject.entity";
import { SubjectSearchIndex } from "../database/entities/subject-search-index";
import { SubjectView } from "../database/entities/subject-view.entity";
import { SubjectController } from "./subject/subject.controller";
import { SubjectService } from "./subject/subject.service";
import { CourseSearchIndex } from "../database/entities/course-search-index";
import { OAuthController } from './oauth/oauth.controller';
import { OAuthService } from './oauth/oauth.service';
import { User } from 'src/database/entities/user.entity';
import { RefreshToken } from 'src/database/entities/refresh-token.entity';
import { JwtModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { Review } from 'src/database/entities/review.entity';
import { Course } from 'src/database/entities/course.entity';
import { TeacherCourseSearchIndex } from "../database/entities/teacher-course-search-index";
import { ReviewController } from './course/review/review.controller';
import { ReviewService } from './course/review/review.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { StatEntry } from '../database/entities/stat-entry.entity';
import { TeacherReviewView } from 'src/database/entities/review-view.entity';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature(
      [
        Teacher,
        TeacherSearchIndex,
        TeacherView,
        TeacherContact,
        TeacherCourseSearchIndex,
        StudentResource,
        Subject,
        SubjectSearchIndex,
        SubjectView,
        CourseSearchIndex,
        User,
        RefreshToken,
        Review,
        Course,
        StatEntry,
        TeacherReviewView,
      ]
    )
  ],
  controllers: [
    TeacherController,
    StudentResourceController,
    SubjectController,
    OAuthController,
    CourseController,
    ReviewController,
    SearchController,
  ],
  providers: [
    TeacherService,
    StudentResourceService,
    SubjectService,
    OAuthService,
    JwtStrategy,
    CourseService,
    ReviewService,
    TelegramService,
    SearchService,
  ],
})
export class ApiModule {}
