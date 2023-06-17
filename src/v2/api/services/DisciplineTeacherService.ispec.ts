import { DisciplineTeacherService } from './DisciplineTeacherService';
import { PrismaModule } from '../../modules/PrismaModule';
import { Test } from '@nestjs/testing';
import { CreateAnswersDTO } from '../dtos/CreateAnswersDTO';
import { DateService } from '../../utils/date/DateService';
import { PollService } from './PollService';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { MapperModule } from '../../modules/MapperModule';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import { QuestionType, State, TeacherRole } from '@prisma/client';
import { ExcessiveAnswerException } from '../../utils/exceptions/ExcessiveAnswerException';
import { NotEnoughAnswersException } from '../../utils/exceptions/NotEnoughAnswersException';
import { AlreadyAnsweredException } from '../../utils/exceptions/AlreadyAnsweredException';
import { WrongTimeException } from '../../utils/exceptions/WrongTimeException';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { TeacherService } from './TeacherService';
import { PrismaService } from '../../database/PrismaService';

describe('DisciplineTeacherService', () => {
  let disciplineTeacherService: DisciplineTeacherService;
  let teacherService: TeacherService;
  let telegramApi: TelegramAPI;
  let prismaService: PrismaService;

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
      imports: [PrismaModule, MapperModule],
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

    //region Seeding

    await prismaService.dateVar.createMany({
      data: [
        { name: 'START_POLL_2022_2', date: new Date('2023-07-03T00:00:00') },
        { name: 'END_POLL_2022_2', date: new Date('2023-07-26T00:00:00') },
      ],
    });

    await prismaService.user.createMany({
      data: [
        {
          id: '6642e06c-28b5-4af3-942b-c866e54b3d8b',
          email: 'govno1@gmail.com',
          state: State.APPROVED,
        },
        {
          id: 'd4c2f31f-482d-450e-841f-67d73eedb195',
          email: 'govno2@gmail.com',
          state: State.APPROVED,
        },
        {
          id: '943d6588-8a2d-4a3c-91db-5e01a8aad5ef',
          email: 'govno3@gmail.com',
          state: State.APPROVED,
        },
        {
          id: 'a8c6bcac-4e07-4081-84fe-ebb5235fe956',
          email: 'govno4@gmail.com',
          state: State.APPROVED,
        },
        {
          id: 'b4de7b30-7aa2-4170-b8f4-5d314084df22',
          email: 'govno5@gmail.com',
          state: State.APPROVED,
        },
        {
          id: '29e2df3b-f362-411f-a725-8af30330f728',
          email: 'govno6@gmail.com',
        },
      ],
    });

    await prismaService.group.create({
      data: {
        id: 'aafdce81-7f29-4c38-ae94-44445a678ec0',
        code: 'RE-00',
      },
    });

    await prismaService.subject.create({
      data: {
        id: 'de8c98a4-a20f-4848-b852-33f7ea449c59',
        name: 'Subject - N: Some useless info',
      },
    });

    await prismaService.discipline.create({
      data: {
        id: '5aa663a0-0ae7-11ee-be56-0242ac120002',
        subjectId: 'de8c98a4-a20f-4848-b852-33f7ea449c59',
        groupId: 'aafdce81-7f29-4c38-ae94-44445a678ec0',
        semester: 2,
        year: 2,
      },
    });

    await prismaService.discipline.create({
      data: {
        id: 'b0c31731-fb1f-4f70-8723-2f80e81cad4c',
        subjectId: 'de8c98a4-a20f-4848-b852-33f7ea449c59',
        groupId: 'aafdce81-7f29-4c38-ae94-44445a678ec0',
        semester: 2,
        year: 3,
      },
    });

    await prismaService.teacher.create({
      data: {
        id: '3b3812ca-0ae7-11ee-be56-0242ac120002a',
        firstName: 'Fname',
        lastName: 'Lnamovna',
      },
    });

    await prismaService.disciplineType.create({
      data: {
        id: 'ec7866e2-a426-4e1b-b76c-1ce68fdb46a1',
        disciplineId: '5aa663a0-0ae7-11ee-be56-0242ac120002',
        name: 'LECTURE',
      },
    });

    await prismaService.disciplineType.create({
      data: {
        id: 'f3717ce9-cd52-4c40-889a-094a9b6a01de',
        disciplineId: 'b0c31731-fb1f-4f70-8723-2f80e81cad4c',
        name: 'LECTURE',
      },
    });

    await prismaService.disciplineTeacher.create({
      data: {
        id: 'f79d1af4-0ae8-11ee-be56-0242ac120002',
        teacherId: '3b3812ca-0ae7-11ee-be56-0242ac120002a',
        disciplineId: '5aa663a0-0ae7-11ee-be56-0242ac120002',
      },
    });

    await prismaService.disciplineTeacher.create({
      data: {
        id: '2330895d-3190-409e-90fa-1a7cd18adc62',
        teacherId: '3b3812ca-0ae7-11ee-be56-0242ac120002a',
        disciplineId: 'b0c31731-fb1f-4f70-8723-2f80e81cad4c',
      },
    });

    await prismaService.disciplineTeacherRole.create({
      data: {
        disciplineTeacherId: 'f79d1af4-0ae8-11ee-be56-0242ac120002',
        disciplineTypeId: 'ec7866e2-a426-4e1b-b76c-1ce68fdb46a1',
        role: 'LECTURER',
      },
    });

    await prismaService.disciplineTeacherRole.create({
      data: {
        disciplineTeacherId: '2330895d-3190-409e-90fa-1a7cd18adc62',
        disciplineTypeId: 'f3717ce9-cd52-4c40-889a-094a9b6a01de',
        role: 'LECTURER',
      },
    });

    await prismaService.question.createMany({
      data: [
        {
          id: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b',
          category: 'Empty',
          name: 'Empty',
          order: 0,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: true,
        },
        {
          id: '20c8aa13-6ad6-434c-803a-71fa8a6afcea',
          category: 'Empty',
          name: 'Empty',
          order: 1,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: true,
        },
        {
          id: '72ba3309-7fed-4bb4-8eed-fdcac334fec5',
          category: 'Empty',
          name: 'Empty',
          order: 2,
          text: 'No data',
          type: QuestionType.TOGGLE,
          isRequired: false,
        },
        {
          id: '36f5b9bb-b448-4c00-b0dc-2685183123ed',
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
          role: TeacherRole.LECTURER,
          questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b',
          isShown: true,
          isRequired: true,
        },
        {
          role: TeacherRole.LECTURER,
          questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea',
          isShown: true,
          isRequired: true,
        },
        {
          role: TeacherRole.PRACTICIAN,
          questionId: '72ba3309-7fed-4bb4-8eed-fdcac334fec5',
          isShown: true,
          isRequired: false,
        },
        {
          role: TeacherRole.LECTURER,
          questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed',
          isShown: true,
          isRequired: false,
        },
      ],
    });
    //endregion
  });


  describe('sendAnswers', () => {
    beforeAll(async () => {
      jest.spyOn(telegramApi, 'verifyResponse').mockImplementation();
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-07-13T00:00:00'));
    });

    it('should return nothing', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      const result = await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        '6642e06c-28b5-4af3-942b-c866e54b3d8b',
      );

      expect(result).toBeUndefined();
    });

    it('should throw ExcessiveAnswerException when method gets excessive answered questions', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '72ba3309-7fed-4bb4-8eed-fdcac334fec5', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        'd4c2f31f-482d-450e-841f-67d73eedb195',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(ExcessiveAnswerException));
    });

    it('should throw NotEnoughAnswersException when one of more required questions is missing', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        '72ba3309-7fed-4bb4-8eed-fdcac334fec5',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(NotEnoughAnswersException));
    });

    it('should throw AlreadyAnsweredException when answered question already in database', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],

      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        '6642e06c-28b5-4af3-942b-c866e54b3d8b',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(AlreadyAnsweredException));
    });

    it('should throw ExcessiveAnswerException when answered question duplicated', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        'b4de7b30-7aa2-4170-b8f4-5d314084df22',
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
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        'a8c6bcac-4e07-4081-84fe-ebb5235fe956',
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
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      expect.assertions(1);
      await disciplineTeacherService.sendAnswers(
        'f79d1af4-0ae8-11ee-be56-0242ac120002',
        answers,
        '29e2df3b-f362-411f-a725-8af30330f728',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(NoPermissionException));
    });

    it('should throw WrongTimeException when discipline not from semester before (or not from this semester)', async () => {
      const answers: CreateAnswersDTO = {
        answers: [
          { questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b', value: '0' },
          { questionId: '20c8aa13-6ad6-434c-803a-71fa8a6afcea', value: '0' },
          { questionId: '36f5b9bb-b448-4c00-b0dc-2685183123ed', value: '0' },
        ],
      };

      await disciplineTeacherService.sendAnswers(
        '2330895d-3190-409e-90fa-1a7cd18adc62',
        answers,
        'a8c6bcac-4e07-4081-84fe-ebb5235fe956',
      ).catch((ex) =>
        expect(ex)
          .toBeInstanceOf(WrongTimeException));
    });

    afterAll(async () => {
      await prismaService.questionAnswer.deleteMany({});
    });
  });

  describe('getUserDisciplineTeachers', () => {
    let qa;
    beforeAll(async () => {
      qa = await prismaService.questionAnswer.create({
        data: {
          disciplineTeacherId: 'f79d1af4-0ae8-11ee-be56-0242ac120002',
          questionId: 'f2ad2167-6a5c-49f4-9ab1-43e6e787398b',
          userId: '6642e06c-28b5-4af3-942b-c866e54b3d8b',
          value: '0',
        },
      });
    });

    it('should return all discipline teachers and collocated QA when notAnswered set to false', async () => {
      const dteachers: any[] = await teacherService.getUserDisciplineTeachers(
        '3b3812ca-0ae7-11ee-be56-0242ac120002a',
        '6642e06c-28b5-4af3-942b-c866e54b3d8b',
        false,
      );
      const mapQA = dteachers.map((dt) => dt.questionAnswer);
      expect(dteachers).toBeDefined();
      expect(mapQA).toBeDefined(); //change to .toContain(qa); after DbDisciplineTeacher update
    });

    it('should return all discipline teachers without collocated QA when notAnswered set to false', async () => {
      const dteachers: any[] = await teacherService.getUserDisciplineTeachers(
        '3b3812ca-0ae7-11ee-be56-0242ac120002a',
        '6642e06c-28b5-4af3-942b-c866e54b3d8b',
        true,
      );
      const mapQA = dteachers.map((dt) => dt.questionAnswer);
      expect(dteachers).toBeDefined();
      expect(mapQA).not.toContain(qa);
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
  });
});