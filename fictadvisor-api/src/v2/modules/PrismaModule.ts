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
  ],
})
export class PrismaModule {}
