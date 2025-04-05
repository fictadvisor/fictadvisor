import { Test } from '@nestjs/testing';
import { QuestionCommentData } from '../../src/modules/poll/v2/types/question-comment.data';
import { DbQuestion } from '../../src/database/v2/entities/question.entity';
import { DbQuestionWithRoles } from '../../src/database/v2/entities/question-with-roles.entity';
import { Mapper } from '@automapper/core';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { QuestionComment, QuestionWithCategoriesAndRolesResponse } from '@fictadvisor/utils/responses';
import { DisciplineTeacherService } from '../../src/modules/teacher/v2/discipline-teacher.service';
import { QuestionMapperModule } from '../../src/modules/poll/v2/mappers/question-mapper.module';

describe('QuestionMapper', () => {
  let mapper: Mapper;
  let disciplineTeacherService: DisciplineTeacherService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        QuestionMapperModule,
      ],
      providers: [DisciplineTeacherService],
    }).useMocker(() => ({})).compile();

    mapper = moduleRef.get(getMapperToken());
    disciplineTeacherService = moduleRef.get(DisciplineTeacherService);
  });

  describe('sortByCategories', () => {
    it('should return an array of questions with several categories if there are different and same categories', () => {
      const questions = [
        { category: 'sameCategory' },
        { category: 'sameCategory' },
        { category: 'anotherCategory' },
      ] as DbQuestion[];

      const result = disciplineTeacherService.sortByCategories(questions);

      expect(result).toEqual([
        { name: 'sameCategory', count: 2, questions: [{}, {}] },
        { name: 'anotherCategory', count: 1, questions: [{}] },
      ]);
    });
  });

  describe('getQuestionWithRoles', () => {
    it('should return correct mapped question with roles', () => {
      const question = {
        id: 'questionId',
        category: 'questionCategory',
        name: 'questionName',
        order: 'questionOrder',
        description: 'questionDescription',
        text: 'questionText',
        isRequired: 'questionIsRequired',
        criteria: 'questionCriteria',
        type: 'questionType',
        display: 'questionDisplay',
        questionRoles: [
          { role: 'ROLE', questionId: '', isShown: true, isRequired: true },
          { role: 'ROLE', questionId: '', isShown: false, isRequired: false },
        ],
      } as any as DbQuestionWithRoles;

      const result = mapper.map(question, DbQuestionWithRoles, QuestionWithCategoriesAndRolesResponse);

      expect(result).toEqual({
        id: 'questionId',
        category: 'questionCategory',
        name: 'questionName',
        order: 'questionOrder',
        description: 'questionDescription',
        text: 'questionText',
        isRequired: 'questionIsRequired',
        criteria: 'questionCriteria',
        type: 'questionType',
        display: 'questionDisplay',
        roles: [
          { role: 'ROLE', isShown: true, isRequired: true },
          { role: 'ROLE', isShown: false, isRequired: false },
        ],
      });
    });
  });

  describe('getComments', () => {
    it('should return mapped responses (if no answers, questions should be skipped)', () => {
      const questions = [
        {
          id: 'question1Id',
          name: 'firstQuestion',
          comments: {
            data: [
              {
                disciplineTeacherId: 'firstDisciplineTeacherId',
                userId: 'firstUserId',
                value: 'firstValue',
                disciplineTeacher: {
                  discipline: {
                    semester: 1,
                    year: 2,
                    subject: {
                      name: 'oneSubject',
                    },
                  },
                },
              }, {
                disciplineTeacherId: 'secondDisciplineTeacherId',
                userId: 'secondUserId',
                value: 'secondValue',
                disciplineTeacher: {
                  discipline: {
                    semester: 2,
                    year: 3,
                    subject: {
                      name: 'anotherSubject',
                    },
                  },
                },
              },
            ],
            pagination: {
              amount: 2,
              totalAmount: 2,
              totalPages: 1,
              pageSize: 10,
              page: 0,
              prevPageElems: 0,
              nextPageElems: 0,
            },
          },
        }, {
          id: 'question2Id',
          name: 'secondQuestion',
          comments: {
            data: [],
            pagination: {
              amount: 0,
              totalAmount: 0,
              totalPages: 0,
              pageSize: 10,
              page: 0,
              prevPageElems: 0,
              nextPageElems: 0,
            },
          },
        },
      ] as any as QuestionCommentData[];

      const result = mapper.mapArray(questions, QuestionCommentData, QuestionComment);

      expect(result).toEqual([
        {
          id: 'question1Id',
          name: 'firstQuestion',
          comments: [
            {
              disciplineTeacherId: 'firstDisciplineTeacherId',
              userId: 'firstUserId',
              discipline: 'oneSubject',
              semester: 1,
              year: 2,
              comment: 'firstValue',
            }, {
              disciplineTeacherId: 'secondDisciplineTeacherId',
              userId: 'secondUserId',
              discipline: 'anotherSubject',
              semester: 2,
              year: 3,
              comment: 'secondValue',
            },
          ],
          pagination: {
            amount: 2,
            totalAmount: 2,
            totalPages: 1,
            pageSize: 10,
            page: 0,
            prevPageElems: 0,
            nextPageElems: 0,
          },
        }, {
          id: 'question2Id',
          name: 'secondQuestion',
          comments: [],
          pagination: {
            amount: 0,
            totalAmount: 0,
            totalPages: 0,
            pageSize: 10,
            page: 0,
            prevPageElems: 0,
            nextPageElems: 0,
          },
        },
      ]);
    });
  });
});
