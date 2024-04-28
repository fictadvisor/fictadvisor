import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse, ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  QueryAllStudentDTO,
  CreateStudentWithRolesDTO,
  UpdateStudentWithRolesDTO,
  UpdateStudentSelectivesDTO,
} from '@fictadvisor/utils/requests';
import {
  FullStudentResponse,
  SimpleStudentResponse,
  SimpleStudentsResponse,
  SelectiveDisciplinesResponse,
  RemainingSelectivesResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { AllStudentsPipe } from '../pipes/AllStudentsPipe';
import { StudentByIdPipe } from '../pipes/StudentByIdPipe';
import { StudentMapper } from '../../mappers/StudentMapper';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { StudentService } from '../services/StudentService';
import { UserService } from '../services/UserService';

@ApiTags('Students')
@Controller({
  version: '2',
  path: '/students',
})
export class StudentController {
  constructor (
    private readonly studentService: StudentService,
    private readonly studentMapper: StudentMapper,
    private readonly userService: UserService,
    private readonly disciplineMapper: DisciplineMapper
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: SimpleStudentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
    
    InvalidBodyException:
      Sort must be an enum
      Wrong value for order
      Groups must be an array
      Roles must be an array
      Each element of roles should be an enum
      States must be an array
      Each element of states must be an enum
      Page must be a number
      PageSize must be a number`,
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
  @ApiEndpoint({
    summary: 'Get all students',
    permissions: PERMISSION.STUDENTS_GET,
  })
  @Get()
  async getAll (
    @Query(AllStudentsPipe) query: QueryAllStudentDTO,
  ): Promise<SimpleStudentsResponse> {
    const studentsWithPagination = await this.studentService.getAll(query);
    const students = this.studentMapper.getStudents(studentsWithPagination.data);
    return {
      students,
      pagination: studentsWithPagination.pagination,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: FullStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      First name is not correct (A-Я(укр.)\\-' )
      First name is too short (min 2)
      First name is too long (max 40)
      Last name is not correct (A-Я(укр.)\\-' )
      Last name is too short (min 2)
      Last name is too long (max 40)
      Middle name is not correct (A-Я(укр.)\\-' )
      Middle name is too long (max 40)
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Username cannot be empty
      Role name should be an enum
      Role name can not be empty
      Group id should be UUID
      Group id can not be empty
      
    NotRegisteredException:
      User with such username is not registered yet
      
    AlreadyExistException:
      Student already exist`,
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
  @ApiEndpoint({
    summary: 'Create a new student by admin',
    permissions: PERMISSION.STUDENTS_CREATE,
  })
  @Post()
  async createUser (@Body() body: CreateStudentWithRolesDTO) {
    const student = await this.studentService.createStudent(body);
    return this.studentMapper.getStudent(student);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: FullStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      First name is not correct (A-Я(укр.)\\-' )
      First name is too short (min 2)
      First name is too long (max 40)
      Last name is not correct (A-Я(укр.)\\-' )
      Last name is too short (min 2)
      Last name is too long (max 40)
      Middle name is not correct (A-Я(укр.)\\-' )
      Middle name is too long (max 40)
      Role name should be an enum
      Group id should be UUID
      
    InvalidEntityIdException:
      Student with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action
      
    CaptainCanNotLeaveException:
      Captain may not leave the group`,
  })
  @ApiParam({
    name: 'studentId',
    required: true,
    description: 'Id of a student',
  })
  @ApiEndpoint({
    summary: 'Update student',
    permissions: PERMISSION.STUDENTS_$STUDENTID_UPDATE,
  })
  @Patch('/:studentId')
  async updateStudent (
    @Param('studentId', StudentByIdPipe) studentId: string,
    @Body() body: UpdateStudentWithRolesDTO,
  ) {
    const student = await this.studentService.updateStudent(studentId, body);
    return this.studentMapper.getStudent(student);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
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
    name: 'studentId',
    required: true,
    description: 'Id of a student to delete',
  })
  @ApiEndpoint({
    summary: 'Delete student by user\'s id',
    permissions: PERMISSION.STUDENTS_$STUDENTID_DELETE,
  })
  @Delete('/:studentId')
  deleteStudent (
    @Param('studentId', StudentByIdPipe) studentId: string,
  ) {
    return this.studentService.deleteStudent(studentId);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Student with such id is not found
    
    InvalidBodyException:
      Ids of selective disciplines should be an array
      Ids of selective disciplines should be UUIDs
      Ids of selective disciplines should be an array
      Ids of selective disciplines should be UUIDs 
    
    NotBelongException: 
      This selective does not belong to this student
      This discipline does not belong to this group
      
    AlreadySelectedException:
      You have already selected these disciplines
      
    ExcessiveSelectiveDisciplinesException:
      There are excessive selective disciplines in the request`,
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
    name: 'studentId',
    required: true,
    description: 'Id of a student',
  })
  @ApiEndpoint({
    summary: 'Update student\'s selective disciplines',
    permissions: PERMISSION.STUDENTS_$STUDENTID_UPDATE,
  })
  @Patch('/:studentId/selectiveDisciplines')
  async updateStudentSelectives (
    @Param('studentId', StudentByIdPipe) studentId: string,
    @Body() body: UpdateStudentSelectivesDTO
  ) {
    const student = await this.studentService.updateStudentSelectives(studentId, body);
    return this.studentMapper.getStudent(student);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: [SelectiveDisciplinesResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found`,
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
    name: 'studentId',
    required: true,
    description: 'Id of a student',
  })
  @ApiEndpoint({
    summary: 'Get user\'s selective disciplines',
    permissions: PERMISSION.STUDENTS_$STUDENTID_SELECTIVE_GET,
  })
  @Get('/:studentId/selectiveDisciplines')
  async getSelectiveDisciplines (
    @Param('studentId', StudentByIdPipe) studentId: string,
  ): Promise<SelectiveDisciplinesResponse[]> {
    const dbDisciplines = await this.userService.getSelectiveDisciplines(studentId);
    return this.disciplineMapper.getSelectiveDisciplines(dbDisciplines);
  }
  
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [RemainingSelectivesResponse],
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
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  })
  @ApiEndpoint({
    summary: 'Get all selective disciplines available to the user from the whole list',
    permissions: PERMISSION.STUDENTS_$STUDENTID_SELECTIVE_GET,
  })
  @Get('/:studentId/remainingSelectives')
  async getRemainingSelectives (
      @Param('studentId', StudentByIdPipe) studentId: string,
  ): Promise<RemainingSelectivesResponse[]> {
    return await this.userService.getRemainingSelectives(studentId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: SimpleStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Student with such id is not found`,
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
    name: 'studentId',
    required: true,
    description: 'Id of a student',
  })
  @ApiEndpoint({
    summary: 'Return student\'s data',
    permissions: PERMISSION.STUDENTS_$STUDENTID_GET,
  })
  @Get('/:studentId')
  async getStudent (
    @Param('studentId', StudentByIdPipe) studentId: string,
  ): Promise<SimpleStudentResponse> {
    const student = await this.studentService.getStudent(studentId);
    return this.studentMapper.getSimpleStudent(student);
  }
}