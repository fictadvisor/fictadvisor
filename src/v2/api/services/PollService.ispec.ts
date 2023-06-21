import { Test } from '@nestjs/testing';
import { Group, PrismaClient, QuestionDisplay, QuestionType, State, Subject, Teacher, TeacherRole, User } from '@prisma/client';
import { DateModule } from '../../utils/date/DateModule';
import { MapperModule } from '../../modules/MapperModule';
import { PrismaModule } from '../../modules/PrismaModule';
import { PollService } from './PollService';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { DbDiscipline } from 'src/v2/database/entities/DbDiscipline';
import { DbQuestionWithRoles } from 'src/v2/database/entities/DbQuestionWithRoles';
import { DbQuestionWithAnswers } from 'src/v2/database/entities/DbQuestionWithAnswers';
import { CommentsSort } from '../dtos/CommentsQueryDTO';


describe('PollService', () => {
  let pollService: PollService;
  let prisma: PrismaClient;
  let group: Group;
  let user: User;
  let userPending: User;
  let teacherLecturer: Teacher;
  let teacherPractitian: Teacher;
  let teacherLaborant: Teacher;
  let subject: Subject;
  let discipline1: DbDiscipline;
  let discipline2: DbDiscipline;
  let discipline3: DbDiscipline;
  let questionMark1: DbQuestionWithRoles & DbQuestionWithAnswers;
  let questionMark2: DbQuestionWithRoles & DbQuestionWithAnswers;
  let questionText: DbQuestionWithRoles & DbQuestionWithAnswers;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [PollService],
      imports: [
        PrismaModule,
        DateModule, 
        MapperModule,
      ],
    }).compile();

    pollService = testingModule.get(PollService);
    prisma = new PrismaClient();

    group = await prisma.group.create({
      data: {
        id: '46d35427-1e0c-44b0-b586-be81b4a60af9',
        code: 'IC-21',
      },
    });

    user = await prisma.user.create({
      data: {
        id: '874b84c5-f675-4673-9c4c-3619fd7f9636',
        email: 'example1@gmail.com',
        state: State.APPROVED,
        student: {
          create: {
            firstName: 'studentFirstName1',
            middleName: 'studentMiddleName1',
            lastName: 'studentLastName1',
            groupId: group.id,
            state: State.APPROVED,
          },
        },
      },
    });
    
    userPending = await prisma.user.create({
      data: {
        id: '32c06837-38ff-4e6f-a7f0-b5b38a9f4d7a',
        email: 'example2@gmail.com',
        state: State.PENDING,
      },
    });

    teacherLecturer = await prisma.teacher.create({
      data: {
        id: '6bfc29fa-8560-43a4-9bc5-a538b397e181',
        firstName: 'teacherLecturerFirstName',
        lastName: 'teacherLecturerLastName',
      },
    });
  
    teacherPractitian = await prisma.teacher.create({
      data: {
        id: 'aae47f01-975b-4c95-8719-cacf46795b22',
        firstName: 'teacherPractitianFirstName',
        lastName: 'teacherPractitianLastName',
      },
    });
  
    teacherLaborant = await prisma.teacher.create({
      data: {
        id: 'c2ff029f-3ae9-4cf8-a2d6-aa7a7eeac185',
        firstName: 'teacherLaborantFirstName',
        lastName: 'teacherLaborantLastName',
      },
    });
  
    subject = await prisma.subject.create({
      data: {
        id: '87e204ea-4243-4633-b69d-014613bac59e',
        name: 'subject1',
      },
    });
  
    discipline1 = await prisma.discipline.create({
      data: {
        id: '7974396c-5d98-4cc2-8dca-c14f32e4e7de',
        disciplineTeachers: {
          createMany: { 
            data: [
              { id: 'd97af0f2-af7e-4eee-9d2d-952510ac2d14', teacherId: teacherLecturer.id },
              { id: '6653877a-f8c9-40a0-9acb-ef5139e863c3', teacherId: teacherPractitian.id },
              { id: '286c6dca-ca79-4468-96c3-380442fc4b72', teacherId: teacherLaborant.id },
            ],
          },
        },
        semester: 2,
        year: 2022,
        groupId: group.id,
        subjectId: subject.id,
      },
      include: {
        disciplineTeachers: {
          include: {
            teacher: true,
          },
        },
      },
    }) as any as DbDiscipline;
  
    discipline2 = await prisma.discipline.create({
      data: {
        id: '32030fb6-d882-4762-a4cd-184ec0e291bf',
        disciplineTeachers: {
          createMany: { 
            data: [
              { id: 'e045b960-1af7-4202-828d-ed3c276a9790', teacherId: teacherLecturer.id },
              { id: 'bdeb5c18-68f9-4261-b38c-91f683569994', teacherId: teacherPractitian.id },
            ],
          },
        },
        semester: 1,
        year: 2022,
        groupId: group.id,
        subjectId: subject.id,
      },
      include: {
        disciplineTeachers: {
          include: {
            teacher: true,
          },
        },
      },
    }) as any as DbDiscipline;
  
    discipline3 = await prisma.discipline.create({
      data: {
        id: 'e011b152-3c7d-4121-90c3-506c9fe3ae67',
        disciplineTeachers: {
          createMany: { 
            data: [
              { id: '821fafbf-67d2-495a-acd3-d1c1338e3619', teacherId: teacherPractitian.id },
            ],
          },
        },
        semester: 1,
        year: 2022,
        groupId: group.id,
        subjectId: subject.id,
      },
      include: {
        disciplineTeachers: {
          include: {
            teacher: true,
          },
        },
      },
    }) as any as DbDiscipline;
  
    questionMark1 = await prisma.question.create({
      data: {
        id: 'f0141b13-73a6-4d4a-a321-d92d75c4e223',
        name: 'questionName1',
        category: 'questionCategory1',
        text: 'questionMark1',
        type: QuestionType.SCALE,
        display: QuestionDisplay.RADAR,
        order: 1,
        questionRoles: { 
          createMany: { data: [
            { role: TeacherRole.LABORANT, isRequired: false, isShown: false },
            { role: TeacherRole.LECTURER, isRequired: true, isShown: false },
            { role: TeacherRole.PRACTICIAN, isRequired: true, isShown: true },
          ] }, 
        },
        questionAnswers: {
          createMany: { data: [
            {
              disciplineTeacherId: discipline2.disciplineTeachers[0].id, 
              userId: user.id, 
              value: '5',
            },
            {
              disciplineTeacherId: discipline2.disciplineTeachers[1].id, 
              userId: user.id, 
              value: '5',
            },
          ] },
        },
      },
      include: {
        questionAnswers: true,
        questionRoles: true,
      },
    });
  
    questionMark2 = await prisma.question.create({
      data: {
        id: 'b92d77d8-3cf9-44d8-b041-061273c7c6b6',
        name: 'questionName2',
        category: 'questionCategory2',
        text: 'questionText2',
        type: QuestionType.TOGGLE,
        display: QuestionDisplay.CIRCLE,
        order: 2,
        questionRoles: { 
          createMany: { data: [
            { role: TeacherRole.LABORANT, isRequired: true, isShown: true },
            { role: TeacherRole.LECTURER, isRequired: true, isShown: true },
            { role: TeacherRole.PRACTICIAN, isRequired: true, isShown: true },
          ] }, 
        },
        questionAnswers: {
          createMany: { data: [
            {
              disciplineTeacherId: discipline1.disciplineTeachers[0].id, 
              userId: user.id, 
              value: 'text',
            },
            {
              disciplineTeacherId: discipline1.disciplineTeachers[1].id, 
              userId: user.id, 
              value: 'text',
            },
          ] },
        },
      },
      include: {
        questionAnswers: true,
        questionRoles: true,
      },
    });
  
    questionText = await prisma.question.create({
      data: {
        id: 'd13e053e-2a08-486f-b4f8-34b8dab3da17',
        name: 'questionName3',
        category: 'questionCategory3',
        text: 'questionText3',
        type: QuestionType.TEXT,
        display: QuestionDisplay.TEXT,
        isRequired: false,
        order: 4,
        questionRoles: { createMany: {
          data: [
            { role: TeacherRole.LABORANT, isRequired: false, isShown: true },
            { role: TeacherRole.LECTURER, isRequired: false, isShown: true },
            { role: TeacherRole.PRACTICIAN, isRequired: false, isShown: true },
          ],
        } },
        questionAnswers: { createMany: {
          data: [
            {
              disciplineTeacherId: discipline1.disciplineTeachers[0].id,
              userId: user.id, 
              value: 'text',
            },
            {
              disciplineTeacherId: discipline2.disciplineTeachers[0].id,
              userId: user.id, 
              value: 'text',
            },
            {
              disciplineTeacherId: discipline1.disciplineTeachers[2].id,
              userId: user.id, 
              value: 'text',
            },
          ],
        } },
      },
      include: {
        questionAnswers: true,
        questionRoles: true,
      },
    });
  });

 

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        id: {
          in: [user.id, userPending.id],
        },
      },
    });

    await prisma.group.delete({
      where: {
        id: group.id,
      },
    });

    await prisma.subject.delete({
      where: {
        id: subject.id,
      },
    });

    await prisma.discipline.deleteMany({
      where: {
        id: {
          in: [discipline1.id, discipline2.id, discipline3.id],
        },
      },
    });

    await prisma.teacher.deleteMany({
      where: {
        id: {
          in: [teacherLecturer.id, teacherPractitian.id, teacherLaborant.id],
        },
      },
    });

    await prisma.question.deleteMany({
      where: {
        id: {
          in: [questionMark1.id, questionMark2.id, questionText.id],
        },
      },
    });
  });

  describe('getQuestions', () => {
    it('should return all questions because it requires any teacher role and each discipline role', async () => {
      const questions = await pollService.getQuestions([
        TeacherRole.LECTURER,
        TeacherRole.LABORANT,
        TeacherRole.PRACTICIAN,
      ], [
        TeacherRole.LECTURER,
        TeacherRole.LABORANT,
        TeacherRole.PRACTICIAN,
      ]);
      expect(questions.length).toBe(3);
      expect(questions[0].questionRoles).toStrictEqual(questionMark1.questionRoles);
      expect(questions[1].questionRoles).toStrictEqual(questionMark2.questionRoles);
      expect(questions[2].questionRoles).toStrictEqual(questionText.questionRoles);
    });

    it('should return no questions because no roles are required', async () => {
      const questions = await pollService.getQuestions([], []);
      expect(questions.length).toBe(0);
    });

    it('should return 2 questions: first one requires PRACTICIAN and LECTURER and show PRACTICIAN and the second one shows every role', 
      async () => {
        const questions = await pollService.getQuestions([
          TeacherRole.PRACTICIAN,
        ], [
          TeacherRole.LECTURER,
          TeacherRole.PRACTICIAN,
        ]);
        expect(questions.length).toBe(2);
        expect(questions[0].questionRoles).toStrictEqual(questionMark1.questionRoles);
        expect(questions[1].questionRoles).toStrictEqual(questionText.questionRoles);
      }
    );

    it('should return only one question because the second one doesn\'t show LECTURER question but only PRACTICIAN', 
      async () => {
        const questions = await pollService.getQuestions([
          TeacherRole.LECTURER,
        ], [
          TeacherRole.LECTURER,
          TeacherRole.PRACTICIAN,
        ]);
        expect(questions.length).toBe(1);
        expect(questions[0].questionRoles).toStrictEqual(questionText.questionRoles);
      }
    );
  });

  describe('getQuestionsWithMarks', () => {
    it('should return all marks about teacher', async () => {
      const questions = await pollService.getQuestionWithMarks(teacherLecturer.id);
      expect(questions.length).toBe(2);
      expect(
        questions.every((question) => 
          question.type === QuestionType.SCALE || question.type === QuestionType.TOGGLE
        )
      ).toBe(true);
    });

    it('should return specified marks with year, semester and subjectId', async () => {
      const questions1 = await pollService.getQuestionWithMarks(
        teacherPractitian.id,
        {
          year: 2022,
          semester: 1,
          subjectId: subject.id,
        }
      );
      const questionAnswers1 = questions1.filter(
        (value) => value.questionAnswers.length > 0
      )[0].questionAnswers;

      expect(questions1.length).toBe(2);
      expect(
        questions1.every((question) => 
          question.type === QuestionType.SCALE || question.type === QuestionType.TOGGLE
        )
      ).toBe(true);
      expect(questionAnswers1[0].disciplineTeacherId).toBe(discipline2.disciplineTeachers[1].id);

      const questions2 = await pollService.getQuestionWithMarks(
        teacherLecturer.id,
        {
          year: 2022,
          semester: 2,
        }
      );
      const questionAnswers2 = questions2.filter(
        (value) => value.questionAnswers.length > 0
      )[0].questionAnswers;

      expect(questions2.length).toBe(2);
      expect(
        questions2.every((question) => 
          question.type === QuestionType.SCALE || question.type === QuestionType.TOGGLE
        )
      ).toBe(true);
      expect(questionAnswers2[0].disciplineTeacherId).toBe(discipline1.disciplineTeachers[0].id);
    });

    it('should return empty array of answers because teacher id is not found', async () => {
      const questions = await pollService.getQuestionWithMarks('74d61334-8de1-40f0-af6e-5103423e8557');
      const questionAnswers = questions.filter((value) => value.questionAnswers.length > 0);
      expect(questionAnswers.length).toBe(0);
    });

    it('should return empty array of answers because data is wrong', async () => {
      const questions = await pollService.getQuestionWithMarks(
        teacherLaborant.id,
        {
          subjectId: '87e204ea-4243-4633-b69d-014613bac59e',
          semester: 1,
        }
      );
      const questionAnswers = questions.filter((value) => value.questionAnswers.length > 0);
      expect(questionAnswers.length).toBe(0);
    });
  });

  describe('getQuestionsWithText', () => {
    it('should return all comments about teacher', async () => {
      const questions = await pollService.getQuestionWithText(teacherLaborant.id);
      expect(questions.length).not.toBe(0);
      expect(questions.every((question) => question.type === QuestionType.TEXT)).toBe(true);
    });

    it('should return specified comments with year, semester and subjectId', async () => {
      const questions = await pollService.getQuestionWithText(
        teacherLaborant.id,
        {
          subjectId: subject.id,
          year: 2022,
          semester: 2,
        }
      );
      expect(questions.length).toBe(1);
      expect(questions.every((question) => question.type === QuestionType.TEXT)).toBe(true);
      expect(questions[0].questionAnswers.length).toBe(1);
      expect(questions[0].questionAnswers[0].disciplineTeacher.discipline.id === discipline1.id);
    });

    it('should return the newest and oldest comments', async () => {
      const questionsOldest = await pollService.getQuestionWithText(
        teacherLecturer.id,
        {
          sortBy: CommentsSort.OLDEST,
        }
      );
      const questionsNewest = await pollService.getQuestionWithText(
        teacherLecturer.id,
        {
          sortBy: CommentsSort.NEWEST,
        }
      );
      expect(questionsOldest.length).toBe(1);
      expect(questionsNewest.length).toBe(1);
      expect(questionsOldest[0].type).toBe(QuestionType.TEXT);
      expect(questionsNewest[0].type).toBe(QuestionType.TEXT);
      expect(questionsOldest[0].questionAnswers).toStrictEqual(questionsNewest[0].questionAnswers.reverse());
    });

    it('should return empty array of answers because teacher with the id not found', async () => {
      const questions = await pollService.getQuestionWithText('e94f17b2-e6d9-4b10-bc38-a76d98061192');
      expect(questions[0].questionAnswers.length).toBe(0);
    });
    
    it('should return empty array of answers because data is wrong', async () => {
      const questions = await pollService.getQuestionWithMarks(
        teacherLecturer.id,
        {
          subjectId: subject.id,
          semester: 1,
          year: 2021,
        }
      );
      expect(questions[0].questionAnswers.length).toBe(0);
    });
  });

  describe('getDisciplineTeachers', () => {
    it('should return disciplines of questions for which user haven\'t answered yet', async () => {
      const { hasSelectedInLastSemester, teachers } = await pollService.getDisciplineTeachers(user.id);
      expect(teachers.length).toBe(1);
      expect(teachers[0].disciplineTeacherId === discipline3.disciplineTeachers[0].id);
    }); 

    it('should return an error because user doesn\'t have permissions', async () => {
      await expect(
        pollService.getDisciplineTeachers(userPending.id)
      ).rejects.toThrow(NoPermissionException);
    }); 
  });
});