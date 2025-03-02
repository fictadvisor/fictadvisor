import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  QueryAllStudentDTO,
  CreateStudentWithRolesDTO,
  UpdateStudentWithRolesDTO,
  UpdateStudentSelectivesDTO,
} from '@fictadvisor/utils/requests';
import {
  SimpleStudentResponse,
  SimpleStudentsResponse,
  SelectiveDisciplinesResponse,
  RemainingSelectivesResponse,
  OrdinaryStudentResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { AllStudentsPipe } from '../../../common/pipes/AllStudentsPipe';
import { StudentByIdPipe } from '../../../common/pipes/StudentByIdPipe';
import { StudentMapper } from '../../../common/mappers/StudentMapper';
import { DisciplineMapper } from '../../../common/mappers/DisciplineMapper';
import { StudentService } from './StudentService';
import { UserService } from '../../user/v2/UserService';
import { StudentDocumentation } from '../../../common/documentation/modules/v2/student';

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
    private readonly disciplineMapper: DisciplineMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all students',
    documentation: StudentDocumentation.GET_ALL,
    permissions: PERMISSION.STUDENTS_GET,
  })
  @Get()
  async getAll (
    @Query(AllStudentsPipe) query: QueryAllStudentDTO,
  ): Promise<SimpleStudentsResponse> {
    const studentsWithPagination = await this.studentService.getAll(query);
    const students = this.studentMapper.getSimpleStudents(studentsWithPagination.data);
    return {
      students,
      pagination: studentsWithPagination.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Create a new student by admin',
    documentation: StudentDocumentation.CREATE_STUDENT,
    permissions: PERMISSION.STUDENTS_CREATE,
  })
  @Post()
  async createStudent (
    @Body() body: CreateStudentWithRolesDTO,
  ): Promise<OrdinaryStudentResponse> {
    const student = await this.studentService.createStudent(body);
    return this.studentMapper.getOrdinaryStudent(student);
  }

  @ApiEndpoint({
    summary: 'Update student',
    documentation: StudentDocumentation.UPDATE_STUDENT,
    permissions: PERMISSION.STUDENTS_$STUDENTID_UPDATE,
  })
  @Patch('/:studentId')
  async updateStudent (
    @Param('studentId', StudentByIdPipe) studentId: string,
    @Body() body: UpdateStudentWithRolesDTO,
  ): Promise<OrdinaryStudentResponse> {
    const student = await this.studentService.updateStudent(studentId, body);
    return this.studentMapper.getOrdinaryStudent(student);
  }

  @ApiEndpoint({
    summary: 'Delete student by user\'s id',
    documentation: StudentDocumentation.DELETE_STUDENT,
    permissions: PERMISSION.STUDENTS_$STUDENTID_DELETE,
  })
  @Delete('/:studentId')
  async deleteStudent (
    @Param('studentId', StudentByIdPipe) studentId: string,
  ): Promise<OrdinaryStudentResponse> {
    const deletedStudent =  await this.studentService.deleteStudent(studentId);
    return this.studentMapper.getOrdinaryStudent(deletedStudent);
  }

  @ApiEndpoint({
    summary: 'Update student\'s selective disciplines',
    documentation: StudentDocumentation.UPDATE_STUDENT_SELECTIVES,
    permissions: PERMISSION.STUDENTS_$STUDENTID_UPDATE,
  })
  @Patch('/:studentId/selectiveDisciplines')
  async updateStudentSelectives (
    @Param('studentId', StudentByIdPipe) studentId: string,
    @Body() body: UpdateStudentSelectivesDTO,
  ): Promise<OrdinaryStudentResponse> {
    const student = await this.studentService.updateStudentSelectives(studentId, body);
    return this.studentMapper.getOrdinaryStudent(student);
  }

  @ApiEndpoint({
    summary: 'Get user\'s selective disciplines',
    documentation: StudentDocumentation.GET_SELECTIVE_DISCIPLINES,
    permissions: PERMISSION.STUDENTS_$STUDENTID_SELECTIVE_GET,
  })
  @Get('/:studentId/selectiveDisciplines')
  async getSelectiveDisciplines (
    @Param('studentId', StudentByIdPipe) studentId: string,
  ): Promise<SelectiveDisciplinesResponse[]> {
    const dbDisciplines = await this.userService.getSelectiveDisciplines(studentId);
    return this.disciplineMapper.getSelectiveDisciplines(dbDisciplines);
  }
  
  @ApiEndpoint({
    summary: 'Get all selective disciplines available to the user from the whole list',
    documentation: StudentDocumentation.GET_REMAINING_SELECTIVES,
    permissions: PERMISSION.STUDENTS_$STUDENTID_SELECTIVE_GET,
  })
  @Get('/:studentId/remainingSelectives')
  async getRemainingSelectives (
    @Param('studentId', StudentByIdPipe) studentId: string,
  ): Promise<RemainingSelectivesResponse[]> {
    return await this.userService.getRemainingSelectives(studentId);
  }

  @ApiEndpoint({
    summary: 'Return student\'s data',
    documentation: StudentDocumentation.GET_STUDENT,
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
