import { Global, Module } from '@nestjs/common';
import { PrismaService } from './v2/prisma.service';
import { DisciplineRepository } from './v2/repositories/discipline.repository';
import { DisciplineTeacherRepository } from './v2/repositories/discipline-teacher.repository';
import { TeacherRepository } from './v2/repositories/teacher.repository';
import { GroupRepository } from './v2/repositories/group.repository';
import { DisciplineTeacherRoleRepository } from './v2/repositories/discipline-teacher-role.repository';
import { SubjectRepository } from './v2/repositories/subject.repository';
import { RoleRepository } from './v2/repositories/role.repository';
import { GrantRepository } from './v2/repositories/grant.repository';
import { StudentRepository } from './v2/repositories/student.repository';
import { UserRepository } from './v2/repositories/user.repository';
import { QuestionRepository } from './v2/repositories/question.repository';
import { ContactRepository } from './v2/repositories/contact.repository';
import { QuestionAnswerRepository } from './v2/repositories/question-answer.repository';
import { ResourceRepository } from './v2/repositories/resource.repository';
import { EventRepository } from './v2/repositories/event.repository';
import { CathedraRepository } from './v2/repositories/cathedra.repository';
import { TelegramGroupRepository } from './v2/repositories/telegram-group.repository';
import { PageTextRepository } from './v2/repositories/page-text.repository';
import { EduProgramRepository } from './v2/repositories/edu-program.repository';
import { SpecialityRepository } from './v2/repositories/speciality.repository';
import { QuestionWithRolesRepository } from './v2/repositories/question-with-roles.repository';

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
