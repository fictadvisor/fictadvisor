import { Injectable } from '@nestjs/common';
import { CreateQuestionWithRolesDTO } from '../dtos/CreateQuestionWithRolesDTO';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { Prisma, QuestionType, SemesterDate, State, TeacherRole } from '@prisma/client';
import { UpdateQuestionWithRolesDTO } from '../dtos/UpdateQuestionWithRolesDTO';
import { ResponseData } from '../datas/ResponseData';
import { CreateQuestionRoleDTO } from '../dtos/CreateQuestionRoleDTO';
import { DbQuestionWithAnswers } from '../../database/entities/DbQuestionWithAnswers';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { UserRepository } from '../../database/repositories/UserRepository';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { DateService } from '../../utils/date/DateService';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DbQuestionWithRoles } from '../../database/entities/DbQuestionWithRoles';
import { QuestionAnswerRepository } from '../../database/repositories/QuestionAnswerRepository';
import { DbQuestionWithDiscipline } from '../../database/entities/DbQuestionWithDiscipline';
import { CommentsQueryDTO, CommentsSortMapper } from '../dtos/CommentsQueryDTO';
import { filterAsync } from '../../utils/ArrayUtil';
import { DbDiscipline, DbDiscipline_DisciplineTeacher } from '../../database/entities/DbDiscipline';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { PollDisciplineTeachersResponse } from '../responses/PollDisciplineTeachersResponse';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DatabaseUtils } from '../../database/DatabaseUtils';
@Injectable()
export class PollService {
  constructor (
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository,
    private disciplineMapper: DisciplineMapper,
    private dateService: DateService,
    private disciplineRepository: DisciplineRepository,
    private questionAnswerRepository: QuestionAnswerRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private studentRepository: StudentRepository,
    private groupRepository: GroupRepository,
  ) {}

  async create ({ roles, ...data }: CreateQuestionWithRolesDTO) {
    return this.questionRepository.create({
      ...data,
      questionRoles: {
        create: roles,
      },
    });
  }

  async deleteById (id: string) {
    return  this.questionRepository.deleteById(id);
  }

  async updateById (id: string, { roles, ...data }: UpdateQuestionWithRolesDTO) {
    const questionRoles = roles ? {
      deleteMany: {},
      create: roles,
    } : {};
    return this.questionRepository.updateById(id, {
      ...data,
      questionRoles,
    });

  }

  async getQuestions (roles: TeacherRole[], disciplineRoles: TeacherRole[]) {
    return this.questionRepository.findMany({
      where: {
        questionRoles: {
          some: {
            isShown: true,
            role: {
              in: roles,
            },
          },
          none: {
            isRequired: true,
            role: {
              notIn: disciplineRoles,
            },
          },
        },
      },
    }) as unknown as Promise<DbQuestionWithRoles[]>;
  }

