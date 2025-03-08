import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ComplaintDTO, QueryAllTeachersDTO, QueryMarksDTO } from '@fictadvisor/utils/requests';
import { AcademicStatus, DisciplineTypeEnum, Position, ScientificDegree } from '@fictadvisor/utils/enums';
import { TelegramAPI } from '../../../src/modules/telegram-api/telegram-api';
import { ConfigurationModule } from '../../../src/config/config.module';
import Configuration from '../../../src/config/configuration.constant';
import { TeacherModule } from '../../../src/modules/teacher/teacher.module';
import { PollModule } from '../../../src/modules/poll/poll.module';
import { PrismaModule } from '../../../src/database/prisma.module';
import { MapperModule } from '../../../src/common/mappers/mapper.module';
import { DateModule } from '../../../src/modules/date/date.module';
import { TelegramConfigService } from '../../../src/config/telegram-config.service';
import { TeacherService } from '../../../src/modules/teacher/v2/teacher.service';
import { PollService } from '../../../src/modules/poll/v2/poll.service';
import { DbQuestion } from '../../../src/database/v2/entities/question.entity';
import { Cathedra, EntityType, Prisma, QuestionDisplay } from '@prisma/client/fictadvisor';
import { TeacherRepository } from '../../../src/database/v2/repositories/teacher.repository';
import { DbTeacher } from '../../../src/database/v2/entities/teacher.entity';
import { ContactRepository } from '../../../src/database/v2/repositories/contact.repository';
import { CreateContactData } from './datas/create-contact.data';
import { GroupRepository } from '../../../src/database/v2/repositories/group.repository';
import { InvalidEntityIdException } from '../../../src/common/exceptions/invalid-entity-id.exception';
import { SubjectRepository } from '../../../src/database/v2/repositories/subject.repository';
import { Decimal } from '@prisma/client/runtime/library';
import { DbDisciplineTeacher } from '../../../src/database/v2/entities/discipline-teacher.entity';
import { DisciplineTeacherRepository } from '../../../src/database/v2/repositories/discipline-teacher.repository';
import { DisciplineTeacherService } from '../../../src/modules/teacher/v2/discipline-teacher.service';
import { DateService } from '../../../src/modules/date/v2/date.service';
import { AccessModule } from '../../../src/modules/access/access.module';
import { DbTeachersOnCathedras } from '../../../src/database/v2/entities/teachers-on-cathedras.entity';
import { DbCathedra } from '../../../src/database/v2/entities/cathedra.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  let pollService: PollService;
  let teacherRepository: TeacherRepository;
  let contactRepository: ContactRepository;
  let groupRepository: GroupRepository;
  let telegramAPI: TelegramAPI;
  let subjectRepository: SubjectRepository;
  let disciplineTeacherRepository: DisciplineTeacherRepository;
  let disciplineTeacherService: DisciplineTeacherService;
  let dateService: DateService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TeacherService, TelegramAPI, TelegramConfigService, ConfigService],
      imports: [
        TeacherModule,
        PollModule,
        MapperModule,
        PrismaModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ConfigurationModule.forRoot({
          isGlobal: true,
          load: [Configuration],
        }),
        AccessModule,
        DateModule,
      ],
    }).compile();

    teacherService = moduleRef.get(TeacherService);
    pollService = moduleRef.get(PollService);
    teacherRepository = moduleRef.get(TeacherRepository);
    contactRepository = moduleRef.get(ContactRepository);
    groupRepository = moduleRef.get(GroupRepository);
    telegramAPI = moduleRef.get(TelegramAPI);
    subjectRepository = moduleRef.get(SubjectRepository);
    disciplineTeacherRepository = moduleRef.get(DisciplineTeacherRepository);
    disciplineTeacherService = moduleRef.get(DisciplineTeacherService);
    dateService = moduleRef.get(DateService);
  });

  describe('getAll', () => {

    it('should return all teachers', async () => {
      jest.spyOn(teacherRepository, 'findMany').mockImplementation(async () => ([
        teacher1, teacher2,
      ] as any as Promise<DbTeacher[]>));
      jest.spyOn(teacherRepository, 'count').mockImplementation(async () => 2);
      const searchParam: QueryAllTeachersDTO =
        { cathedrasId: [teacher1.cathedras[0].cathedraId, teacher2.cathedras[0].cathedraId] };

      const result = await teacherService.getAll(searchParam);

      expect(result.data.length).toEqual(2);
    });

    it('should return specified teacher by cathedra', async () => {
      jest.spyOn(teacherRepository, 'findMany').mockImplementation(async () => ([
        teacher2] as any as Promise<DbTeacher[]>));
      jest.spyOn(teacherRepository, 'count').mockImplementation(async () => 1);

      const searchParam: QueryAllTeachersDTO = { cathedrasId: [teacher2.cathedras[0].cathedraId] };

      const result = await teacherService.getAll(searchParam);

      expect(result.data.length).toEqual(1);
      expect(result.data[0].id).toEqual(teacher2.id);
    });

    it('should return specified teacher by name', async () => {
      jest.spyOn(teacherRepository, 'findMany').mockImplementation(async () => ([
        teacher1] as any as Promise<DbTeacher[]>));
      jest.spyOn(teacherRepository, 'count').mockImplementation(async () => 1);

      const teacherFullName = `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`;

      const searchParam: QueryAllTeachersDTO = { search: teacherFullName };

      const result = await teacherService.getAll(searchParam);

      expect(result.data.length).toEqual(1);
      const fullNameFromResult = `${result.data[0].lastName} ${result.data[0].firstName} ${result.data[0].middleName}`;
      expect(fullNameFromResult).toEqual(teacherFullName);
    });
  });

  describe('getTeacher', () => {
    it('should return teacher by id', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => teacher1);
      jest.spyOn(contactRepository, 'findMany').mockImplementation(async () => [teacher1Contact]);

      const result = await teacherService.getTeacher(teacher1.id);

      expect(result.dbTeacher).toEqual(teacher1);
      expect(result.contacts).toEqual([teacher1Contact]);
    });

    it('should return teacher without contacts if there are no contacts', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => teacher2);
      jest.spyOn(contactRepository, 'findMany').mockImplementation(async () => []);

      const result = await teacherService.getTeacher(teacher2.id);

      expect(result.dbTeacher).toEqual(teacher2);
      expect(result.contacts).toEqual([]);
    });
  });

  describe('getMarks', () => {
    it('should return an array of matching objects (mark must be an integer) if RADAR display and SCALE type', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          name: 'questionName',
          type: 'SCALE',
          display: 'RADAR',
          questionAnswers: [
            { value: 9 },
            { value: 10 },
          ],
        }] as any as Promise<DbQuestion[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as QueryMarksDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([
        {
          name: 'questionName',
          amount: 2,
          type: 'RADAR',
          mark: 95,
        },
      ]);
    });

    it('should return an array of matching objects if AMOUNT display and SCALE type', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          name: 'questionName',
          type: 'SCALE',
          display: 'AMOUNT',
          questionAnswers: [
            { value: 2 },
            { value: 6 },
            { value: 6 },
          ],
        }] as any as Promise<DbQuestion[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as QueryMarksDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([
        {
          name: 'questionName',
          amount: 3,
          type: 'AMOUNT',
          mark: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 0, 6: 2, 7: 0, 8: 0, 9: 0, 10: 0 },
        },
      ]);
    });

    it('should return an array of matching objects (mark must be rounded to the hundredth) if CIRCLE display and TOGGLE type', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          name: 'questionName',
          type: 'TOGGLE',
          display: 'CIRCLE',
          questionAnswers: [
            { value: 1 },
            { value: 0 },
            { value: 1 },
          ],
        }] as any as Promise<DbQuestion[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as QueryMarksDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([
        {
          name: 'questionName',
          amount: 3,
          type: 'CIRCLE',
          mark: 66.67,
        },
      ]);
    });

    it('should return an empty array if question answers is empty', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          questionAnswers: [],
        }] as any as Promise<DbQuestion[]>
      ));

      const teacherId = '.entity';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as QueryMarksDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([]);
    });
  });

  describe('checkQueryDate', () => {
    it('should return undefined if there is year and semester', () => {
      const data = {
        year: 2023,
        semester: 2,
      };

      expect(() => teacherService.checkQueryDate(data)).not.toThrow();
    });

    it('should not throw an error if there is not year and semester', () => {
      const data = {} as QueryMarksDTO;

      expect(() => teacherService.checkQueryDate(data)).not.toThrow();
    });

    it('should throw an exception if there is not year', () => {
      const data = {
        semester: 3,
      } as QueryMarksDTO;

      const result = () => teacherService.checkQueryDate(data);

      expect(result).toThrow();
    });

    it('should throw an exception if there is not semester', () => {
      const data = {
        year: 2022,
      } as QueryMarksDTO;

      const result = () => teacherService.checkQueryDate(data);

      expect(result).toThrow();
    });
  });

  describe('getRating', () => {
    it('should calculate teacher rating', () => {
      const result = teacherService.getRating(teacherMarks);
      expect(result).toBe(96.92);
    });

    it('should return 0 if there are no marks', () => {
      const marks = [];

      const result = teacherService.getRating(marks);
      expect(result).toBe(0);
    });

    it('should return 0 if amount of votes less then 8', () => {
      const marks = [
        {
          name: 'Radar1',
          amount: 7,
          type: QuestionDisplay.RADAR,
          mark: 60,
        },
        {
          name: 'Circle1',
          amount: 7,
          type: QuestionDisplay.CIRCLE,
          mark: 70,
        },
      ];

      const result = teacherService.getRating(marks);
      expect(result).toBe(0);
    });
  });

  describe('connectTeacherWithCathedra', () => {
    let teacherCopy: DbTeacher;
    beforeEach(() => {
      teacherCopy = JSON.parse(JSON.stringify(teacher1));
    });

    it('should connect teacher with cathedra', async () => {
      jest.spyOn(teacherRepository, 'updateById').mockImplementation(async () => {
        teacherCopy.cathedras.push(teacherOnCathedra1);
        return teacherCopy;
      });
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => teacherCopy);

      const result = await teacherService.connectTeacherWithCathedra(teacher1.id, cathedra3.id);

      expect(result.dbTeacher.cathedras.map((c) => c.cathedraId)).toEqual([cathedra1.id, cathedra3.id]);
    });
  });

  describe('disconnectTeacherWithCathedra', () => {
    let teacherCopy: DbTeacher;
    beforeEach(() => {
      teacherCopy = JSON.parse(JSON.stringify(teacher1));
    });

    it('should disconnect teacher with cathedra', async () => {
      jest.spyOn(teacherRepository, 'updateById').mockImplementation(async () => {
        teacherCopy.cathedras = teacherCopy.cathedras.filter((c) => c.cathedraId !== cathedra1.id);
        return teacherCopy;
      });
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => teacherCopy);

      const result = await teacherService.disconnectTeacherFromCathedra(teacher1.id, cathedra1.id);

      expect(result.dbTeacher.cathedras.length).toEqual(0);
    });
  });

  describe('getUserDisciplineTeachers', () => {
    it('should return discipline teachers for a given teacher and user', async () => {
      const disciplineTeachers = [
        { id: '1', discipline: { semester: 1, year: 2022 } },
        { id: '2', discipline: { semester: 2, year: 2022 } },
      ] as DbDisciplineTeacher[];

      jest.spyOn(disciplineTeacherRepository, 'findMany').mockImplementation(async () => disciplineTeachers);
      jest.spyOn(disciplineTeacherRepository, 'findOne').mockImplementation(async (query) => {
        if (query.id === '1') return null;
        return disciplineTeachers[1] as any as Promise<any>;
      });
      jest.spyOn(dateService, 'isPreviousSemesterToCurrent').mockImplementation(async () => true);
      jest.spyOn(disciplineTeacherService, 'isNotSelectedByUser').mockImplementation(async () => false);

      const result = await teacherService.getUserDisciplineTeachers('teacherId', 'userId', false);

      expect(result.length).toBe(1);
    });

    it('should filter out removed discipline teachers', async () => {
      const disciplineTeachers = [
        { id: '1', discipline: { semester: 1, year: 2022 } },
        { id: '2', discipline: { semester: 2, year: 2022 } },
      ] as DbDisciplineTeacher[];

      jest.spyOn(disciplineTeacherRepository, 'findMany').mockImplementation(async () => disciplineTeachers);
      jest.spyOn(disciplineTeacherRepository, 'findOne').mockImplementation(async (query) => {
        if (query.id === '1')
          return { id: '1', removedDisciplineTeachers: [{ studentId: 'userId' }] } as any as Promise<any>;
        return null;
      });
      jest.spyOn(dateService, 'isPreviousSemesterToCurrent').mockImplementation(async () => true);
      jest.spyOn(disciplineTeacherService, 'isNotSelectedByUser').mockImplementation(async () => false);

      const result = await teacherService.getUserDisciplineTeachers('teacherId', 'userId', false);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('should filter out discipline teachers from current semester', async () => {
      const disciplineTeachers = [
        { id: '1', discipline: { semester: 1, year: 2022 } },
        { id: '2', discipline: { semester: 2, year: 2023 } },
      ] as DbDisciplineTeacher[];

      jest.spyOn(disciplineTeacherRepository, 'findMany').mockImplementation(async () => disciplineTeachers);
      jest.spyOn(disciplineTeacherRepository, 'findOne').mockImplementation(async () => null);
      jest.spyOn(dateService, 'isPreviousSemesterToCurrent').mockImplementation(async (semester, year) => year === 2022);
      jest.spyOn(disciplineTeacherService, 'isNotSelectedByUser').mockImplementation(async () => false);

      const result = await teacherService.getUserDisciplineTeachers('teacherId', 'userId', false);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter out discipline teachers not selected by user', async () => {
      const disciplineTeachers = [
        { id: '1', discipline: { semester: 1, year: 2022 } },
        { id: '2', discipline: { semester: 2, year: 2022 } },
      ] as DbDisciplineTeacher[];

      jest.spyOn(disciplineTeacherRepository, 'findMany').mockImplementation(async () => disciplineTeachers);
      jest.spyOn(disciplineTeacherRepository, 'findOne').mockImplementation(async () => null);
      jest.spyOn(dateService, 'isPreviousSemesterToCurrent').mockImplementation(async () => true);
      jest.spyOn(disciplineTeacherService, 'isNotSelectedByUser').mockImplementation(async (userId, discipline) => discipline.id === '2');

      const result = await teacherService.getUserDisciplineTeachers('teacherId', 'userId', false);

      expect(result[0].id).toBe('1');
    });

    it('should apply notAnswered filter', async () => {
      const disciplineTeachers = [
        { id: '1', discipline: { semester: 1, year: 2022 } },
        { id: '2', discipline: { semester: 2, year: 2022 } },
      ] as DbDisciplineTeacher[];

      jest.spyOn(disciplineTeacherRepository, 'findMany').mockImplementation(async (where) => {
        if (where.NOT) return [disciplineTeachers[0]];
        return disciplineTeachers;
      });
      jest.spyOn(disciplineTeacherRepository, 'findOne').mockImplementation(async () => null);
      jest.spyOn(dateService, 'isPreviousSemesterToCurrent').mockImplementation(async () => true);
      jest.spyOn(disciplineTeacherService, 'isNotSelectedByUser').mockImplementation(async () => false);

      const result = await teacherService.getUserDisciplineTeachers('teacherId', 'userId', true);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('getTeacherRoles', () => {
    beforeAll(() => {
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async ({ id }) =>
        [teacher1, teacher2].find((t) => t.id === id));
    });

    it('should return teacher roles', async () => {
      const result = await teacherService.getTeacherRoles(teacher1.id);
      expect(result).toEqual(['LECTURE']);
    });

    it('should return empty array if teacher has no roles', async () => {
      const result = await teacherService.getTeacherRoles(teacher2.id);
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    beforeAll(() => {
      jest.spyOn(teacherRepository, 'create').mockImplementation(async (teacher: Prisma.TeacherUncheckedCreateInput) => {
        return createTeacher(teacher);
      });
    });

    it('should create teacher', async () => {
      const result = await teacherService.create(teacher1CreateInput);

      expect(result).toEqual(teacher1);
    });
  });

  describe('update', () => {
    let teachers: DbTeacher[] = [];

    beforeAll(() => {
      jest.spyOn(teacherRepository, 'updateById').mockImplementation(async (id, input: Prisma.TeacherUncheckedUpdateInput) =>
        updateTeacher(id, input, teachers));
    });

    beforeEach(() => teachers = [{ ...teacher1 }, { ...teacher2 }]);

    it('should update teacher', async () => {
      const result = await teacherService.update(teacher1.id, teacher1UpdateInput);
      expect(result).toEqual(teacher1Updated);
    });

    it('should do nothing if teacher not found', async () => {
      await teacherService.update('0', teacher1UpdateInput);
      expect(teachers).toEqual([teacher1, teacher2]);
    });
  });

  describe('delete', () => {
    let teachers: DbTeacher[] = [];

    beforeAll(() => {
      jest.spyOn(teacherRepository, 'deleteById').mockImplementation(async (id) => {
        const teacherToDelete: DbTeacher = teachers.find((t) => t.id === id);
        teachers = teachers.filter((t) => t.id !== id);
        return teacherToDelete;
      });
    });

    beforeEach(() => teachers = [{ ...teacher1 }, { ...teacher2 }]);

    it('should delete teacher', async () => {
      await teacherService.delete(teacher1.id);
      expect(teachers).toEqual([teacher2]);
    });

    it('should do nothing if teacher not found', async () => {
      await teacherService.delete('0');
      expect(teachers).toEqual([teacher1, teacher2]);
    });
  });

  describe('getAllContacts', () => {
    it('should return all contacts for a given teacher', async () => {
      jest.spyOn(contactRepository, 'findMany').mockImplementation(async () => [teacher1Contact, teacher1Contact2]);

      const result = await teacherService.getAllContacts(teacher1.id);
      expect(result).toEqual([teacher1Contact, teacher1Contact2]);
    });

    it('should return an empty array if no contacts found', async () => {
      jest.spyOn(contactRepository, 'findMany').mockImplementation(async () => []);

      const result = await teacherService.getAllContacts(teacher1.id);
      expect(result).toEqual([]);
    });
  });

  describe('getContact', () => {
    let contacts;
    beforeAll(() => {
      contacts = [teacher1Contact];
      jest.spyOn(contactRepository, 'findOne').mockImplementation(async ({ id }: Prisma.ContactWhereInput) =>
        contacts.find((c) => c.id === id) as any as Promise<any>);
    });

    it('should return contact', async () => {
      const result = await teacherService.getContact(teacher1.id, teacher1.id);
      expect(result).toMatchObject({
        name: teacher1Contact.name,
        displayName: teacher1Contact.displayName,
        link: teacher1Contact.link,
      });
    });

    it('should return undefined if contact not found', async () => {
      const result = await teacherService.getContact(teacher1.id, '0');
      expect(result).toBeNull();
    });
  });

  describe('createContact', () => {
    let contacts;

    beforeAll(() => {
      contacts = [teacher2Contact];
      jest.spyOn(contactRepository, 'create').mockImplementation(async (data: CreateContactData) =>
        createContact(contacts, data));
      jest.spyOn(contactRepository, 'findOne').mockImplementation(async ({ id }: Prisma.ContactWhereInput) =>
        contacts.find((c) => c.id === id));
    });

    it('should create contact', async () => {
      const contactData = {
        entityId: teacher1.id,
        name: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
        displayName: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
        link: `/teachers/${teacher1.id}`,
      };
      const result = await teacherService.createContact(teacher1.id, contactData);
      expect(result).toMatchObject(teacher1Contact);
    });
  });

  describe('updateContact', () => {
    let contacts;

    beforeAll(() => {
      jest.spyOn(contactRepository, 'updateById').mockImplementation(async (
        id: string,
        data: Prisma.ContactUpdateInput,
      ) => {
        const contact = contacts.find((c: { id: string; }) => c.id === id);
        if (!contact) return null as any as Promise<any>;

        contact.displayName = data.displayName || contact.displayName;
        contact.link = data.link || contact.link;
        contact.name = data.name || contact.name;

        return contact as any as Promise<any>;
      });
      jest.spyOn(contactRepository, 'findOne').mockImplementation(async ({ id }: Prisma.ContactWhereInput) =>
        contacts.find((c) => c.id === id) ?? null);
    });

    beforeEach(() => contacts = [{ ...teacher1Contact }, { ...teacher2Contact }]);

    it('should update contact', async () => {
      const result = await teacherService.updateContact(teacher1.id, {
        displayName: 'newDisplayName',
        link: 'newLink',
      });

      expect(result).toMatchObject({
        id: teacher1.id,
        name: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
        displayName: 'newDisplayName',
        link: 'newLink',
      });
    });

    it('should do nothing if contact not found', async () => {
      const result = await teacherService.updateContact('0', {
        displayName: 'newDisplayName',
        link: 'newLink',
      });
      expect(result).toBeNull();
    });
  });

  describe('deleteContact', () => {
    let contacts;

    beforeAll(() => {
      jest.spyOn(contactRepository, 'deleteById').mockImplementation(async (id: string) => {
        const contactToDelete = contacts.find((c: { id: string; }) => c.id === id);
        const countBeforeDelete: number = contacts.length;
        contacts = contacts.filter((c) => c.id !== id);

        return {
          ...contactToDelete,
          count: countBeforeDelete - contacts.length,
        } as any as Promise<any>;
      });
    });

    beforeEach(() => contacts = [teacher1Contact, teacher2Contact]);

    it('should delete contact', async () => {
      await teacherService.deleteContact(teacher1.id);
      expect(contacts).toEqual([teacher2Contact]);
    });

    it('should do nothing if contact not found', async () => {
      await teacherService.deleteContact('0');
      expect(contacts).toEqual([teacher1Contact, teacher2Contact]);
    });
  });

  describe('getTeacherSubjects', () => {
    it('should return subjects for a given teacher', async () => {
      jest.spyOn(subjectRepository, 'findMany').mockImplementation(async () => teacherSubjects);

      const result = await teacherService.getTeacherSubjects('teacherId');

      expect(result).toEqual(teacherSubjects);
    });

    it('should return an empty array if no subjects found', async () => {
      jest.spyOn(subjectRepository, 'findMany').mockImplementation(async () => []);

      const result = await teacherService.getTeacherSubjects('teacherId');

      expect(result).toEqual([]);
    });
  });

  describe('getTeacherSubject', () => {
    it('should return a subject for a given teacher', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => teacher1);
      jest.spyOn(subjectRepository, 'findOne').mockImplementation(async () => teacher1Subject as any as Promise<any>);
      jest.spyOn(contactRepository, 'findMany').mockImplementation(async () => [teacher1Contact]);

      const result = await teacherService.getTeacherSubject(teacher1.id, teacher1Subject.id);

      expect(result).toEqual(getTeacherSubjectResult);
    });

    it('should throw an error if teacher not found', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => null);

      await expect(teacherService.getTeacherSubject('teacherId', 'subjectId')).rejects.toThrow(InvalidEntityIdException);
    });
  });

  describe('sendComplaint', () => {
    beforeAll(() => {
      jest.spyOn(teacherRepository, 'findOne').mockImplementation(async () => teacher1);
      jest.spyOn(telegramAPI, 'sendMessage').mockImplementation(async () => null);
      jest.spyOn(teacherRepository, 'updateById').mockImplementation(async () => null);
    });

    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules(); // Clear the cache
      process.env = { ...originalEnv, COMPLAINT_CHAT_ID: 'mockChatId' }; // Set the mock value
    });

    afterEach(() => {
      process.env = originalEnv; // Restore the original environment
    });

    it('should send a complaint successfully', async () => {
      jest.spyOn(groupRepository, 'findOne').mockImplementation(async () => ({
        id: '3242342342342',
        code: 'ІС-34',
        admissionYear: 2222,
        cathedraId: null,
        educationalProgramId: null,
        createdAt: new Date('2022-02-22T14:00:00.000Z'),
        updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        selectiveAmounts: [],
        telegramGroups: [],
        students: [],
      }));

      await teacherService.sendComplaint('teacherId', complaintOnTeacher);

      expect(teacherRepository.updateById).toHaveBeenCalledWith('teacherId', {
        complaints: {
          create: complaintOnTeacher,
        },
      });
      expect(telegramAPI.sendMessage).toHaveBeenCalledWith(complainMessage, 'mockChatId');
    });

    it('should throw an error if group code is not found', async () => {
      jest.spyOn(groupRepository, 'findOne').mockImplementation(async () => null);

      await expect(teacherService.sendComplaint('teacherId', complaintOnTeacher)).rejects.toThrow(InvalidEntityIdException);
    });

    it('should use default values if fullName and groupId are not provided', async () => {
      jest.spyOn(groupRepository, 'findOne').mockImplementation(async () => null);

      const complaintDTO: ComplaintDTO = {
        title: 'Complaint Title',
        message: 'Complaint Message',
      };

      await teacherService.sendComplaint('teacherId', complaintDTO);

      expect(teacherRepository.updateById).toHaveBeenCalledWith('teacherId', {
        complaints: {
          create: complaintDTO,
        },
      });
      expect(telegramAPI.sendMessage).toHaveBeenCalledWith(complainMessage, 'mockChatId');
    });
  });

  describe('updateRating', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should update the rating of all teachers', async () => {
      const teachers = [
        { id: 'teacher1' },
        { id: 'teacher2' },
      ];

      const marksTeacher1 = [
        { type: QuestionDisplay.RADAR, mark: 80, amount: 10 },
        { type: QuestionDisplay.AMOUNT, mark: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 0, 6: 2, 7: 0, 8: 0, 9: 0, 10: 0 }, amount: 3 },
      ];

      const marksTeacher2 = [
        { type: QuestionDisplay.RADAR, mark: 90, amount: 10 },
        { type: QuestionDisplay.AMOUNT, mark: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 1, 10: 1 }, amount: 2 },
      ];

      jest.spyOn(teacherRepository, 'findMany').mockImplementation(async () => teachers as any as Promise<any>);
      jest.spyOn(teacherService, 'getMarks').mockImplementation(async (teacherId) => {
        if (teacherId === 'teacher1') return marksTeacher1;
        if (teacherId === 'teacher2') return marksTeacher2;
        return [];
      });
      jest.spyOn(teacherService, 'getRating').mockImplementation((marks) => {
        if (marks === marksTeacher1) return 85;
        if (marks === marksTeacher2) return 95;
        return 0;
      });
      jest.spyOn(teacherRepository, 'updateById').mockImplementation(async () => null);

      await teacherService.updateRating();

      expect(teacherRepository.updateById).toHaveBeenCalledWith('teacher1', { rating: 85 });
      expect(teacherRepository.updateById).toHaveBeenCalledWith('teacher2', { rating: 95 });
    });

    it('should not update rating if no teachers found', async () => {
      jest.spyOn(teacherRepository, 'findMany').mockImplementation(async () => []);
      jest.spyOn(teacherService, 'getMarks').mockImplementation(async () => []);
      jest.spyOn(teacherService, 'getRating').mockImplementation(() => 0);
      jest.spyOn(teacherRepository, 'updateById').mockImplementation(async () => null);

      await teacherService.updateRating();

      expect(teacherRepository.updateById).not.toHaveBeenCalled();
    });
  });

});

