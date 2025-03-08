import { Global, Module } from '@nestjs/common';
import { PrismaService } from './v2/PrismaService';
import { DisciplineRepository } from './v2/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from './v2/repositories/DisciplineTeacherRepository';
import { TeacherRepository } from './v2/repositories/TeacherRepository';
import { GroupRepository } from './v2/repositories/GroupRepository';
import { DisciplineTeacherRoleRepository } from './v2/repositories/DisciplineTeacherRoleRepository';
import { SubjectRepository } from './v2/repositories/SubjectRepository';
import { RoleRepository } from './v2/repositories/RoleRepository';
import { GrantRepository } from './v2/repositories/GrantRepository';
import { StudentRepository } from './v2/repositories/StudentRepository';
import { UserRepository } from './v2/repositories/UserRepository';
import { QuestionRepository } from './v2/repositories/QuestionRepository';
import { ContactRepository } from './v2/repositories/ContactRepository';
import { QuestionAnswerRepository } from './v2/repositories/QuestionAnswerRepository';
import { ResourceRepository } from './v2/repositories/ResourceRepository';
import { EventRepository } from './v2/repositories/EventRepository';
import { CathedraRepository } from './v2/repositories/CathedraRepository';
import { TelegramGroupRepository } from './v2/repositories/TelegramGroupRepository';
import { PageTextRepository } from './v2/repositories/PageTextRepository';
import { EduProgramRepository } from './v2/repositories/EduProgramRepository';
import { SpecialityRepository } from './v2/repositories/SpecialityRepository';
import { QuestionWithRolesRepository } from './v2/repositories/QuestionWithRolesRepository';

@Global()
@Module({
  providers: [
    PrismaService,
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
    ContactRepository,
    QuestionRepository,
    QuestionAnswerRepository,
    ResourceRepository,
    EventRepository,
    CathedraRepository,
    TelegramGroupRepository,
    PageTextRepository,
    EduProgramRepository,
    SpecialityRepository,
    QuestionWithRolesRepository,
  ],
  exports: [
    PrismaService,
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
    ContactRepository,
    QuestionRepository,
    QuestionAnswerRepository,
    ResourceRepository,
    EventRepository,
    CathedraRepository,
    TelegramGroupRepository,
    PageTextRepository,
    EduProgramRepository,
    SpecialityRepository,
    QuestionWithRolesRepository,
  ],
})
export class PrismaModule {}
