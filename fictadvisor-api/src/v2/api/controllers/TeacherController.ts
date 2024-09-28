import { Body, Controller, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  QueryAllTeacherDTO,
  CreateTeacherDTO,
  UpdateTeacherDTO,
  CreateContactDTO,
  UpdateContactDTO,
  ResponseQueryDTO,
  CommentsQueryDTO,
  ComplaintDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplineTeacherAndSubjectResponse,
  TeacherWithContactsResponse,
  TeacherWithContactsFullResponse,
  PaginatedTeachersResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { TeacherByIdPipe } from '../pipes/TeacherByIdPipe';
import { ContactByIdPipe } from '../pipes/ContactByIdPipe';
import { SubjectByIdPipe } from '../pipes/SubjectByIdPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { CathedraByIdPipe } from '../pipes/CathedraByIdPipe';
import { CommentsQueryPipe } from '../pipes/CommentsQueryPipe';
import { AllTeachersPipe } from '../pipes/AllTeachersPipe';
import { TeacherMapper } from '../../mappers/TeacherMapper';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { TeacherService } from '../services/TeacherService';
import { PollService } from '../services/PollService';
import { TeacherDocumentation } from 'src/v2/utils/documentation/teacher';

@ApiTags('Teachers')
@Controller({
  version: '2',
  path: '/teachers',
})
export class TeacherController {
  constructor (
    private teacherService: TeacherService,
    private teacherMapper: TeacherMapper,
    private pollService: PollService,
    private questionMapper: QuestionMapper,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
  ) {}


  @ApiEndpoint({
    summary: 'Get all teachers',
    documentation: TeacherDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query(AllTeachersPipe) query: QueryAllTeacherDTO,
  ): Promise<PaginatedTeachersResponse> {
    const teachers = await this.teacherService.getAll(query);
    return {
      teachers: this.teacherMapper.getTeachersWithRolesAndCathedras(teachers.data),
      pagination: teachers.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Receive roles by teacher',
    documentation: TeacherDocumentation.GET_TEACHER_ROLES,
  })
  @Get('/:teacherId/roles')
  async getTeacherRoles (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const roles = await this.teacherService.getTeacherRoles(teacherId);

    return { roles };
  }

  @ApiEndpoint({
    summary: 'Receive subjects by teacher',
    documentation: TeacherDocumentation.GET_SUBJECTS,
  })
  @Get('/:teacherId/subjects')
  async getSubjects (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const subjects = await this.teacherService.getTeacherSubjects(teacherId);

    return { subjects };
  }

  @ApiEndpoint({
    summary: 'Receive disciplines by teacher',
    documentation: TeacherDocumentation.GET_DISCIPLINES,
    permissions: PERMISSION.USERS_$USERID_TEACHERS_$TEACHERID_DISCIPLINES_GET,
  })
  @Get('/:teacherId/disciplines')
  async getDisciplines (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query('notAnswered') notAnswered: boolean,
    @Query('userId', UserByIdPipe) userId: string,
  ): Promise<DisciplineTeacherAndSubjectResponse[]> {
    const disciplineTeachers = await this.teacherService.getUserDisciplineTeachers(teacherId, userId, notAnswered);
    return this.disciplineTeacherMapper.getDisciplinesTeacherAndSubject(disciplineTeachers);
  }

  @ApiEndpoint({
    summary: 'Receive a certain subject by teacher',
    documentation: TeacherDocumentation.GET_SUBJECT,
  })
  @Get('/:teacherId/subjects/:subjectId')
  async getSubject (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<TeacherWithContactsFullResponse> {
    return this.teacherService.getTeacherSubject(teacherId, subjectId);
  }

  @ApiEndpoint({
    summary: 'Receive a certain teacher',
    documentation: TeacherDocumentation.GET_TEACHER,
  })
  @Get('/:teacherId')
  async getTeacher (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ): Promise<TeacherWithContactsResponse> {
    const { dbTeacher, contacts } = await this.teacherService.getTeacher(teacherId);
    return {
      ...this.teacherMapper.getTeacherWithRolesAndCathedras(dbTeacher),
      contacts,
    };
  }

  @ApiEndpoint({
    summary: 'Create a teacher',
    documentation: TeacherDocumentation.CREATE,
    permissions: PERMISSION.TEACHERS_CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateTeacherDTO,
  ) {
    const dbTeacher = await this.teacherService.create(body);
    return this.teacherMapper.getTeacherWithRolesAndCathedras(dbTeacher);
  }

  @ApiEndpoint({
    summary: 'Update a teacher',
    documentation: TeacherDocumentation.UPDATE,
    permissions: PERMISSION.TEACHERS_$TEACHERID_UPDATE,
  })
  @Patch('/:teacherId')
  async update (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO,
  ) {
    const dbTeacher = await this.teacherService.update(teacherId, body);
    return this.teacherMapper.getTeacherWithRolesAndCathedras(dbTeacher);
  }

  @ApiEndpoint({
    summary: 'Delete the teacher',
    documentation: TeacherDocumentation.DELETE,
    permissions: PERMISSION.TEACHERS_$TEACHERID_DELETE,
  })
  @Delete('/:teacherId')
  async delete (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.delete(teacherId);
  }

  @ApiEndpoint({
    summary: 'Receive teacher\'s contacts',
    documentation: TeacherDocumentation.GET_ALL_CONTACTS,
  })
  @Get('/:teacherId/contacts')
  async getAllContacts (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const contacts = await this.teacherService.getAllContacts(teacherId);
    return { contacts };
  }

  @ApiEndpoint({
    summary: 'Receive teacher with certain contact id',
    documentation: TeacherDocumentation.GET_CONTACT,
  })
  @Get('/:teacherId/contacts/:contactId')
  getContact (
    @Param(ContactByIdPipe) params: {teacherId: string, contactId: string},
  ) {
    return this.teacherService.getContact(params.teacherId, params.contactId);
  }

  @ApiEndpoint({
    summary: 'Add teacher\'s contact',
    documentation: TeacherDocumentation.CREATE_CONTACT,
    permissions: PERMISSION.TEACHERS_$TEACHERID_CONTACTS_CREATE,
  })
  @Post('/:teacherId/contacts')
  createContact (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.teacherService.createContact(teacherId, body);
  }

  @ApiEndpoint({
    summary: 'Update certain teacher\'s contact',
    documentation: TeacherDocumentation.UPDATE_CONTACT,
    permissions: PERMISSION.TEACHERS_$TEACHERID_CONTACTS_UPDATE,
  })
  @Patch('/:teacherId/contacts/:contactId')
  async updateContact (
    @Param(ContactByIdPipe) params: {teacherId: string, contactId: string},
    @Body() body: UpdateContactDTO,
  ) {
    return this.teacherService.updateContact(params.teacherId, params.contactId, body);
  }

  @ApiEndpoint({
    summary: 'Delete teacher\'s contact',
    documentation: TeacherDocumentation.DELETE_CONTACT,
    permissions: PERMISSION.TEACHERS_$TEACHERID_CONTACTS_DELETE,
  })
  @Delete('/:teacherId/contacts/:contactId')
  async deleteContact (
    @Param(ContactByIdPipe) params: {teacherId: string, contactId: string},
  ) {
    return this.teacherService.deleteContact(params.teacherId, params.contactId);
  }

  @ApiEndpoint({
    summary: 'Get teacher\'s marks',
    documentation: TeacherDocumentation.GET_MARKS,
  })
  @Get('/:teacherId/marks')
  async getMarks (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query() query: ResponseQueryDTO,
  ) {
    const marks = await this.teacherService.getMarks(teacherId, query);
    return { marks };
  }

  @ApiEndpoint({
    summary: 'Get question answers with TEXT type (comments)',
    documentation: TeacherDocumentation.GET_COMMENTS,
  })
  @Get('/:teacherId/comments')
  async getComments (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query(CommentsQueryPipe) query: CommentsQueryDTO,
  ) {
    this.teacherService.checkQueryDate(query);
    const questions = await this.pollService.getQuestionWithText(teacherId, query);
    return this.questionMapper.getQuestionComments(questions);
  }

  @ApiEndpoint({
    summary: 'Connect teacher to cathedra',
    documentation: TeacherDocumentation.CONNECT_CATHEDRA,
    permissions: PERMISSION.TEACHERS_$TEACHERID_CATHEDRAS_UPDATE,
  })
  @Patch('/:teacherId/cathedra/:cathedraId')
  async connectCathedra (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ) {
    return this.teacherService.connectTeacherWithCathedra(teacherId, cathedraId);
  }

  @ApiEndpoint({
    summary: 'Remove the teacher from the cathedra',
    documentation: TeacherDocumentation.DISCONNECT_CATHEDRA,
    permissions: PERMISSION.TEACHERS_$TEACHERID_CATHEDRAS_DELETE,
  })
  @Delete('/:teacherId/cathedra/:cathedraId')
  async disconnectCathedra (
      @Param('teacherId', TeacherByIdPipe) teacherId: string,
      @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ) {
    return this.teacherService.disconnectTeacherFromCathedra(teacherId, cathedraId);
  }

  @ApiEndpoint({
    summary: 'Send a complaint to the teacher',
    documentation: TeacherDocumentation.SEND_COMPLAINT,
  })
  @Post('/:teacherId/sendComplaint')
  sendComplaint (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: ComplaintDTO,
  ) {
    return this.teacherService.sendComplaint(teacherId, body);
  }
}