//#region entities for test
const cathedra1: Cathedra = {
  id: '1aa4ce9f-85c9-4ca8-b374-c00e7860c4a5',
  name: 'Обчислювальної техніки',
  abbreviation: 'ОТ',
  division: 'ФІОТ',
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

const cathedra2: Cathedra = {
  id: '4681f74e-4f6d-4402-a1fd-dbdd3ccde690',
  name: 'Інформаційних систем та технологій',
  abbreviation: 'ІСТ',
  division: 'ФІОТ',
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

export const cathedra3: DbCathedra = {
  id: 'f4b3b3b4-3b3b-4b3b-3b3b-3b3b3b3b3b3b',
  name: 'ІПІ',
  abbreviation: 'ІПІ',
  division: 'ФІОТ',
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

const cathedras: Cathedra[] = [cathedra1, cathedra2, cathedra3];

const teacher1: DbTeacher = {
  id: '73184418-e1a1-4269-a84b-4b8799107355',
  firstName: 'Вадим',
  lastName: 'Петрусь',
  middleName: 'Олександрович',
  description: null,
  avatar: 'https://imgur.com/KlTpQYH.png',
  academicStatus: null,
  scientificDegree: null,
  position: null,
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
  rating: new Decimal(60.00),
  cathedras: [
    {
      cathedraId: cathedra1.id,
      teacherId: '73184418-e1a1-4269-a84b-4b8799107355',
      createdAt: new Date('2022-02-22T14:00:00.000Z'),
      updatedAt: new Date('2022-02-22T14:00:00.000Z'),
      cathedra: cathedra1,
    }],
  disciplineTeachers: [{
    id: '73184418-e1a1-4269-a84b-4b8799107355',
    teacherId: '73184418-e1a1-4269-a84b-4b8799107355',
    disciplineId: '23184418-e1a1-4269-a84b-4b8799107356',
    createdAt: new Date('2022-02-22T14:00:00.000Z'),
    updatedAt: new Date('2022-02-22T14:00:00.000Z'),
    discipline: {
      id: '23184418-e1a1-4269-a84b-4b8799107356',
      isSelective: false,
      subjectId: '23184418-e1a1-4269-a84b-4b8799107356',
      groupId: '23184418-e1a1-4269-a84b-4b8799107356',
      year: 2024,
      semester: 1,
      description: 'description',
      createdAt: new Date('2022-02-22T14:00:00.000Z'),
      updatedAt: new Date('2022-02-22T14:00:00.000Z'),
    },
    roles: [
      {
        disciplineTeacherId: '73184418-e1a1-4269-a84b-4b8799107355',
        disciplineTypeId: '23184418-e1a1-4269-a84b-4b8799107356',
        createdAt: new Date('2022-02-22T14:00:00.000Z'),
        updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        disciplineType: {
          id: '23184418-e1a1-4269-a84b-4b8799107356',
          disciplineId: '23184418-e1a1-4269-a84b-4b8799107356',
          name: DisciplineTypeEnum.LECTURE,
          createdAt: new Date('2022-02-22T14:00:00.000Z'),
          updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        },
      },
    ],

  }],

};

const teacher1CreateInput: Prisma.TeacherUncheckedCreateInput = {
  id: teacher1.id,
  firstName: teacher1.firstName,
  lastName: teacher1.lastName,
  middleName: teacher1.middleName,
  description: teacher1.description,
  avatar: teacher1.avatar,
  academicStatus: teacher1.academicStatus,
  scientificDegree: teacher1.scientificDegree,
  position: teacher1.position,
  rating: teacher1.rating,
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
  cathedras: {
    connect: [
      {
        teacherId_cathedraId: {
          cathedraId: cathedra1.id,
          teacherId: teacher1.id,
        },
      },
    ],
  },
  disciplineTeachers: {
    create: [
      {
        id: teacher1.id,
        disciplineId: '23184418-e1a1-4269-a84b-4b8799107356',
        createdAt: new Date('2022-02-22T14:00:00.000Z'),
        updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        roles: {
          create: [
            {
              disciplineTypeId: '23184418-e1a1-4269-a84b-4b8799107356',
            },
          ],
        },
      },
    ],
  },
};

const teacher1UpdateInput: Prisma.TeacherUncheckedUpdateInput = {
  firstName: 'Новий',
  lastName: 'Новий',
  middleName: 'Новий',
  description: 'Новий',
  avatar: 'Новий',
  academicStatus: AcademicStatus.PROFESSOR,
  scientificDegree: ScientificDegree.CANDIDATE,
  position: Position.SENIOR_RESEARCH_ASSISTANT,
  rating: new Decimal(100.00),
};

const teacher1Updated: DbTeacher = {
  ...teacher1,
  firstName: teacher1UpdateInput.firstName as string,
  lastName: teacher1UpdateInput.lastName as string,
  middleName: teacher1UpdateInput.middleName as string,
  description: teacher1UpdateInput.description as string,
  avatar: teacher1UpdateInput.avatar as string,
  academicStatus: teacher1UpdateInput.academicStatus as AcademicStatus,
  scientificDegree: teacher1UpdateInput.scientificDegree as ScientificDegree,
  position: teacher1UpdateInput.position as Position,
  rating: new Decimal(teacher1UpdateInput.rating as string),
};

const teacher1Subject = {
  id: 'subject1',
  subjectId: 'subject1',
  groupId: 'subject1',
  semester: 1,
  year: 2024,
  isSelective: false,
  description: 'description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const teacher1Contact = {
  id: teacher1.id,
  name: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
  displayName: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
  link: `/teachers/${teacher1.id}`,
  entityId: teacher1.id,
  entityType: EntityType.TEACHER,
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

const teacher1Contact2 = {
  id: teacher1.id,
  name: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
  displayName: `${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}`,
  link: `/site/second/${teacher1.id}`,
  entityId: teacher1.id,
  entityType: EntityType.TEACHER,
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

const getTeacherSubjectResult = {
  id: '73184418-e1a1-4269-a84b-4b8799107355',
  firstName: 'Вадим',
  lastName: 'Петрусь',
  middleName: 'Олександрович',
  description: null,
  avatar: 'https://imgur.com/KlTpQYH.png',
  academicStatus: null,
  scientificDegree: null,
  position: null,
  rating: 60,
  cathedras: [
    {
      id: '1aa4ce9f-85c9-4ca8-b374-c00e7860c4a5',
      name: 'Обчислювальної техніки',
      abbreviation: 'ОТ',
      division: 'ФІОТ',
    },
  ],
  disciplineTypes: [],
  subject: { id: 'subject1', name: undefined },
  contacts: [
    teacher1Contact,
  ],
};

const teacher2: DbTeacher = {
  id: 'f4b3b3b4-3b3b-4b3b-3b3b-3b3b3b3b3b3b',
  firstName: 'Порфирій',
  lastName: 'Іванов',
  middleName: 'Петрович',
  avatar: 'https://imgur.com/KlTpQYH.png',
  academicStatus: null,
  scientificDegree: null,
  position: null,
  description: null,
  rating: new Decimal(67.06),
  cathedras: [
    {
      cathedraId: cathedra2.id,
      teacherId: 'f4b3b3b4-3b3b-4b3b-3b3b-3b3b3b3b3b3b',
      createdAt: new Date('2022-02-22T14:00:00.000Z'),
      updatedAt: new Date('2022-02-22T14:00:00.000Z'),
      cathedra: cathedra2,
    }],
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

const teacher2Contact = {
  id: teacher2.id,
  name: `${teacher2.lastName} ${teacher2.firstName} ${teacher2.middleName}`,
  displayName: `${teacher2.lastName} ${teacher2.firstName} ${teacher2.middleName}`,
  link: `/teachers/${teacher2.id}`,
  createdAt: new Date('2022-02-22T14:00:00.000Z'),
  updatedAt: new Date('2022-02-22T14:00:00.000Z'),
};

const teacherOnCathedra1: DbTeachersOnCathedras = {
  cathedraId: cathedra3.id,
  teacherId: teacher1.id,
  createdAt: new Date('2024-02-22T14:00:00.000Z'),
  updatedAt: new Date('2024-02-22T14:00:00.000Z'),
  cathedra: cathedra3,
};

const teacherSubjects = [
  { id: 'subject1', name: 'Subject 1', createdAt: new Date(), updatedAt: new Date() },
  { id: 'subject2', name: 'Subject 2', createdAt: new Date(), updatedAt: new Date() },
];

const complaintOnTeacher: ComplaintDTO = {
  fullName: 'Алтунян Арсен Батькович',
  groupId: 'ІС-34',
  title: 'Папірець',
  message: 'Хочу плюсік будь ласка',
};

const complainMessage = '<b>Скарга на викладача:</b>\n' +
  '\n' +
  `<b>Викладач:</b> ${teacher1.lastName} ${teacher1.firstName} ${teacher1.middleName}\n` +
  '<b>Студент:</b> Алтунян Арсен Батькович\n' +
  '<b>Група:</b> ІС-34\n' +
  '\n' +
  'Папірець\n' +
  '\n' +
  'Хочу плюсік будь ласка';

const teacherMarks = [
  {
    name: 'Володіння матеріалом',
    amount: 8,
    type: 'AMOUNT',
    mark: {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 1,
      '9': 0,
      '10': 7,
    },
  },
  { name: 'Організація занять',
    amount: 8,
    type: 'RADAR',
    mark: 98.75,
  },
  {
    name: 'Академічна доброчесність',
    amount: 8,
    type: 'RADAR',
    mark: 98.75,
  },
  {
    name: 'Коректність поведінки',
    amount: 8,
    type: 'RADAR',
    mark: 98.75,
  },
  { name: 'Доступність оцінок',
    amount: 8,
    type: 'RADAR',
    mark: 93.75,
  },
  {
    name: 'Зручність здачі лабораторних',
    amount: 8,
    type: 'RADAR',
    mark: 100,
  },
  {
    name: 'Володіння технологіями дистанційного навчання',
    amount: 8,
    type: 'RADAR',
    mark: 100,
  },
  {
    name: 'Налагодження комунікації',
    amount: 8,
    type: 'RADAR',
    mark: 96.25,
  },
  {
    name: 'Адаптованість навчання',
    amount: 8,
    type: 'CIRCLE',
    mark: 100,
  },
  {
    name: 'Дотримання нормативних документів',
    amount: 8,
    type: 'CIRCLE',
    mark: 100,
  },
  {
    name: 'Сприяння творчій діяльності',
    amount: 8,
    type: 'CIRCLE',
    mark: 100,
  },
  {
    name: 'Сприяння науковій діяльності',
    amount: 8,
    type: 'CIRCLE',
    mark: 76.25,
  },
  {
    name: 'Відповідність системи оцінювання',
    amount: 8,
    type: 'RADAR',
    mark: 100,
  },
];

//#endregion

//#region mock functions
function createTeacher (input : Prisma.TeacherUncheckedCreateInput) : DbTeacher {
  const cathedraId : string = input.cathedras.connect[0].teacherId_cathedraId.cathedraId;

  return {
    id: input.id,
    firstName: input.firstName,
    middleName: input.middleName,
    lastName: input.lastName,
    description: input.description,
    avatar: input.avatar,
    academicStatus: input.academicStatus,
    scientificDegree: input.scientificDegree,
    position: input.position,
    rating: new Decimal(input.rating as string),
    createdAt: new Date('2022-02-22T14:00:00.000Z'),
    updatedAt: new Date('2022-02-22T14:00:00.000Z'),
    cathedras: [
      {
        cathedraId: cathedraId,
        teacherId: input.id,
        createdAt: new Date('2022-02-22T14:00:00.000Z'),
        updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        cathedra: cathedras.find((cathedra) => cathedra.id === '1aa4ce9f-85c9-4ca8-b374-c00e7860c4a5'),
      },
    ],
    disciplineTeachers: [
      {
        id: input.id,
        teacherId: input.id,
        disciplineId: '23184418-e1a1-4269-a84b-4b8799107356',
        createdAt: new Date('2022-02-22T14:00:00.000Z'),
        updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        discipline: {
          id: '23184418-e1a1-4269-a84b-4b8799107356',
          isSelective: false,
          subjectId: '23184418-e1a1-4269-a84b-4b8799107356',
          groupId: '23184418-e1a1-4269-a84b-4b8799107356',
          year: 2024,
          semester: 1,
          description: 'description',
          createdAt: new Date('2022-02-22T14:00:00.000Z'),
          updatedAt: new Date('2022-02-22T14:00:00.000Z'),
        },
        roles: [
          {
            disciplineTeacherId: input.id,
            disciplineTypeId: '23184418-e1a1-4269-a84b-4b8799107356',
            createdAt: new Date('2022-02-22T14:00:00.000Z'),
            updatedAt: new Date('2022-02-22T14:00:00.000Z'),
            disciplineType: {
              id: '23184418-e1a1-4269-a84b-4b8799107356',
              disciplineId: '23184418-e1a1-4269-a84b-4b8799107356',
              name: DisciplineTypeEnum.LECTURE,
              createdAt: new Date('2022-02-22T14:00:00.000Z'),
              updatedAt: new Date('2022-02-22T14:00:00.000Z'),
            },
          },
        ],
      },
    ],
  };
}

function updateTeacher (id: string, input: Prisma.TeacherUncheckedUpdateInput, teachers: DbTeacher[]) : DbTeacher {
  const teacherToUpdate : DbTeacher = teachers.find((teacher) => teacher.id === id);

  if (!teacherToUpdate)
    return null;

  teacherToUpdate.firstName = input.firstName as string;
  teacherToUpdate.middleName = input.middleName as string;
  teacherToUpdate.lastName = input.lastName as string;
  teacherToUpdate.description = input.description as string;
  teacherToUpdate.avatar = input.avatar as string;
  teacherToUpdate.academicStatus = input.academicStatus as AcademicStatus;
  teacherToUpdate.scientificDegree = input.scientificDegree as ScientificDegree;
  teacherToUpdate.position = input.position as Position;
  teacherToUpdate.rating = new Decimal(input.rating as string);

  return teacherToUpdate;
}

function createContact (contacts : any[], data: CreateContactData) {
  const contact = {
    id: data.entityId,
    name: data.name,
    displayName: data.displayName,
    link: data.link,
    entityType: data.entityType,
    entityId: data.entityId,
    createdAt: new Date('2022-02-22T14:00:00.000Z'),
    updatedAt: new Date('2022-02-22T14:00:00.000Z'),
  };
  contacts.push(contact);
  return contact;
}

//#endregion