  async getQuestionWithMarks (teacherId: string, data?: ResponseData): Promise<DbQuestionWithAnswers[]> {
    return await this.questionRepository.findMany({
      where: {
        OR: [{
          type: QuestionType.TOGGLE,
        }, {
          type: QuestionType.SCALE,
        }],
      },
      include: {
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                ...data,
              },
            },
          },
        },
      },
    }) as unknown as Promise<DbQuestionWithAnswers[]>;
  }

  async getQuestionWithText (
    teacherId: string,
    query: CommentsQueryDTO = {}
  ) {

    const data = {
      where: {
        type: QuestionType.TEXT,
        questionAnswers: {
          some: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                subjectId: query.subjectId,
                year: query.year,
                semester: query.semester,
              },
            },
          },
        },
      },
      include: {
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                subjectId: query.subjectId,
                year: query.year,
                semester: query.semester,
              },
            },
          },
          orderBy: query.sortBy
            ? CommentsSortMapper[query.sortBy]
            : undefined,
          include: {
            disciplineTeacher: {
              include: {
                discipline: {
                  include: {
                    subject: true,
                  },
                },
              },
            },
          },
        },
      },
    }; 
    return DatabaseUtils.paginate<DbQuestionWithDiscipline>(this.questionRepository, query, data);
  }

  async getQuestionById (id: string) {
    return this.questionRepository.findById(id);
  }

  async giveRole (data: CreateQuestionRoleDTO, questionId: string) {
    return await this.questionRepository.updateById(questionId, {
      questionRoles: {
        create: {
          ...data,
        },
      },
    });
  }

  async deleteRole (questionId: string, role: TeacherRole) {
    return this.questionRepository.updateById(questionId, {
      questionRoles: {
        delete: {
          questionId_role: {
            questionId: questionId,
            role: role,
          },
        },
      },
    });
  }

  async checkDoesUserHaveSelectiveDisciplines (userId: string, semester: SemesterDate) {
    const group = await this.groupRepository.find({
      students: {
        some: {
          userId: userId,
        },
      },
      selectiveAmounts: {
        some: {
          semester: semester.semester,
          year: semester.year,
        },
      },
    });
    return !!group;
  }

  async getDisciplineTeachers (userId: string): Promise<PollDisciplineTeachersResponse> {
    const user = await this.userRepository.findById(userId);
    if (user.state !== State.APPROVED) {
      throw new NoPermissionException();
    }

    const { isFinished, semesters } = await this.dateService.getAllPreviousSemesters();

    let disciplines: DbDiscipline[] = [];

    for (const semester of semesters) {
      const mandatoryDisciplines = await this.getSemesterMandatoryDisciplines(semester, userId);
      const selectiveDisciplines = await this.getSemesterSelectiveDisciplines(semester, userId);
      disciplines.push(...mandatoryDisciplines, ...selectiveDisciplines);
    }

    const hasSelective = await this.checkDoesUserHaveSelectiveDisciplines(userId, isFinished ? semesters[0] : semesters[1]);
    const hasSelectedInLastSemester = hasSelective
      ? !!((await this.getSelectedInSemester(isFinished ? semesters[0] : semesters[1], userId)).length)
      : true;

    disciplines = disciplines.filter((discipline) => {
      return this.dateService.isPreviousSemester(
        { isFinished, ...semesters[0] },
        { semester: discipline.semester, year: discipline.year }
      );
    });

    const answers = await this.questionAnswerRepository.findMany({ where: { userId } });

    for (const discipline of disciplines) {
      discipline.disciplineTeachers = await filterAsync<DbDiscipline_DisciplineTeacher>(discipline.disciplineTeachers, async (teacher) => {
        const hasAnyAnswer = (answer) => teacher.id === answer.disciplineTeacherId;
        const isRemoved = await this.disciplineTeacherRepository.find({
          id: teacher.id,
          removedDisciplineTeachers: {
            some: {
              studentId: userId,
            },
          },
        });
        return !answers.some(hasAnyAnswer) && !isRemoved;
      });
    }

    return {
      hasSelectedInLastSemester: hasSelectedInLastSemester,
      teachers: this.disciplineMapper.getDisciplineTeachers(disciplines),
    };
  }

  private async getSelectedInSemester (semester: SemesterDate, studentId: string) {
    return this.disciplineRepository.findMany({
      where: {
        semester: semester.semester,
        year: semester.year,
        selectiveDisciplines: {
          some: {
            studentId,
          },
        },
      },
    });
  }

  private async getSemesterSelectiveDisciplines (semester: SemesterDate, studentId: string) {
    const selected = await this.getSelectedInSemester(semester, studentId);

    if (selected.length) {
      return selected;
    } else {
      return this.disciplineRepository.findMany({
        where: {
          semester: semester.semester,
          year: semester.year,
          group: {
            students: {
              some: {
                userId: studentId,
              },
            },
          },
          isSelective: true,
        },
      });
    }
  }

  private async getSemesterMandatoryDisciplines (semester: SemesterDate, userId: string) {
    return this.disciplineRepository.findMany({
      where: {
        semester: semester.semester,
        year: semester.year,
        group: {
          students: {
            some: {
              userId,
            },
          },
        },
        isSelective: false,
      },
    });
  }
}
