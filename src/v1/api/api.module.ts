import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSearchIndex } from 'src/v1/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/v1/database/entities/teacher-view.entity';
import { Teacher } from 'src/v1/database/entities/teacher.entity';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';
import { TeacherContact } from 'src/v1/database/entities/teacher-contact.entity';
import { StudentResourceService } from './student-resource/student-resource.service';
import { StudentResourceController } from './student-resource/student-resource.controller';
import { StudentResource } from 'src/v1/database/entities/student-resource.entity';
import { Subject } from '../database/entities/subject.entity';
import { SubjectSearchIndex } from '../database/entities/subject-search-index';
import { SubjectView } from '../database/entities/subject-view.entity';
import { SubjectController } from './subject/subject.controller';
import { SubjectService } from './subject/subject.service';
import { CourseSearchIndex } from '../database/entities/course-search-index.entity';
import { OAuthController } from './oauth/oauth.controller';
import { OAuthService } from './oauth/oauth.service';
import { User } from 'src/v1/database/entities/user.entity';
import { RefreshToken } from 'src/v1/database/entities/refresh-token.entity';
import { JwtModule } from 'src/v1/jwt/jwt.module';
import { JwtStrategy } from 'src/v1/jwt/jwt.strategy';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { Review } from 'src/v1/database/entities/review.entity';
import { Course } from 'src/v1/database/entities/course.entity';
import { TeacherCourseSearchIndex } from '../database/entities/teacher-course-search-index';
import { ReviewController } from './course/review/review.controller';
import { ReviewService } from './course/review/review.service';
import { TelegramService } from 'src/v1/telegram/telegram.service';
import { StatEntry } from '../database/entities/stat-entry.entity';
import { TeacherReviewView } from 'src/v1/database/entities/review-view.entity';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SuperheroController } from './superhero/superhero.controller';
import { SuperheroService } from './superhero/superhero.service';
import { Superhero } from 'src/v1/database/entities/superhero.entity';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([
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
      Superhero,
    ]),
  ],
  controllers: [
    TeacherController,
    StudentResourceController,
    SubjectController,
    OAuthController,
    CourseController,
    ReviewController,
    SearchController,
    SuperheroController,
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
    SuperheroService,
  ],
})
export class ApiModule {}
