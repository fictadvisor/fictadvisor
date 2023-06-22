import { Injectable } from '@nestjs/common';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { ExcessiveSelectiveDisciplinesException } from '../../utils/exceptions/ExcessiveSelectiveDisciplinesException';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { NotBelongToGroupException } from '../../utils/exceptions/NotBelongToGroupException';
import { checkIfArrayIsUnique } from '../../utils/ArrayUtil';
import { AlreadySelectedException } from '../../utils/exceptions/AlreadySelectedException';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { AttachSelectiveDisciplinesDTO } from '../dtos/AttachSelectiveDisciplinesDTO';
import { DbDiscipline } from '../../database/entities/DbDiscipline';

type SortedDisciplines = {
  year: number;
  semester: number;
  disciplines: string[];
}

@Injectable()
export class DisciplineService {
  constructor (
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private groupRepository: GroupRepository,
    private studentRepository: StudentRepository,
    private disciplineMapper: DisciplineMapper,
  ) {}

  async create (data: { subjectId: string, groupId: string, year: number, semester: number }) {
    return this.disciplineRepository.create(data);
  }

  async get (id: string) {
    return this.disciplineRepository.findById(id);
  }

  async getTeachers (id: string) {
    const disciplineTeachers = await this.disciplineTeacherRepository.findMany({
      where: {
        discipline: {
          id,
        },
      },
    });
    return this.disciplineTeacherMapper.getDisciplineTeachersWithTeacherParams(disciplineTeachers);
  }

  private async getSelectiveDisciplines (userId: string) {
    return this.disciplineRepository.findMany({
      where: {
        selectiveDisciplines: {
          some: {
            studentId: userId,
          },
        },
      },
    });
  }

  private checkIsEachDisciplineBelongUserGroup (
    disciplines: DbDiscipline[],
    groupId: string
  ) {
    disciplines.map((discipline) => {
      if (discipline.groupId !== groupId) {
        throw new NotBelongToGroupException();
      }
    });
  }

  private checkAlreadySelectedDisciplines (disciplineIds, selectedDisciplineIds) {
    const isUnique = checkIfArrayIsUnique([...disciplineIds, ...selectedDisciplineIds]);
    if (!isUnique) {
      throw new AlreadySelectedException();
    }
  }

  private async checkExcessiveSelectiveDisciplines (
    pendingDisciplines: SortedDisciplines[],
    selectedDisciplines: SortedDisciplines[],
    groupId: string,
  ) {
    for (const { year, semester, disciplines } of pendingDisciplines) {
      const pendingAmount = disciplines.length;
      const selectedAmount = selectedDisciplines
        .find((p) => p.year === year && p.semester === semester)
        ?.disciplines.length ?? 0;
      const { selectiveAmounts } = await this.groupRepository.find({
        selectiveAmounts: {
          some: {
            groupId: groupId,
            year: year,
            semester: semester,
          },
        },
      });
      const { amount } = selectiveAmounts[0];
      if (pendingAmount + selectedAmount > amount) {
        throw new ExcessiveSelectiveDisciplinesException();
      }
    }
  }

  private async attachSelectiveDisciplines (
    userId: string,
    disciplineIds: string[]
  ) {
    await this.studentRepository.update({
      where: {
        userId: userId,
      },
      data: {
        selectiveDisciplines: {
          createMany: {
            data: disciplineIds.map((disciplineId) => ({ disciplineId })),
          },
        },
      },
    });
  }

  async selectDisciplines (
    userId: string,
    body: AttachSelectiveDisciplinesDTO,
  ) {
    const disciplines = [];
    for (const disciplineId of body.disciplines) {
      disciplines.push(await this.disciplineRepository.findById(disciplineId));
    }
    const { id: groupId } = await this.groupRepository.find({
      students: {
        some: {
          userId: userId,
        },
      },
    });
    this.checkIsEachDisciplineBelongUserGroup(disciplines, groupId);

    const sortedDisciplines = this.disciplineMapper.getSortedDisciplinesByPeriod(disciplines);
    const selectedDisciplines = await this.getSelectiveDisciplines(userId);
    const sortedSelectedDisciplines = this.disciplineMapper.getSortedDisciplinesByPeriod(selectedDisciplines);

    this.checkAlreadySelectedDisciplines(body.disciplines, selectedDisciplines.map((d) => d.id));
    await this.checkExcessiveSelectiveDisciplines(sortedDisciplines, sortedSelectedDisciplines, groupId);
    await this.attachSelectiveDisciplines(userId, body.disciplines);
  }
}

