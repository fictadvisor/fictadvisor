import { Body, Controller, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  TeacherRolesResponse,
  SubjectsResponse,
  DisciplineTeacherAndSubjectResponse,
  ContactResponse,
  ContactsResponse,
  MarksResponse,
  PaginatedQuestionCommentsResponse,
  TeacherWithContactsResponse,
  TeacherWithContactsFullResponse,
  PaginatedTeachersResponse,
  TeacherWithRolesAndCathedrasResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { Access } from 'src/v2/security/Access';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { TeacherByIdPipe } from '../pipes/TeacherByIdPipe';
import { ContactByNamePipe } from '../pipes/ContactByNamePipe';
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

  @ApiOkResponse({
    type: PaginatedTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Sort must be an enum
      Cathedras must be an array
      Each element of roles should be an enum
      Roles must be an array
      
    InvalidEntityException:
      Group with such id is not found
      Cathedra with such id is not found`,
  })
  @ApiEndpoint({
    summary: 'Get all teachers',
  })
  @Get()
  async getAll (
    @Query(AllTeachersPipe) query: QueryAllTeacherDTO,
  ): Promise<PaginatedTeachersResponse> {
    const teachers = await this.teacherService.getAll(query);
    return {
      teachers: this.teacherMapper.getTeachers(teachers.data),
      pagination: teachers.pagination,
    };
  }

  @ApiOkResponse({
    type: TeacherRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityId:
      Teacher with such id is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiEndpoint({
    summary: 'Receive roles by teacher',
  })
  @Get('/:teacherId/roles')
  async getTeacherRoles (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const roles = await this.teacherService.getTeacherRoles(teacherId);

    return { roles };
  }

  @ApiOkResponse({
    type: SubjectsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityId:
      Teacher with such id is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiEndpoint({
    summary: 'Receive subjects by teacher',
  })
  @Get('/:teacherId/subjects')
  async getSubjects (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const subjects = await this.teacherService.getTeacherSubjects(teacherId);

    return { subjects };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: [DisciplineTeacherAndSubjectResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      User with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiQuery({
    name: 'notAnswered',
    type: Boolean,
    description: 'Answer result',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    description: 'Id of certain user',
  })
  @ApiEndpoint({
    summary: 'Receive disciplines by teacher',
    permissions: PERMISSION.USERS_$USERID_TEACHERS_$TEACHERID_DISCIPLINES_GET,
  })
  @Get('/:teacherId/disciplines')
  async getDisciplines (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query('notAnswered') notAnswered: boolean,
    @Query('userId', UserByIdPipe) userId: string,
  ): Promise<DisciplineTeacherAndSubjectResponse[]> {
    const disciplineTeachers = await this.teacherService.getUserDisciplineTeachers(teacherId, userId, notAnswered);
    return this.disciplineTeacherMapper.getDisciplines(disciplineTeachers);
  }

  @ApiOkResponse({
    type: TeacherWithContactsFullResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Teacher with such id is not found
      Subject with such id is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiParam({
    name: 'subjectId',
    required: true,
    description: 'Id of certain subject',
  })
  @ApiEndpoint({
    summary: 'Receive a certain subject by teacher',
  })
  @Get('/:teacherId/subjects/:subjectId')
  async getSubject (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<TeacherWithContactsFullResponse> {
    return this.teacherService.getTeacherSubject(teacherId, subjectId);
  }

  @ApiOkResponse({
    type: TeacherWithContactsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiEndpoint({
    summary: 'Receive a certain teacher',
  })
  @Get('/:teacherId')
  async getTeacher (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ): Promise<TeacherWithContactsResponse> {
    const { dbTeacher, contacts } = await this.teacherService.getTeacher(teacherId);
    return {
      ...this.teacherMapper.getTeacher(dbTeacher),
      contacts,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TeacherWithRolesAndCathedrasResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-' ))
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-' ))
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-' ))
      Description is too long (max: 400)
      Academic status cannot be empty
      Academic status must be enum
      Scientific degree can not be empty
      Scientific degree must be an enum
      Position cannot be empty
      Position must be an enum`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiEndpoint({
    summary: 'Create a teacher',
    permissions: PERMISSION.TEACHERS_CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateTeacherDTO,
  ) {
    const dbTeacher = await this.teacherService.create(body);
    return this.teacherMapper.getTeacher(dbTeacher);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TeacherWithRolesAndCathedrasResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Teacher with such id is not found
                  
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-' ))
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-' ))
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-' ))
      Description is too long (max: 400)
      Academic status must be enum
      Scientific degree must be an enum
      Position must be an enum`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiEndpoint({
    summary: 'Update a teacher',
    permissions: PERMISSION.TEACHERS_$TEACHERID_UPDATE,
  })
  @Patch('/:teacherId')
  async update (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO,
  ) {
    const dbTeacher = await this.teacherService.update(teacherId, body);
    return this.teacherMapper.getTeacher(dbTeacher);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      teacher with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiEndpoint({
    summary: 'Delete the teacher',
    permissions: PERMISSION.TEACHERS_$TEACHERID_DELETE,
  })
  @Delete('/:teacherId')
  async delete (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.delete(teacherId);
  }

  @ApiOkResponse({
    type: ContactsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      teacher with such id is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiEndpoint({
    summary: 'Receive teacher\'s contacts',
  })
  @Get('/:teacherId/contacts')
  async getAllContacts (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const contacts = await this.teacherService.getAllContacts(teacherId);
    return { contacts };
  }

  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Teacher with such id is not found
                  
    InvalidContactNameException: 
      Contact with such name is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: 'Id of certain teacher\'s contact',
  })
  @ApiEndpoint({
    summary: 'Receive teacher with certain contact id',
  })
  @Get('/:teacherId/contacts/:name')
  getContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.getContact(params.teacherId, params.name);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `\n 
    InvalidEntityIdException:
      teacher with such id is not found 
                  
    InvalidBodyException: 
      Name is too long (max: 100)
      Name can not be empty
      Name is not correct (a-zA-Z0-9A-Я(укр.)\\-' )
      Display name is too long (max: 100)
      Display name can not be empty
      Link is too long (max: 200)
      Link contains wrong symbols (ASCII only)
      Link is not a url`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiEndpoint({
    summary: 'Add teacher\'s contact',
    permissions: PERMISSION.TEACHERS_$TEACHERID_CONTACTS_CREATE,
  })
  @Post('/:teacherId/contacts')
  createContact (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.teacherService.createContact(teacherId, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:  
      teacher with such id is not found
                  
    InvalidContactNameException:  
      Contact with such name is not found
                  
    InvalidBodyException:  
      Display name is too long (max: 100)
      Link is too long (max: 200)
      Link contains wrong symbols (ASCII only)
      Link is not a url`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: 'Id of certain teacher\'s contact',
  })
  @ApiEndpoint({
    summary: 'Update certain teacher\'s contact',
    permissions: PERMISSION.TEACHERS_$TEACHERID_CONTACTS_UPDATE,
  })
  @Patch('/:teacherId/contacts/:name')
  async updateContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
    @Body() body: UpdateContactDTO,
  ) {
    return this.teacherService.updateContact(params.teacherId, params.name, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:  
      teacher with such id is not found
                  
    InvalidContactNameException: 
      Contact with such name is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of certain teacher',
  })
  @ApiParam({
    name: 'name',
    required: true,
    description: 'Id of certain teacher\'s contact',
  })
  @ApiEndpoint({
    summary: 'Delete teacher\'s contact',
    permissions: PERMISSION.TEACHERS_$TEACHERID_CONTACTS_DELETE,
  })
  @Delete('/:teacherId/contacts/:name')
  async deleteContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.deleteContact(params.teacherId, params.name);
  }

  @ApiOkResponse({
    type: MarksResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n  
                  teacher with such id is not found
                  
                  InvalidQueryException`,
  })
  @Get('/:teacherId/marks')
  async getMarks (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query() query: ResponseQueryDTO,
  ) {
    const marks = await this.teacherService.getMarks(teacherId, query);
    return { marks };
  }

  @ApiOkResponse({
    type: PaginatedQuestionCommentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException
      Teacher with such id is not found
      Subject with such id is not found
    
    InvalidQueryException:
      Year must be a number
      Semester must be a number
      SortBy must be an enum
      Page must be a number
      PageSize must be a number
    
    DataNotFoundException: 
      Data was not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of the teacher to get comments',
  })
  @ApiEndpoint({
    summary: 'Get question answers with TEXT type (comments)',
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

  @Access(PERMISSION.TEACHERS_$TEACHERID_CATHEDRAS_UPDATE)
  @ApiBearerAuth()
  @Patch('/:teacherId/cathedra/:cathedraId')
  @ApiOkResponse({
    type: TeacherWithContactsFullResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  teacher with such id is not found
                  Cathedra with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async connectCathedra (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ) {
    return this.teacherService.connectTeacherWithCathedra(teacherId, cathedraId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TeacherWithContactsFullResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      teacher with such id is not found
      Cathedra with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n 
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of a teacher to verify',
  })
  @ApiParam({
    name: 'cathedraId',
    required: true,
    description: 'Id of a cathedra to verify',
  })
  @ApiEndpoint({
    summary: 'Remove the teacher from the cathedra',
    permissions: PERMISSION.TEACHERS_$TEACHERID_CATHEDRAS_DELETE,
  })
  @Delete('/:teacherId/cathedra/:cathedraId')
  async disconnectCathedra (
      @Param('teacherId', TeacherByIdPipe) teacherId: string,
      @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ) {
    return this.teacherService.disconnectTeacherFromCathedra(teacherId, cathedraId);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Full name is too short (min: 5)
      Full name is too long (max: 50)
      Title can not be empty
      Title is too short (min: 5)
      Title is too long (max: 100)
      Message can not be empty
      Message is too short (min: 10)
      Message is too long (max: 3500)
     
    InvalidEntityException:
      Group with such id is not found
      Teacher with such id is not found`,
  })
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Id of the teacher to send complaint',
  })
  @ApiEndpoint({
    summary: 'Send a complaint to the teacher',
  })
  @Post('/:teacherId/sendComplaint')
  sendComplaint (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: ComplaintDTO,
  ) {
    return this.teacherService.sendComplaint(teacherId, body);
  }
}
