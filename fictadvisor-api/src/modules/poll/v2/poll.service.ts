import { Injectable } from '@nestjs/common';
import {
  CreateQuestionRoleDTO,
  CommentsQueryDTO,
  QueryAllDisciplineTeachersForPollDTO,
  QueryAllQuestionsDTO,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  SortDTO,
  QueryMarksDTO,
} from '@fictadvisor/utils/requests';
import { DisciplineTeacherFullResponse, PollDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import {
  CommentsSortOrder,
  DisciplineTypeEnum,
  SortQATParam,
  OrderQAParam,
} from '@fictadvisor/utils/enums';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { DateService } from '../../date/v2/date.service';
import { DbQuestion } from '../../../database/v2/entities/question.entity';
import { QuestionRepository } from '../../../database/v2/repositories/question.repository';
import { DisciplineRepository } from '../../../database/v2/repositories/discipline.repository';
import { QuestionAnswerRepository } from '../../../database/v2/repositories/question-answer.repository';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/discipline-teacher.repository';
import { GroupRepository } from '../../../database/v2/repositories/group.repository';
import {
  QuestionType,
  SemesterDate,
  Prisma,
} from '@prisma-client/fictadvisor';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { PaginatedData } from '../../../database/types/paginated.data';
import { DbQuestionAnswer } from '../../../database/v2/entities/question-answer.entity';
import { Sort } from '@fictadvisor/utils';
import { QuestionWithRolesRepository } from '../../../database/v2/repositories/question-with-roles.repository';
import { DbQuestionWithRoles } from '../../../database/v2/entities/question-with-roles.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbDisciplineTeacher } from '../../../database/v2/entities/discipline-teacher.entity';

@Injectable()
export class PollService {
  constructor (
    private questionRepository: QuestionRepository,
    private questionWithRolesRepository: QuestionWithRolesRepository,
    @InjectMapper() private mapper: Mapper,
    private dateService: DateService,
    private disciplineRepository: DisciplineRepository,
    private questionAnswerRepository: QuestionAnswerRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private groupRepository: GroupRepository,
  ) {}

  async getAll (query: QueryAllQuestionsDTO): Promise<PaginatedData<DbQuestion>> {
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

    return await PaginationUtil.paginate<'question', DbQuestion>(this.questionRepository, query, data);
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
        ? this.sortComments[query.sortBy]
        : this.sortComments[CommentsSortOrder.NEWEST],
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

      const comments = await PaginationUtil.paginate<'questionAnswer', DbQuestionAnswer>(
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

  private sortComments: { [key in CommentsSortOrder]: Prisma.Enumerable<Prisma.QuestionAnswerOrderByWithRelationInput>} = {
    [CommentsSortOrder.NEWEST]: [
      {
        disciplineTeacher: {
          discipline: {
            year: 'desc',
          },
        },
      },
      {
        disciplineTeacher: {
          discipline: {
            semester: 'desc',
          },
        },
      },
    ],
    [CommentsSortOrder.OLDEST]: [
      {
        disciplineTeacher: {
          discipline: {
            year: 'asc',
          },
        },
      },
      {
        disciplineTeacher: {
          discipline: {
            semester: 'asc',
          },
        },
      },
    ],
  };

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
    query: QueryAllDisciplineTeachersForPollDTO,
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
      teachers: this.mapper.mapArray(disciplineTeachers, DbDisciplineTeacher, DisciplineTeacherFullResponse),
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
