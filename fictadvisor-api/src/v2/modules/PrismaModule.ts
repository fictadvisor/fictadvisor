import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { DisciplineRepository } from '../database/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../database/repositories/DisciplineTeacherRepository';
import { TeacherRepository } from '../database/repositories/TeacherRepository';
import { GroupRepository } from '../database/repositories/GroupRepository';
import { DisciplineTeacherRoleRepository } from '../database/repositories/DisciplineTeacherRoleRepository';
import { SubjectRepository } from '../database/repositories/SubjectRepository';
import { RoleRepository } from '../database/repositories/RoleRepository';
import { GrantRepository } from '../database/repositories/GrantRepository';
import { StudentRepository } from '../database/repositories/StudentRepository';
import { UserRepository } from '../database/repositories/UserRepository';
import { SuperheroRepository } from '../database/repositories/SuperheroRepository';
import { QuestionRepository } from '../database/repositories/QuestionRepository';
import { ContactRepository } from '../database/repositories/ContactRepository';
import { QuestionAnswerRepository } from '../database/repositories/QuestionAnswerRepository';
import { ResourceRepository } from '../database/repositories/ResourceRepository';
import { EventRepository } from '../database/repositories/EventRepository';
import { CathedraRepository } from '../database/repositories/CathedraRepository';
import { EntrantRepository } from '../database/repositories/EntrantRepository';
import { TelegramGroupRepository } from '../database/repositories/TelegramGroupRepository';
import { PageTextRepository } from '../database/repositories/PageTextRepository';
import { EduProgramRepository } from '../database/repositories/EduProgramRepository';
import { SpecialityRepository } from '../database/repositories/SpecialityRepository';
import { GoogleUserRepository } from '../database/repositories/GoogleUserRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    DisciplineRepository,
    DisciplineTeacherRepository,
    DisciplineTeacherRoleRepository,
    EntrantRepository,
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
    CathedraRepository,
    EntrantRepository,
    TelegramGroupRepository,
    PageTextRepository,
    EduProgramRepository,
    SpecialityRepository,
    GoogleUserRepository,
  ],
  exports: [
    PrismaService,
    DisciplineRepository,
    DisciplineTeacherRepository,
    DisciplineTeacherRoleRepository,
    EntrantRepository,
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
    CathedraRepository,
    EntrantRepository,
    TelegramGroupRepository,
    PageTextRepository,
    EduProgramRepository,
    SpecialityRepository,
    GoogleUserRepository,
  ],
})
export class PrismaModule {}
