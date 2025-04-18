import { Test } from '@nestjs/testing';
import { Discipline, QuestionType, State } from '@prisma/client/fictadvisor';
import { CreateAnswersDTO } from '@fictadvisor/utils/requests';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { PrismaModule } from '../../../src/database/prisma.module';
import { TeacherMapperModule } from '../../../src/modules/teacher/v2/mappers/teacher-mapper.module';
import { TelegramAPI } from '../../../src/modules/telegram-api/telegram-api';
import { TelegramConfigService } from '../../../src/config/telegram-config.service';
import { DisciplineTeacherService } from '../../../src/modules/teacher/v2/discipline-teacher.service';
import { DateService } from '../../../src/modules/date/v2/date.service';
import { PollService } from '../../../src/modules/poll/v2/poll.service';
import { TeacherService } from '../../../src/modules/teacher/v2/teacher.service';
import { PrismaService } from '../../../src/database/v2/prisma.service';
import { ExcessiveAnswerException } from '../../../src/common/exceptions/excessive-answer.exception';
import { NotEnoughAnswersException } from '../../../src/common/exceptions/not-enough-answers.exception';
import { AlreadyAnsweredException } from '../../../src/common/exceptions/already-answered.exception';
import { WrongTimeException } from '../../../src/common/exceptions/wrong-time.exception';
import { NoPermissionException } from '../../../src/common/exceptions/no-permission.exception';
import { IsRemovedDisciplineTeacherException } from '../../../src/common/exceptions/is-removed-discipline-teacher.exception';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('DisciplineTeacherService', () => {
  let disciplineTeacherService: DisciplineTeacherService;
  let teacherService: TeacherService;
  let telegramApi: TelegramAPI;
  let prismaService: PrismaService;
  let nonSelective20221: Omit<Discipline, 'description' | 'createdAt' | 'updatedAt'>;
  let selective20222: Omit<Discipline, 'description' | 'createdAt' | 'updatedAt'>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DisciplineTeacherService,
        DateService,
        PollService,
        TelegramAPI,
        TeacherService,
        PrismaService,
      ],
      imports: [
        PrismaModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        TeacherMapperModule,
      ],
    }).useMocker((token) => {
      if (token === TelegramConfigService) {
        return {};
      }
    })
      .compile();

    disciplineTeacherService = moduleRef.get(DisciplineTeacherService);
    teacherService = moduleRef.get(TeacherService);
    telegramApi = moduleRef.get(TelegramAPI);
    prismaService = moduleRef.get(PrismaService);

    await prismaService.dateVar.createMany({
      data: [
        { name: 'START_POLL_2022_2', date: new Date('2023-07-03T00:00:00') },
        { name: 'END_POLL_2022_2', date: new Date('2023-07-26T00:00:00') },
      ],
    });

    await prismaService.user.createMany({
      data: [
        {
          id: 'userWithNoSelectedId1',
          email: 'govno1@gmail.com',
          state: State.APPROVED,
        },
        {
          id: 'userWithRemovedId1',
          email: 'govno5@gmail.com',
          state: State.APPROVED,
        },
        {
          id: 'notApprovedUserId',
          email: 'govno6@gmail.com',
        },
        {
          id: 'userWithSelectiveIn20221Id',
          email: 'govno7@gmail.com',
          state: State.APPROVED,
        },
        {
          id: 'userWithSelectiveIn20221and20222Id',
          email: 'govno8@gmail.com',
          state: State.APPROVED,
        },
      ],
    });

    await prismaService.group.create({
      data: {
        id: 'groupId1',
        code: 'RE-00',
      },
    });

    await prismaService.subject.create({
      data: {
        id: 'subjectId1',
        name: 'Subject - N: Some useless info',
      },
    });

    nonSelective20221 = {
      id: 'nonSelective20221Id',
      subjectId: 'subjectId1',
      groupId: 'groupId1',
      semester: 1,
      year: 2022,
      isSelective: false,
    };
    selective20222 = {
      id: 'selective20222Id',
      subjectId: 'subjectId1',
      groupId: 'groupId1',
      semester: 2,
      year: 2022,
      isSelective: true,
    };

    await prismaService.discipline.createMany({
      data: [
        nonSelective20221, {
          id: 'nonSelective20222Id',
          subjectId: 'subjectId1',
          groupId: 'groupId1',
          semester: 2,
          year: 2022,
        }, {
          id: 'selective20221Id',
          subjectId: 'subjectId1',
          groupId: 'groupId1',
          semester: 1,
          year: 2022,
          isSelective: true,
        },
        selective20222,
      ],
    });

    await prismaService.student.createMany({
      data: [
        {
          userId: 'userWithSelectiveIn20221Id',
          groupId: 'groupId1',
        }, {
          userId: 'userWithSelectiveIn20221and20222Id',
          groupId: 'groupId1',
        }, {
          userId: 'userWithNoSelectedId1',
          groupId: 'groupId1',
        }, {
          userId: 'userWithRemovedId1',
          groupId: 'groupId1',
        },
      ],
    });

    await prismaService.selectiveDiscipline.createMany({
      data: [
        {
          studentId: 'userWithSelectiveIn20221Id',
          disciplineId: 'selective20221Id',
        }, {
          studentId: 'userWithSelectiveIn20221and20222Id',
          disciplineId: 'selective20221Id',
        }, {
          studentId: 'userWithSelectiveIn20221and20222Id',
          disciplineId: 'selective20222Id',
        },
      ],
    });

    await prismaService.teacher.create({
      data: {
        id: 'teacherId1',
        firstName: 'Fname',
        lastName: 'Lnamovna',
      },
    });

    await prismaService.disciplineType.createMany({
      data: [{
        id: 'ec7866e2-a426-4e1b-b76c-1ce68fdb46a1',
        disciplineId: 'nonSelective20221Id',
        name: 'LECTURE',
      }, {
        id: 'f3717ce9-cd52-4c40-889a-094a9b6a01de',
        disciplineId: 'nonSelective20222Id',
        name: 'LECTURE',
      }],
    });

    await prismaService.disciplineTeacher.createMany({
      data: [{
        id: 'lecturerForNonSelective20221Id',
        teacherId: 'teacherId1',
        disciplineId: 'nonSelective20221Id',
      }, {
        id: 'lecturerForNonSelective20222Id',
        teacherId: 'teacherId1',
        disciplineId: 'nonSelective20222Id',
      }, {
        id: 'lecturerForSelective20221Id',
        teacherId: 'teacherId1',
        disciplineId: 'selective20221Id',
      }],
    });

    await prismaService.disciplineTeacher.create({
      data: {
        id: 'removedId1',
        teacherId: 'teacherId1',
        disciplineId: 'nonSelective20222Id',
        removedDisciplineTeachers: {
          create: {
            studentId: 'userWithRemovedId1',
          },
        },
      },
    });

    await prismaService.disciplineTeacherRole.createMany({
      data: [{
        disciplineTeacherId: 'lecturerForNonSelective20221Id',
        disciplineTypeId: 'ec7866e2-a426-4e1b-b76c-1ce68fdb46a1',
      }, {
        disciplineTeacherId: 'removedId1',
        disciplineTypeId: 'ec7866e2-a426-4e1b-b76c-1ce68fdb46a1',
      }, {
        disciplineTeacherId: 'lecturerForNonSelective20222Id',
        disciplineTypeId: 'f3717ce9-cd52-4c40-889a-094a9b6a01de',
      }],
    });

    await prismaService.question.createMany({
      data: [
        {
          id: 'lecturerQuestionId1',
          category: 'Empty',
          name: 'Empty',
          order: 0,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: true,
        },
        {
          id: 'lecturerQuestionId2',
          category: 'Empty',
          name: 'Empty',
          order: 1,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: true,
        },
        {
          id: 'practicianQuestionId',
          category: 'Empty',
          name: 'Empty',
          order: 2,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: false,
        },
        {
          id: 'lecturerQuestionId3',
          category: 'Empty',
          name: 'Empty',
          order: 3,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: false,
        },
      ],
    });

    await prismaService.questionRole.createMany({
      data: [
        {
          role: DisciplineTypeEnum.LECTURE,
          questionId: 'lecturerQuestionId1',
          isShown: true,
          isRequired: true,
        },
        {
          role: DisciplineTypeEnum.LECTURE,
          questionId: 'lecturerQuestionId2',
          isShown: true,
          isRequired: true,
        },
        {
          role: DisciplineTypeEnum.PRACTICE,
          questionId: 'practicianQuestionId',
          isShown: true,
          isRequired: false,
        },
        {
          role: DisciplineTypeEnum.LECTURE,
          questionId: 'lecturerQuestionId3',
          isShown: true,
          isRequired: false,
        },
      ],
    });
  });


  describe('sendAnswers', () => {
    beforeAll(async () => {
      jest.spyOn(telegramApi, 'verifyResponse').mockImplementation();
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-07-13T00:00:00'));
    });

    it('should throw IsRemovedDisciplineTeacherException', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'removedId1',
        answers,
        'userWithRemovedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(IsRemovedDisciplineTeacherException));
    });

    it('should return nothing', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      const result = await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      );

      expect(result).toBeUndefined();
    });

    it('should throw ExcessiveAnswerException when method gets excessive answered questions', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'practicianQuestionId', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(ExcessiveAnswerException));
    });

    it('should throw NotEnoughAnswersException when one of more required questions is missing', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(NotEnoughAnswersException));
    });

    it('should throw AlreadyAnsweredException when answered question already in database', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      );
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(AlreadyAnsweredException));
    });

    it('should throw ExcessiveAnswerException when answered question duplicated', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(ExcessiveAnswerException));
    });

    it('should throw WrongTimeException when answered question send out of poll open time', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-08-11T00:00:00'));
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'userWithNoSelectedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(WrongTimeException));

      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-07-13T00:00:00'));
    });

    it('should throw NoPermissionException when user state isn`t approved', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20221Id',
        answers,
        'notApprovedUserId',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(NoPermissionException));
    });

    it('should throw WrongTimeException when discipline not from semester before (or not from this semester)', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'lecturerQuestionId1', value: '0' },
          { questionId: 'lecturerQuestionId2', value: '0' },
          { questionId: 'lecturerQuestionId3', value: '0' },
        ],
      };

      await disciplineTeacherService.sendAnswers(
        'lecturerForNonSelective20222Id',
        answers,
        'userWithNoSelectedId1',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(WrongTimeException));
    });

    afterEach(async () => {
      await prismaService.questionAnswer.deleteMany({});
    });

    afterAll(async () => {
      jest
        .useRealTimers();
    });
  });

  describe('getUserDisciplineTeachers', () => {
    let qa;
    beforeAll(async () => {
      qa = await prismaService.questionAnswer.create({
        data: {
          disciplineTeacherId: 'lecturerForNonSelective20221Id',
          questionId: 'lecturerQuestionId1',
          userId: 'userWithNoSelectedId1',
          value: '0',
        },
      });
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-07-13T00:00:00'));
    });

    it('should return all discipline teachers with not selected any', async () => {
      const dteachers = await teacherService.getUserDisciplineTeachers(
        'teacherId1',
        'userWithNoSelectedId1',
        false,
      );
      expect(dteachers.length).toBe(4);
    });

    it('should return discipline teachers without already answered', async () => {
      const dteachers = await teacherService.getUserDisciplineTeachers(
        'teacherId1',
        'userWithNoSelectedId1',
        true,
      );
      expect(dteachers.length).toBe(3);
    });

    it('should return discipline teachers with selective', async () => {
      const dteachers = await teacherService.getUserDisciplineTeachers(
        'teacherId1',
        'userWithSelectiveIn20221Id',
        false,
      );
      expect(dteachers.length).toBe(4);
    });

    it('should return discipline teachers without removed', async () => {
      const dteachers = await teacherService.getUserDisciplineTeachers(
        'teacherId1',
        'userWithRemovedId1',
        true,
      );
      expect(dteachers.length).toBe(3);
    });

    it('should not return discipline teachers of not finished semester', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-05-13T00:00:00'));
      const dteachers = await teacherService.getUserDisciplineTeachers(
        'teacherId1',
        'userWithNoSelectedId1',
        false,
      );

      expect(dteachers.length).toBe(2);

      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-07-13T00:00:00'));
    });

    afterAll(() => {
      jest
        .useRealTimers();
    });
  });

  describe('isNotSelectedByUser', () => {
    it('should return false if student has not selected any discipline in year and semester of discipline', async () => {
      const userId = 'userWithSelectiveIn20221Id';

      const result = await disciplineTeacherService.isNotSelectedByUser(userId, selective20222 as Discipline);

      expect(result).toBeFalsy();
    });

    it('should return false if student has selected given discipline', async () => {
      const userId = 'userWithSelectiveIn20221and20222Id';

      const result = await disciplineTeacherService.isNotSelectedByUser(userId, selective20222 as Discipline);

      expect(result).toBeFalsy();
    });

    it('should return false if discipline is not selective', async () => {
      const userId = 'userWithSelectiveIn20221and20222Id';

      const result = await disciplineTeacherService.isNotSelectedByUser(userId, nonSelective20221 as Discipline);

      expect(result).toBeFalsy();
    });
  });

  afterAll(async () => {
    await prismaService.dateVar.deleteMany();
    await prismaService.user.deleteMany();
    await prismaService.group.deleteMany();
    await prismaService.subject.deleteMany();
    await prismaService.discipline.deleteMany();
    await prismaService.teacher.deleteMany();
    await prismaService.disciplineType.deleteMany();
    await prismaService.disciplineTeacher.deleteMany();
    await prismaService.disciplineTeacherRole.deleteMany();
    await prismaService.question.deleteMany();
    await prismaService.questionRole.deleteMany();
    await prismaService.questionAnswer.deleteMany();
    await prismaService.student.deleteMany();
    await prismaService.selectiveDiscipline.deleteMany();
  });
});
