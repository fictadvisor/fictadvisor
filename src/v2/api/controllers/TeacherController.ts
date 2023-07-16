import { Body, Controller, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { TeacherService } from '../services/TeacherService';
import { TeacherMapper } from '../../mappers/TeacherMapper';
import { QueryAllTeacherDTO } from '../dtos/QueryAllTeacherDTO';
import { CreateTeacherDTO } from '../dtos/CreateTeacherDTO';
import { UpdateTeacherDTO } from '../dtos/UpdateTeacherDTO';
import { CreateContactDTO } from '../dtos/CreateContactDTO';
import { UpdateContactDTO } from '../dtos/UpdateContactDTO';
import { Access } from 'src/v2/security/Access';
import { TeacherByIdPipe } from '../pipes/TeacherByIdPipe';
import { ContactByNamePipe } from '../pipes/ContactByNamePipe';
import { SubjectByIdPipe } from '../pipes/SubjectByIdPipe';
import { ResponseQueryDTO } from '../dtos/ResponseQueryDTO';
import { PollService } from '../services/PollService';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { CommentsQueryDTO } from '../dtos/CommentsQueryDTO';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse, ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TeacherResponse } from '../responses/TeacherResponse';
import { TeacherRolesResponse } from '../responses/TeacherRolesResponse';
import { SubjectsResponse } from '../responses/SubjectsResponse';
import { DisciplineTeacherAndSubjectResponse } from '../responses/DisciplineTeacherAndSubjectResponse';
import { ContactResponse } from '../responses/ContactResponse';
import { MarksResponse } from '../responses/MarksResponse';
import { PaginatedQuestionResponse } from '../responses/PaginatedQuestionResponse';
import { TeacherWithSubjectResponse } from '../responses/TeacherWithSubjectResponse';
import { TeacherWithContactAndRoleResponse } from '../responses/TeacherWithContactAndRoleResponse';
import { ContactsResponse } from '../responses/ContactsResponse';
import { CathedraByIdPipe } from '../pipes/CathedraByIdPipe';
import { TeacherWithRolesAndContactsResponse } from '../responses/TeacherWithRolesAndContactsResponse';
import { PaginatedTeachersResponse } from '../responses/PaginatedTeachersResponse';

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

  @Get()
  @ApiOkResponse({
    type: PaginatedTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidQueryException:\n
                  Page must be a number
                  PageSize must be a number
                  Wrong value for order`,
  })
  async getAll (
    @Query() query: QueryAllTeacherDTO,
  ) {
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
    description: `InvalidEntityId:\n
                  teacher with such id is not found`,
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
    description: `InvalidEntityId:\n
                  teacher with such id is not found`,
  })
  @Get('/:teacherId/subjects')
  async getSubjects (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const subjects = await this.teacherService.getTeacherSubjects(teacherId);

    return { subjects };
  }

  @Access('users.$userId.teachers.$teacherId.disciplines.get')
  @ApiBearerAuth()
  @ApiQuery({
    type: Boolean,
    name: 'notAnswered',
  })
  @ApiQuery({
    type: String,
    name: 'userId',
  })
  @ApiOkResponse({
    type: DisciplineTeacherAndSubjectResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  teacher with such id is not found
                  user with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Get('/:teacherId/disciplines')
  async getDisciplines (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query('notAnswered') notAnswered: boolean,
    @Query('userId', UserByIdPipe) userId: string,
  ) {
    const disciplineTeachers = await this.teacherService.getUserDisciplineTeachers(teacherId, userId, notAnswered);
    return this.disciplineTeacherMapper.getDisciplines(disciplineTeachers);
  }

  @ApiOkResponse({
    type: TeacherWithSubjectResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  teacher with such id is not found
                  subject with such id is not found`,
  })
  @Get('/:teacherId/subjects/:subjectId')
  async getSubject (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.teacherService.getTeacherSubject(teacherId, subjectId);
  }

  @ApiOkResponse({
    type: TeacherWithContactAndRoleResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  teacher with such id is not found`,
  })
  @Get('/:teacherId')
  getTeacher (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.getTeacher(teacherId);
  }

  @Access('teachers.create')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: TeacherResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidBodyException:\n
                  First name is too short (min: 2
                  First name is too long (max: 40)
                  First name can not be empty
                  First name is incorrect (A-Я(укр.)\\\\-\\' )')
                  Middle name is too short (min: 2
                  Middle name is too long (max: 40)
                  Middle name is incorrect (A-Я(укр.)\\\\-\\' )')
                  Last name is too short (min: 2
                  Last name is too long (max: 40)
                  Last name can not be empty
                  Last name is incorrect (A-Я(укр.)\\\\-\\' )')
                  Description is too long (max: 400)`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Post()
  async create (
    @Body() body: CreateTeacherDTO,
  ) {
    const dbTeacher = await this.teacherService.create(body);
    return this.teacherMapper.getTeacher(dbTeacher);
  }

  @Access('teachers.$teacherId.update')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: TeacherResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  teacher with such id is not found
                  
                  InvalidBodyException:\n
                  First name is too short (min: 2
                  First name is too long (max: 40)
                  First name is incorrect (A-Я(укр.)\\\\-\\' )')
                  Middle name is too long (max: 40)
                  Middle name is too short (min: 2
                  Middle name is incorrect (A-Я(укр.)\\\\-\\' )')
                  Last name is too short (min: 2
                  Last name is too long (max: 40)
                  Last name is incorrect (A-Я(укр.)\\\\-\\' )')
                  Description is too long (max: 400)`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Patch('/:teacherId')
  async update (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO,
  ) {
    const dbTeacher = await this.teacherService.update(teacherId, body);
    return this.teacherMapper.getTeacher(dbTeacher);
  }

  @Access('teachers.$teacherId.delete')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n  
                  teacher with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
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
    description: `InvalidEntityIdException:\n  
                  teacher with such id is not found`,
  })
  @Get('/:teacherId/contacts')
  async getAllContacts (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const contacts = await this.teacherService.getAllContacts(teacherId);
    return { contacts };
  }

  @ApiParam({
    type: String,
    name: 'teacherId',
  })
  @ApiParam({
    type: String,
    name: 'name',
  })
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n  
                  teacher with such id is not found
                  
                  InvalidContactNameException:\n 
                  Contact with such name is not found`,
  })
  @Get('/:teacherId/contacts/:name')
  getContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.getContact(params.teacherId, params.name);
  }

  @Access('teachers.$teacherId.contacts.create')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  teacher with such id is not found 
                  
                  InvalidBodyException:\n 
                  Name is too long (max: 100)
                  Name can not be empty
                  Name is not correct (a-zA-Z0-9A-Я(укр.)\\-' )
                  Display name is too long (max: 100)
                  Display name can not be empty
                  Link is too long (max: 200)
                  Link contains wrong symbols (ASCII only)`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Post('/:teacherId/contacts')
  createContact (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.teacherService.createContact(teacherId, body);
  }

  @Access('teachers.$teacherId.contacts.update')
  @ApiBearerAuth()
  @ApiParam({
    type: String,
    name: 'teacherId',
  })
  @ApiParam({
    type: String,
    name: 'name',
  })
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n  
                  teacher with such id is not found
                  
                  InvalidContactNameException:\n  
                  Contact with such name is not found
                  
                  InvalidBodyException:\n  
                  Display name is too long (max: 100)
                  Link is too long (max: 200)
                  Link contains wrong symbols (ASCII only)`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Patch('/:teacherId/contacts/:name')
  async updateContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
    @Body() body: UpdateContactDTO,
  ) {
    return this.teacherService.updateContact(params.teacherId, params.name, body);
  }

  @Access('teachers.$teacherId.contacts.delete')
  @ApiBearerAuth()
  @ApiParam({
    type: String,
    name: 'teacherId',
  })
  @ApiParam({
    type: String,
    name: 'name',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n  
                  teacher with such id is not found
                  
                  InvalidContactNameException:\n  
                  Contact with such name is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
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
    type: PaginatedQuestionResponse,
  })
  @ApiBadRequestResponse({
    description: 'InvalidQueryException',
  })
  @Get('/:teacherId/comments')
  async getComments (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query() query: CommentsQueryDTO,
  ) {
    this.teacherService.checkQueryDate(query);
    const questions = await this.pollService.getQuestionWithText(teacherId, query);
    return {
      ...this.questionMapper.getQuestionWithResponses(questions.data),
      pagination: questions.pagination,
    };
  }

  @Access('teachers.$teacherId.cathedras.update')
  @ApiBearerAuth()
  @Patch('/:teacherId/cathedra/:cathedraId')
  @ApiOkResponse({
    type: TeacherWithRolesAndContactsResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  teacher with such id is not found
                  cathedra with such id is not found`,
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
}
