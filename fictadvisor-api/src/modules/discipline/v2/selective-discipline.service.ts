import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/v2/prisma.service';
import { State } from '@fictadvisor/utils';
import { StudyingSemester } from '../../date/v2/date.service';

export interface SelectiveParseSummary {
  groups: number,
  skippedGroups: number,
  createdDisciplines: number,
  assignedSelectives: number,
  deletedDisciplines: number,
}

type Selective = {
  lastName: string,
  firstName: string,
  middleName: string,
  group: string,
  subjectName: string,
}

// One student of one group with every subject they picked.
type StudentSelective = {
  lastName: string,
  firstName: string,
  subjectNames: string[],
}

// The file regrouped the way it is applied: one entry per group.
type GroupSelective = {
  code: string,
  subjectNames: string[],
  students: StudentSelective[],
}

// Everything the per-group loop needs, read in bulk before it starts, so that
// the loop itself only writes.
type ParseContext = {
  groupIdByCode: Map<string, string>,
  subjectIdByName: Map<string, string>,
  subjectNameById: Map<string, string>,
  // `${groupId}|${subjectId}` -> the discipline that already exists for it
  disciplineByGroupSubject: Map<string, { id: string, isSelective: boolean }>,
  // `${groupCode}|${lastName} ${firstName}` -> student id
  studentIdByName: Map<string, string>,
}

const CSV_SEPARATOR = ';';

