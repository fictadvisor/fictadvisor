import { Injectable } from '@nestjs/common';
import { CreateQuestionWithRolesDTO } from '../dtos/CreateQuestionWithRolesDTO';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { QuestionType, SemesterDate, TeacherRole, Prisma } from '@prisma/client';
import { UpdateQuestionWithRolesDTO } from '../dtos/UpdateQuestionWithRolesDTO';
import { ResponseData } from '../datas/ResponseData';
import { CreateQuestionRoleDTO } from '../dtos/CreateQuestionRoleDTO';
import { DbQuestionWithAnswers } from '../../database/entities/DbQuestionWithAnswers';
import { UserRepository } from '../../database/repositories/UserRepository';
import { DateService } from '../../utils/date/DateService';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DbQuestionWithRoles } from '../../database/entities/DbQuestionWithRoles';
import { QuestionAnswerRepository } from '../../database/repositories/QuestionAnswerRepository';
import { CommentsQueryDTO, CommentsSort, CommentsSortMapper } from '../dtos/CommentsQueryDTO';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { SortQATParam } from '../dtos/SortQATParam';
import { QueryAllDisciplineTeacherForPollDTO } from '../dtos/QueryAllDisciplineTeacherForPollDTO';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';

@Injectable()
export class PollService {
  constructor (
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
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
    query: CommentsQueryDTO = {},
  ) {
    const questionsData = {
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
      include: undefined,
    };
    const questions = await this.questionRepository.findMany(questionsData);

    const commentsData = {
      where: {
        disciplineTeacher: {
          teacherId,
          discipline: {
            subjectId: query.subjectId,
            year: query.year,
            semester: query.semester,
          },
        },
        question: {
          id: null,
          type: QuestionType.TEXT,
        },
      },
      orderBy: query.sortBy
        ? CommentsSortMapper[query.sortBy]
        : CommentsSortMapper[CommentsSort.NEWEST],
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
    };

    const result = [];
    for (const question of questions) {
      commentsData.where.question.id = question.id;
      const comments = await DatabaseUtils.paginate(
        this.questionAnswerRepository,
        query,
        commentsData,
      );
      result.push({
        ...question,
        comments,
      });
    }
    return result;
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

  async getDisciplineTeachers (userId: string, query: QueryAllDisciplineTeacherForPollDTO) {
    const semesters = await this.dateService.getPreviousSemesters(true);

    const disciplineWhere: Prisma.DisciplineWhereInput[] = [];

    for (const s of semesters) {
      const selected = await this.getSelectedInSemester(s, userId);
      const part: Prisma.DisciplineWhereInput = {
        semester: s.semester,
        year: s.year,
        isSelective: false,
        group: {
          students: {
            some: {
              userId,
            },
          },
        },
      };

      disciplineWhere.push({ ...part });

      if (selected) part.selectiveDisciplines = { some: { studentId: userId } };
      disciplineWhere.push({ ...part, isSelective: true });
    }

    const { sort = 'lastName', order = 'asc' } = query;
    const search = DatabaseUtils.getSearch(
      query,
      SortQATParam.FIRST_NAME.toString(),
      SortQATParam.LAST_NAME.toString(),
      SortQATParam.MIDDLE_NAME.toString(),
    );

    const disciplineTeachers = await this.disciplineTeacherRepository.findMany({
      where: {
        teacher: {
          ...search,
        },
        discipline: {
          is: {
            OR: disciplineWhere,
          },
        },
        removedDisciplineTeachers: {
          every: {
            studentId: {
              not: userId,
            },
          },
        },
        questionAnswers: {
          every: {
            userId: {
              not: userId,
            },
          },
        },
      },
      orderBy: {
        teacher: {
          [sort]: order,
        },
      },
    });

    const hasSelective = await this.checkDoesUserHaveSelectiveDisciplines(userId, semesters[0]);
    const hasSelectedInLastSemester = !hasSelective && (await this.getSelectedInSemester(semesters[0], userId)).length;

    return {
      hasSelectedInLastSemester: !!hasSelectedInLastSemester,
      teachers: this.disciplineTeacherMapper.getDisciplineTeachers(disciplineTeachers),
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
}
