import { Injectable } from '@nestjs/common';
import {
  CreateQuestionRoleDTO,
  CommentsQueryDTO,
  QueryAllDisciplineTeacherForPollDTO,
  QueryAllQuestionDTO,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  SortDTO,
} from '@fictadvisor/utils/requests';
import { PollDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import {
  CommentsSortOrder,
  DisciplineTypeEnum,
  SortQATParam,
  OrderQAParam,
} from '@fictadvisor/utils/enums';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { CommentsSortMapper } from '../../mappers/CommentsSortMapper';
import { DateService } from '../../utils/date/DateService';
import { DbQuestionWithAnswers } from '../../database/entities/DbQuestionWithAnswers';
import { DbQuestionWithRoles } from '../../database/entities/DbQuestionWithRoles';
import { DbQuestion } from '../../database/entities/DbQuestion';
import { ResponseData } from '../datas/ResponseData';
import { QuestionRepository } from '../../database/repositories/QuestionRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { QuestionAnswerRepository } from '../../database/repositories/QuestionAnswerRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import {
  QuestionType,
  SemesterDate,
  Prisma,
} from '@prisma/client';

@Injectable()
export class PollService {
  constructor (
    private questionRepository: QuestionRepository,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private dateService: DateService,
    private disciplineRepository: DisciplineRepository,
    private questionAnswerRepository: QuestionAnswerRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private groupRepository: GroupRepository,
  ) {}

  async getAll (query: QueryAllQuestionDTO) {
    const search = {
      AND: [
        this.getSearchForQuestions.questionText(query.search),
        query.types?.length
          ? this.getSearchForQuestions.questionTypes(query.types)
          : {},
      ],
    };

    const sort = query.sort
      ? this.getSortedQuestions(query)
      : { orderBy: { order: 'asc' } };

    const data: Prisma.QuestionFindManyArgs = {
      where: {
        ...search,
      },
      ...sort,
    };

    return await DatabaseUtils.paginate<DbQuestion>(this.questionRepository, query, data);
  }

  private getSearchForQuestions = {
    questionText: (search: string) => DatabaseUtils.getSearch({ search }, 'text'),
    questionTypes: (questionTypes: QuestionType[]) => ({
      OR: questionTypes.map((questionType) => ({ type: questionType })),
    }),
  };

  getSortedQuestions ({ sort, order }: SortDTO): object {
    if (!order) order = OrderQAParam.ASC;
    const orderBy = [{ [sort]: order }];
    return { orderBy };
  }

  async create (data: CreateQuestionDTO) {
    return this.questionRepository.create(data);
  }

  async deleteById (id: string) {
    return this.questionRepository.deleteById(id);
  }

  async updateById (id: string, data: UpdateQuestionDTO) {
    return this.questionRepository.updateById(id, data);
  }

  async getQuestions (disciplineTypes: DisciplineTypeEnum[], disciplineRoles: DisciplineTypeEnum[]) {
    return this.questionRepository.findMany({
      where: {
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
      },
    }) as unknown as Promise<DbQuestionWithRoles[]>;
  }

  async getQuestionWithMarks (teacherId: string, data?: ResponseData): Promise<DbQuestionWithAnswers[]> {
    return (await this.questionRepository.findMany({
      where: {
        OR: [
          {
            type: QuestionType.TOGGLE,
          },
          {
            type: QuestionType.SCALE,
          },
        ],
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
    })) as unknown as Promise<DbQuestionWithAnswers[]>;
  }

  async getQuestionWithText (teacherId: string, query: CommentsQueryDTO = {}) {
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
        create: data,
      },
    });
  }

  async deleteRole (questionId: string, role: DisciplineTypeEnum) {
    return this.questionRepository.updateById(questionId, {
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

  async getDisciplineTeachers (
    userId: string,
    query: QueryAllDisciplineTeacherForPollDTO,
  ): Promise<PollDisciplineTeachersResponse> {
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
      where: {
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
      },
      orderBy: {
        teacher: {
          [sort]: order,
        },
      },
    });

    const hasSelective = await this.checkDoesUserHaveSelectiveDisciplines(userId, semesters[0]);
    const hasSelectedInLastSemester = hasSelective && (await this.getSelectedInSemester(semesters[0], userId)).length;

    return {
      hasSelectedInLastSemester: !!hasSelectedInLastSemester,
      teachers: this.disciplineTeacherMapper.getDisciplineTeachersFull(disciplineTeachers),
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