const SUBJECT_REGEX = /^["']|["']$/g;

@Injectable()
export class SelectiveDisciplineService {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  // Rows of the uploaded file that belong to `semester`. Both semesters share a
  // parity (1, 3, 5... are the first ones), which is how the source encodes it.
  parseContent (text: string, semester: number): Selective[] {
    const rows = text.split('\n');

    const selective: Selective[] = [];

    for (const row of rows) {
      const splitRow = row.split(CSV_SEPARATOR);

      const subjectName = splitRow[2];
      const rowSemester = splitRow[4];
      const group = splitRow[7];
      const studentName = splitRow[9];

      if (!subjectName || !rowSemester) continue;

      if (+rowSemester % 2 !== semester % 2) continue;

      let [lastName, firstName, middleName] = studentName.split(' ');

      // STUDENTS' NAME FIXES
      if (lastName === 'Ал' && firstName === 'Хадам') {
        lastName = `${lastName} ${firstName}`;
        firstName = middleName;
      }
      if (lastName === 'Квасова' && firstName === 'Любов') {
        lastName = 'Рекечинська';
      }
      if (lastName === 'Бардах' && firstName === '(Івко)') {
        firstName = 'Максим';
      }
      if (lastName === 'Салман' && firstName === 'Марк') {
        firstName = 'Марк Адам';
        middleName = 'Ассаадович';
      }
      // END STUDENTS' NAME FIXES

      selective.push({
        lastName: lastName.replace('`', '\''),
        firstName: firstName.replaceAll('`', '\''),
        middleName: middleName.replaceAll('`', '\''),
        subjectName: subjectName
          .replace(SUBJECT_REGEX, '')
          .replaceAll('`', '\''),
        group,
      });
    }

    return selective;
  }

  async parse (content: string, period: StudyingSemester): Promise<SelectiveParseSummary> {
    const selective = this.parseContent(content, period.semester);
    const groups = this.groupSelective(selective);
    const context = await this.loadContext(groups, period);

    let skippedGroups = 0;
    let createdDisciplines = 0;
    let assignedSelectives = 0;

    for (const group of groups) {
      const groupId = context.groupIdByCode.get(group.code);
      if (!groupId) {
        console.log(`Skipped the unknown group ${group.code}`);
        skippedGroups++;
        continue;
      }

      const { disciplineIdBySubject, created } = await this.syncGroupDisciplines(
        group,
        groupId,
        context,
        period,
      );
      const amount = await this.setGroupSelectiveAmount(group, groupId, period);
      const assigned = await this.assignStudentSelectives(
        group,
        disciplineIdBySubject,
        context,
      );

      createdDisciplines += created;
      assignedSelectives += assigned;

      console.log(
        `${group.code}: ${group.subjectNames.length} disciplines, ` +
        `amount ${amount}, ${assigned} new selectives ` +
        `for ${group.students.length} students`,
      );
    }

    const deletedDisciplines = await this.deleteExcessiveSelective(selective, period);

    return {
      groups: groups.length,
      skippedGroups,
      createdDisciplines,
      assignedSelectives,
      deletedDisciplines,
    };
  }

  // Every row of the file is one (student, subject) pair, so the same group and
  // the same student come back over and over. Fold them once here and the rest
  // of the parse can walk groups instead of re-scanning the whole file.
  groupSelective (selective: Selective[]): GroupSelective[] {
    const groups = new Map<string, GroupSelective>();
    const students = new Map<string, StudentSelective>();

    for (const row of selective) {
      let group = groups.get(row.group);
      if (!group) {
        group = { code: row.group, subjectNames: [], students: [] };
        groups.set(row.group, group);
      }
      if (!group.subjectNames.includes(row.subjectName)) {
        group.subjectNames.push(row.subjectName);
      }

      const studentKey = this.studentKey(row.group, row.lastName, row.firstName);
      let student = students.get(studentKey);
      if (!student) {
        student = {
          lastName: row.lastName,
          firstName: row.firstName,
          subjectNames: [],
        };
        students.set(studentKey, student);
        group.students.push(student);
      }
      if (!student.subjectNames.includes(row.subjectName)) {
        student.subjectNames.push(row.subjectName);
      }
    }

    return [...groups.values()];
  }

  private async loadContext (
    groups: GroupSelective[],
    period: StudyingSemester,
  ): Promise<ParseContext> {
    const groupCodes = groups.map((g) => g.code);
    const subjectNames = [
      ...new Set(groups.flatMap((g) => g.subjectNames)),
    ];

    const groupIdByCode = await this.loadGroupIds(groupCodes);
    const subjectIdByName = await this.loadSubjectIds(subjectNames);

    return {
      groupIdByCode,
      subjectIdByName,
      subjectNameById: new Map(
        [...subjectIdByName].map(([name, id]) => [id, name]),
      ),
      disciplineByGroupSubject: await this.loadDisciplines(
        [...groupIdByCode.values()],
        period,
      ),
      studentIdByName: await this.loadStudentIds(groupCodes),
    };
  }

  // Groups named by the file but missing from the database are created, the way
  // the per-discipline code used to create them on the fly.
  private async loadGroupIds (codes: string[]): Promise<Map<string, string>> {
    const groups = await this.prisma.group.findMany({
      where: { code: { in: codes } },
      select: { id: true, code: true },
    });
    const idByCode = new Map(groups.map(({ code, id }) => [code, id]));

    const missing = codes.filter((code) => !idByCode.has(code));
    if (missing.length) {
      const created = await this.prisma.group.createManyAndReturn({
        data: missing.map((code) => ({ code })),
        select: { id: true, code: true },
      });
      for (const { code, id } of created) {
        idByCode.set(code, id);
        console.log(`Created the missing group ${code}`);
      }
    }

    return idByCode;
  }

  private async loadSubjectIds (names: string[]): Promise<Map<string, string>> {
    const subjects = await this.prisma.subject.findMany({
      where: { name: { in: names } },
      select: { id: true, name: true },
    });

    // `name` is not unique, so keep the first row for each name — that is what
    // the per-subject `findFirst` used to resolve to.
    const idByName = new Map<string, string>();
    for (const { name, id } of subjects) {
      if (!idByName.has(name)) idByName.set(name, id);
    }

    const missing = names.filter((name) => !idByName.has(name));
    if (missing.length) {
      const created = await this.prisma.subject.createManyAndReturn({
        data: missing.map((name) => ({ name })),
        select: { id: true, name: true },
      });
      for (const { name, id } of created) idByName.set(name, id);
      console.log(`Created ${created.length} missing subjects`);
    }

    return idByName;
  }

  private async loadDisciplines (groupIds: string[], period: StudyingSemester) {
    const disciplines = await this.prisma.discipline.findMany({
      where: {
        groupId: { in: groupIds },
        year: period.year,
        semester: period.semester,
      },
      select: { id: true, groupId: true, subjectId: true, isSelective: true },
    });

    const byGroupSubject = new Map<string, { id: string, isSelective: boolean }>();
    for (const { id, groupId, subjectId, isSelective } of disciplines) {
      const key = this.disciplineKey(groupId, subjectId);
      if (!byGroupSubject.has(key)) byGroupSubject.set(key, { id, isSelective });
    }

    return byGroupSubject;
  }

  private async loadStudentIds (groupCodes: string[]): Promise<Map<string, string>> {
    const students = await this.prisma.student.findMany({
      where: {
        user: {
          password: {
            not: null,
          },
        },
        state: State.APPROVED,
        group: {
          code: { in: groupCodes },
        },
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        group: { select: { code: true } },
      },
    });

    return new Map(
      students.map((student) => [
        this.studentKey(
          student.group?.code ?? '',
          student.lastName ?? '',
          student.firstName ?? '',
        ),
        student.userId,
      ]),
    );
  }

  // Creates the disciplines the group is missing and marks the ones it already
  // has as selective. Returns where every subject of the group ended up.
  private async syncGroupDisciplines (
    group: GroupSelective,
    groupId: string,
    context: ParseContext,
    period: StudyingSemester,
  ): Promise<{ disciplineIdBySubject: Map<string, string>, created: number }> {
    const disciplineIdBySubject = new Map<string, string>();
    const toCreate: { subjectId: string }[] = [];
    const toMarkSelective: string[] = [];

    for (const subjectName of group.subjectNames) {
      const subjectId = context.subjectIdByName.get(subjectName);
      if (!subjectId) continue;

      const existing = context.disciplineByGroupSubject.get(
        this.disciplineKey(groupId, subjectId),
      );

      if (!existing) {
        toCreate.push({ subjectId });
      } else {
        disciplineIdBySubject.set(subjectName, existing.id);
        if (!existing.isSelective) toMarkSelective.push(existing.id);
      }
    }

    if (toMarkSelective.length) {
      await this.prisma.discipline.updateMany({
        where: { id: { in: toMarkSelective } },
        data: { isSelective: true },
      });
    }

    if (toCreate.length) {
      const created = await this.prisma.discipline.createManyAndReturn({
        data: toCreate.map(({ subjectId }) => ({
          subjectId,
          groupId,
          year: period.year,
          semester: period.semester,
          isSelective: true,
        })),
        select: { id: true, subjectId: true },
      });

      for (const { id, subjectId } of created) {
        const subjectName = context.subjectNameById.get(subjectId);
        if (subjectName) disciplineIdBySubject.set(subjectName, id);
      }
      console.log(
        `Created ${created.length} disciplines in the group ${group.code}`,
      );
    }

    return { disciplineIdBySubject, created: toCreate.length };
  }

  // How many subjects a group had to pick. Every student of a group picks the
  // same amount, so the first one of them answers it for the whole group.
  private async setGroupSelectiveAmount (
    group: GroupSelective,
    groupId: string,
    period: StudyingSemester,
  ) {
    const amount = group.students[0]?.subjectNames.length ?? 0;

    await this.prisma.selectiveAmount.upsert({
      where: {
        groupId_year_semester: {
          groupId,
          year: period.year,
          semester: period.semester,
        },
      },
      update: {
        amount,
      },
      create: {
        groupId,
        amount,
        year: period.year,
        semester: period.semester,
      },
    });

    return amount;
  }

  private async assignStudentSelectives (
    group: GroupSelective,
    disciplineIdBySubject: Map<string, string>,
    context: ParseContext,
  ): Promise<number> {
    const selectives: { disciplineId: string, studentId: string }[] = [];

    for (const student of group.students) {
      const studentId = context.studentIdByName.get(
        this.studentKey(group.code, student.lastName, student.firstName),
      );
      // Students of the file who never registered on the platform.
      if (!studentId) continue;

      for (const subjectName of student.subjectNames) {
        const disciplineId = disciplineIdBySubject.get(subjectName);
        if (!disciplineId) {
          console.log(
            `No discipline ${subjectName} for group ${group.code} (student ${student.lastName} ${student.firstName})`,
          );
          continue;
        }

        selectives.push({ disciplineId, studentId });
      }
    }

    if (!selectives.length) return 0;

    const { count } = await this.prisma.selectiveDiscipline.createMany({
      data: selectives,
      skipDuplicates: true,
    });

    return count;
  }

  async deleteExcessiveSelective (selective: Selective[], period: StudyingSemester) {
    const subjects = new Set<string>();
    for (const obj of selective) {
      subjects.add(obj.subjectName);
    }
    const arr: string[] = Array.from(subjects.values());
    const amount = await this.prisma.discipline.deleteMany({
      where: {
        subject: {
          name: {
            in: arr,
          },
        },
        semester: period.semester,
        year: period.year,
        isSelective: false,
      },
    });
    console.log(`There were ${amount.count} selective disciplines deleted`);

    return amount.count;
  }

  private disciplineKey (groupId: string, subjectId: string) {
    return `${groupId}|${subjectId}`;
  }

  private studentKey (groupCode: string, lastName: string, firstName: string) {
    return `${groupCode}|${lastName} ${firstName}`;
  }
}
