import { Injectable } from '@nestjs/common';
import {
  CreateQuestionRoleDTO,
  CommentsQueryDTO,
  QueryAllDisciplineTeacherForPollDTO,
  QueryAllQuestionDTO,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  SortDTO,
  QueryMarksDTO,
} from '@fictadvisor/utils/requests';
import { PollDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import {
  CommentsSortOrder,
  DisciplineTypeEnum,
  SortQATParam,
  OrderQAParam,
} from '@fictadvisor/utils/enums';
import { DatabaseUtils, PaginateArgs } from '../../../database/v2/database.utils';
import { DisciplineTeacherMapper } from '../../../common/mappers/DisciplineTeacherMapper';
import { CommentsSortMapper } from '../../../common/mappers/CommentsSortMapper';
import { DateService } from '../../date/DateService';
import { DbQuestion } from '../../../database/v2/entities/DbQuestion';
import { QuestionRepository } from '../../../database/v2/repositories/QuestionRepository';
import { DisciplineRepository } from '../../../database/v2/repositories/DisciplineRepository';
import { QuestionAnswerRepository } from '../../../database/v2/repositories/QuestionAnswerRepository';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/DisciplineTeacherRepository';
import { GroupRepository } from '../../../database/v2/repositories/GroupRepository';
import {
  QuestionType,
  SemesterDate,
  Prisma,
} from '@prisma/client/fictadvisor';
import { DbDiscipline } from '../../../database/v2/entities/DbDiscipline';
import { PaginatedData } from '../../../database/types/paginated.data';
import { DbQuestionAnswer } from '../../../database/v2/entities/DbQuestionAnswer';
import { Sort } from '@fictadvisor/utils';
import { QuestionWithRolesRepository } from '../../../database/v2/repositories/QuestionWithRolesRepository';
import { DbQuestionWithRoles } from '../../../database/v2/entities/DbQuestionWithRoles';

@Injectable()
export class PollService {
  constructor (
    private questionRepository: QuestionRepository,
    private questionWithRolesRepository: QuestionWithRolesRepository,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private dateService: DateService,
    private disciplineRepository: DisciplineRepository,
    private questionAnswerRepository: QuestionAnswerRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private groupRepository: GroupRepository,
  ) {}

  async getAll (query: QueryAllQuestionDTO): Promise<PaginatedData<DbQuestion>> {
    const search = {
      AND: [
        this.getSearchForQuestions.questionText(query.search),
        query.types?.length
          ? this.getSearchForQuestions.questionTypes(query.types)
          : {},
      ],
    };

    const orderBy: Sort = query.sort
      ? this.getSortedQuestions(query)
      : { orderBy: [{ order: 'asc' }] };

    const data: PaginateArgs<'question'> = {
      where: {
        ...search,
      },
      ...orderBy,
    };

    return await DatabaseUtils.paginate<'question', DbQuestion>(this.questionRepository, query, data);
  }

  private getSearchForQuestions = {
    questionText: (search: string) => DatabaseUtils.getSearch({ search }, 'text'),
    questionTypes: (questionTypes: QuestionType[]) => ({
      OR: questionTypes.map((questionType) => ({ type: questionType })),
    }),
  };

  private getSortedQuestions ({ sort, order }: SortDTO): Sort {
    if (!order) order = OrderQAParam.ASC;
    const orderBy = [{ [sort]: order }];
    return { orderBy };
  }

  async create (data: CreateQuestionDTO): Promise<DbQuestion> {
    return this.questionRepository.create(data);
  }

  async deleteById (id: string): Promise<DbQuestion> {
    return this.questionRepository.deleteById(id);
  }

  async updateById (id: string, data: UpdateQuestionDTO): Promise<DbQuestion> {
    return this.questionRepository.updateById(id, data);
  }

  async getQuestions (disciplineTypes: DisciplineTypeEnum[], disciplineRoles: DisciplineTypeEnum[]): Promise<DbQuestionWithRoles[]> {
    return this.questionWithRolesRepository.findMany({
      questionRoles: {
        some: {
          isShown: true,
          role: {
            in: disciplineTypes,
          },
        },
        none: {
          isRequired: true,
          role: {
            notIn: disciplineRoles,
          },
        },
      },
    });
  }

  async getQuestionWithMarks (teacherId: string, data?: QueryMarksDTO): Promise<DbQuestion[]> {
    return this.questionRepository.findMany({
      OR: [
        { type: QuestionType.TOGGLE },
        { type: QuestionType.SCALE },
      ],
    }, {
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
    });
  }

  async getQuestionWithText (teacherId: string, query: CommentsQueryDTO = {}) {
    const questions = await this.questionRepository.findMany({
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
    });

    const commentsData: PaginateArgs<'questionAnswer'> = {
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
        : CommentsSortMapper[CommentsSortOrder.NEWEST],
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

      const comments = await DatabaseUtils.paginate<'questionAnswer', DbQuestionAnswer>(
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

  async getQuestionById (id: string): Promise<DbQuestionWithRoles> {
    return this.questionWithRolesRepository.findOne({ id });
  }

  async giveRole (data: CreateQuestionRoleDTO, questionId: string): Promise<DbQuestionWithRoles> {
    return await this.questionWithRolesRepository.updateById(questionId, {
      questionRoles: {
        create: data,
      },
    });
  }

  async deleteRole (questionId: string, role: DisciplineTypeEnum): Promise<DbQuestionWithRoles> {
    return this.questionWithRolesRepository.updateById(questionId, {
      questionRoles: {
        delete: {
          questionId_role: {
            questionId: questionId,
            role,
          },
        },
      },
    });
  }

  async checkDoesUserHaveSelectiveDisciplines (userId: string, semester: SemesterDate): Promise<boolean> {
    const group = await this.groupRepository.count({
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

  async getDisciplineTeachers (
    userId: string,
    query: QueryAllDisciplineTeacherForPollDTO,
  ): Promise<PollDisciplineTeachersResponse> {
    const { semesters } = await this.dateService.getPreviousSemesters(true);

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

    const { sort = 'lastName', order = 'asc', disciplineTypes = [] } = query;
    const search = DatabaseUtils.getSearch(
      query,
      SortQATParam.FIRST_NAME.toString(),
      SortQATParam.LAST_NAME.toString(),
      SortQATParam.MIDDLE_NAME.toString(),
    );
    const roleFilter =
      disciplineTypes?.length > 0
        ? {
          roles: {
            some: {
              disciplineType: DatabaseUtils.getSearchByArray(disciplineTypes, 'name'),
            },
          },
        }
        : {};

    const disciplineTeachers = await this.disciplineTeacherRepository.findMany({
      teacher: {
        ...search,
      },
      ...roleFilter,
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
    }, undefined, undefined, {
      teacher: {
        [sort]: order,
      },
    });

    const hasSelective = await this.checkDoesUserHaveSelectiveDisciplines(userId, semesters[0]);
    const hasSelectedInLastSemester = hasSelective === !!(await this.getSelectedInSemester(semesters[0], userId)).length;

    return {
      hasSelectedInLastSemester,
      teachers: this.disciplineTeacherMapper.getDisciplineTeachersFull(disciplineTeachers),
    };
  }

  private async getSelectedInSemester (semester: SemesterDate, studentId: string): Promise<DbDiscipline[]> {
    return this.disciplineRepository.findMany({
      semester: semester.semester,
      year: semester.year,
      selectiveDisciplines: {
        some: {
          studentId,
        },
      },
    });
  }
}
