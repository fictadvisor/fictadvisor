import { Global, Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';
import { DisciplineTypeRepository } from '../api/discipline/DisciplineTypeRepository';
import { DisciplineRepository } from '../api/discipline/DisciplineRepository';
import { DisciplineTeacherRepository } from '../api/teacher/DisciplineTeacherRepository';
import { TeacherRepository } from '../api/teacher/TeacherRepository';
import { GroupRepository } from '../api/group/GroupRepository';
import { DisciplineTeacherRoleRepository } from '../api/teacher/DisciplineTeacherRoleRepository';
import { SubjectRepository } from '../api/subject/SubjectRepository';
import { RoleRepository } from '../api/user/role/RoleRepository';
import { GrantRepository } from '../api/user/grant/GrantRepository';
import { StudentRepository } from '../api/user/StudentRepository';
import { UserRepository } from '../api/user/UserRepository';
import { SuperheroRepository } from '../api/user/SuperheroRepository';
import { QuestionRepository } from '../api/poll/QuestionRepository';
import { ContactRepository } from '../api/user/ContactRepository';
import { QuestionAnswerRepository } from '../api/poll/QuestionAnswerRepository';
import { ResourceRepository } from '../api/resources/ResourceRepository';
import { EventRepository } from './repositories/EventRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    DisciplineTypeRepository,
    DisciplineRepository,
    DisciplineTeacherRepository,
    DisciplineTeacherRoleRepository,
    TeacherRepository,
    GroupRepository,
    SubjectRepository,
    RoleRepository,
    GrantRepository,
    StudentRepository,
    UserRepository,
    SuperheroRepository,
    ContactRepository,
    QuestionRepository,
    QuestionAnswerRepository,
    ResourceRepository,
    EventRepository,
  ],
  exports: [
    PrismaService,
    DisciplineTypeRepository,
    DisciplineRepository,
    DisciplineTeacherRepository,
    DisciplineTeacherRoleRepository,
    TeacherRepository,
    GroupRepository,
    SubjectRepository,
    RoleRepository,
    GrantRepository,
    StudentRepository,
    UserRepository,
    SuperheroRepository,
    ContactRepository,
    QuestionRepository,
    QuestionAnswerRepository,
    ResourceRepository,
    EventRepository,
  ],
})
export class PrismaModule {}
