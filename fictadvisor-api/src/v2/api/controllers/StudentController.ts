import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryAllStudentDTO } from '../dtos/QueryAllStudentDTO';
import { StudentMapper } from '../../mappers/StudentMapper';
import { StudentService } from '../services/StudentService';
import { AllStudentsPipe } from '../pipes/AllStudentsPipe';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { PERMISSION } from '../../security/PERMISSION';
import { SimpleStudentsResponse } from '../responses/StudentResponse';

@ApiTags('Students')
@Controller({
  version: '2',
  path: '/students',
})
export class StudentController {
  constructor (
    private readonly studentService: StudentService,
    private readonly studentMapper: StudentMapper,
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
      Sort should be an enum
      Wrong value for order
      Groups should be an array
      Roles should be an array
      Each element of roles should be an enum
      States should be an array
      Each element of states should be an enum
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
  ) {
    const studentsWithPagination = await this.studentService.getAll(query);
    const students = this.studentMapper.getStudents(studentsWithPagination.data);
    return {
      students,
      pagination: studentsWithPagination.pagination,
    };
  }
}