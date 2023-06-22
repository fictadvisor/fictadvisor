import { Test } from '@nestjs/testing';
import { MapperModule } from '../../modules/MapperModule';
import { PrismaModule } from '../../modules/PrismaModule';
import { PrismaService } from '../../database/PrismaService';
import { DisciplineService } from './DisciplineService';
import { NotBelongToGroupException } from '../../utils/exceptions/NotBelongToGroupException';
import { AlreadySelectedException } from '../../utils/exceptions/AlreadySelectedException';
import { ExcessiveSelectiveDisciplinesException } from '../../utils/exceptions/ExcessiveSelectiveDisciplinesException';

describe('SubjectService', () => {
  let disciplineService: DisciplineService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DisciplineService],
      imports: [
        PrismaModule,
        MapperModule,
      ],
    }).compile();

    disciplineService = moduleRef.get(DisciplineService);
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await prisma.group.createMany({
      data: 
        [
          {
            id: 'id',
            code: 'ІО-01',
          },
          {
            id: 'id1',
            code: 'IO-02',
          },
        ],
    });

    await prisma.subject.createMany({
      data: [
        {
          id: 'id1',
          name: 'subject1',
        },
        {
          id: 'id2',
          name: 'subject2',
        },
        {
          id: 'id3',
          name: 'subject3',
        },
        {
          id: 'id4',
          name: 'subject4',
        },
        {
          id: 'id5',
          name: 'subject5',
        },
      ],
    });

    await prisma.discipline.createMany({
      data: [
        {
          id: 'id1',
          subjectId: 'id1',
          groupId: 'id',
          semester: 1,
          year: 2022,
          isSelective: true,
        },
        {
          id: 'id2',
          subjectId: 'id2',
          groupId: 'id',
          semester: 2,
          year: 2023,
          isSelective: true,
        },
        {
          id: 'id3',
          subjectId: 'id3',
          groupId: 'id1',
          semester: 1,
          year: 2022,
          isSelective: true,
        },
        {
          id: 'id4',
          subjectId: 'id4',
          groupId: 'id',
          semester: 1,
          year: 2022,
          isSelective: true,
        },
        {
          id: 'id5',
          subjectId: 'id5',
          groupId: 'id',
          semester: 1,
          year: 2022,
          isSelective: true,
        },
      ],
    });

    await prisma.selectiveAmount.createMany({
      data: [
        {
          semester: 1,
          year: 2022,
          amount: 2,
          groupId: 'id',
        },
        {
          semester: 2,
          year: 2023,
          amount: 2,
          groupId: 'id',
        },
      ],
    });

    await prisma.user.create({
      data: {
        id: 'id',
        email: 'email',
        state: 'APPROVED',
      },
    });

    await prisma.student.create({
      data: {
        state: 'APPROVED',
        user: {
          connect: {
            id: 'id',
          },
        },
        group: {
          connect: {
            id: 'id',
          },
        },
        selectiveDisciplines: {
          createMany: {
            data: [
              {
                disciplineId: 'id4',
              },
            ],
          },
        },
      },
    });
  });

  describe('attachSelectiveDisciplines', () => {
    it('should connect selective disciplines to student', async () => {
      await disciplineService.selectDisciplines('id', { disciplines: ['id1', 'id2'] });

      const result = await prisma.selectiveDiscipline.findMany({
        orderBy: {
          disciplineId: 'asc',
        },
      });
      await prisma.selectiveDiscipline.delete({
        where: {
          disciplineId_studentId: {
            disciplineId: 'id1',
            studentId: 'id',
          },
        },
      });
      await prisma.selectiveDiscipline.delete({
        where: {
          disciplineId_studentId: {
            disciplineId: 'id2',
            studentId: 'id',
          },
        },
      });

      expect(result).toStrictEqual([
        {
          disciplineId: 'id1',
          studentId: 'id',
        },
        {
          disciplineId: 'id2',
          studentId: 'id',
        },
        {
          disciplineId: 'id4',
          studentId: 'id',
        },
      ]);
    });

    it('should throw NotBelongToGroupException if discipline do not belong to users group',  async () => {
      await expect(
        disciplineService.selectDisciplines('id', { disciplines: ['id1', 'id2', 'id3'] })
      ).rejects.toThrow(NotBelongToGroupException);
    });

    it('should throw AlreadySelectedException if user have already selected this discipline', async () => {
      await expect(
        disciplineService.selectDisciplines('id', { disciplines: ['id1', 'id2', 'id4'] })
      ).rejects.toThrow(AlreadySelectedException);
    });

    it('should throw ExcessiveSelectiveDisciplinesException if selected disciplines more than selective amount', async () => {
      await expect(
        disciplineService.selectDisciplines('id', { disciplines: ['id1', 'id2', 'id5'] })
      ).rejects.toThrow(ExcessiveSelectiveDisciplinesException);
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.group.deleteMany({});
    await prisma.selectiveAmount.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.discipline.deleteMany({});
    await prisma.selectiveDiscipline.deleteMany({});
  });
});
