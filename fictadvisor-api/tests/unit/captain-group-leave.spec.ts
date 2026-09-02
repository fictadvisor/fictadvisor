import { GroupService } from '../../src/modules/group/v2/group.service';
import { CaptainCanNotLeaveException } from '../../src/common/exceptions/captain-can-not-leave.exception';
import { NoPermissionException } from '../../src/common/exceptions/no-permission.exception';
import { State } from '@prisma-client/fictadvisor';

// A pocket-sized reader for the slice of Prisma's `where` that
// `getGraduatedGroupsWhere` builds. Running the real query against fake rows
// checks that it selects the right groups, which stubbing `findMany` out would not.
const matches = (where: any, group: any): boolean =>
  Object.entries(where).every(([key, value]: [string, any]) => {
    if (key === 'NOT') return !matches(value, group);
    if (key === 'OR') return value.some((clause: any) => matches(clause, group));
    if (key === 'code') return group.code.includes(value.contains);
    if (key === 'admissionYear') return group.admissionYear <= value.lte;
    throw new Error(`unsupported where key: ${key}`);
  });

const GROUP = 'GID-42';
const CAPTAIN = 'captain-user';
const STUDENT = 'student-user';

describe('GroupService.leaveGroup', () => {
  const build = ({ admissionYear, currentSemester, leaverId, code = 'ІМ-31' }: any) => {
    const service: any = Object.create(GroupService.prototype);

    service.studentRepository = {
      findOne: async () => ({ userId: leaverId, groupId: GROUP, state: State.APPROVED }),
      updateById: async (userId: string, data: any) => ({ userId, ...data }),
    };
    service.groupRepository = { findOne: async () => ({ id: GROUP, code, admissionYear }) };
    service.dateService = { getCurrentSemester: async () => currentSemester };
    service.userService = {
      deleteStudentSelectives: async () => undefined,
      getGroupRole: async () => ({ id: 'role-1' }),
    };
    service.findCaptain = async () => ({ id: CAPTAIN });

    return service;
  };

  // Semester 1 of 2026/27 is under way: a group admitted in 2023 sits its
  // fourth and final year, one admitted in 2022 has already graduated.
  const studying = { year: 2026, semester: 1, isFinished: false };

  it('rejects the captain of a group that is still studying', async () => {
    const service = build({ admissionYear: 2023, currentSemester: studying, leaverId: CAPTAIN });
    await expect(service.leaveGroup(GROUP, CAPTAIN))
      .rejects.toThrow(CaptainCanNotLeaveException);
  });

  it('lets the captain of a graduated group leave', async () => {
    const service = build({ admissionYear: 2022, currentSemester: studying, leaverId: CAPTAIN });
    await expect(service.leaveGroup(GROUP, CAPTAIN)).resolves.toBeDefined();
  });

  it('treats the final semester as graduated only once it has finished', async () => {
    const finished = { year: 2026, semester: 2, isFinished: true };
    const service = build({ admissionYear: 2023, currentSemester: finished, leaverId: CAPTAIN });
    await expect(service.leaveGroup(GROUP, CAPTAIN)).resolves.toBeDefined();

    const running = { year: 2026, semester: 2, isFinished: false };
    const still = build({ admissionYear: 2023, currentSemester: running, leaverId: CAPTAIN });
    await expect(still.leaveGroup(GROUP, CAPTAIN))
      .rejects.toThrow(CaptainCanNotLeaveException);
  });

  it('lets an ordinary student leave a studying group', async () => {
    const service = build({ admissionYear: 2023, currentSemester: studying, leaverId: STUDENT });
    await expect(service.leaveGroup(GROUP, STUDENT)).resolves.toBeDefined();
  });

  it('lets a student leave a group that has no captain at all', async () => {
    const service = build({ admissionYear: 2023, currentSemester: studying, leaverId: STUDENT });
    service.findCaptain = async () => undefined;
    await expect(service.leaveGroup(GROUP, STUDENT)).resolves.toBeDefined();
  });

  it('still refuses someone who is not in the group', async () => {
    const service = build({ admissionYear: 2023, currentSemester: studying, leaverId: STUDENT });
    service.studentRepository.findOne = async () => ({
      userId: STUDENT,
      groupId: 'another-group',
      state: State.APPROVED,
    });
    await expect(service.leaveGroup(GROUP, STUDENT))
      .rejects.toThrow(NoPermissionException);
  });
});

describe('GroupService.handleGraduatedGroups', () => {
  const build = (groups: any[], currentSemester: any) => {
    const service: any = Object.create(GroupService.prototype);
    const rows = groups.map((g) => ({ ...g }));

    const opened: string[] = [];

    service.dateService = { getCurrentSemester: async () => currentSemester };
    service.grantRepository = {
      update: async (where: any) => opened.push(where.permission),
    };
    service.groupRepository = {
      findMany: async (where: any) => rows.filter((g) => matches(where, g)),
      exists: async (where: any) => rows.some((g) => g.code === where.code),
      updateById: async (id: string, data: any) => {
        Object.assign(rows.find((g) => g.id === id), data);
      },
    };

    return { service, rows, opened };
  };

  // Semester 1 of 2026/27: the 2022 cohort and earlier have graduated.
  const studying = { year: 2026, semester: 1, isFinished: false };

  it('suffixes graduated groups and leaves studying ones alone', async () => {
    const { service, rows } = build([
      { id: 'a', code: 'ІМ-21', admissionYear: 2022 },
      { id: 'b', code: 'ІМ-31', admissionYear: 2023 },
    ], studying);

    await service.handleGraduatedGroups();

    expect(rows.find((g) => g.id === 'a').code).toBe('ІМ-21-2022');
    expect(rows.find((g) => g.id === 'b').code).toBe('ІМ-31');
  });

  // Master's programmes run two years, so a cohort a bachelor group is still
  // studying through has already left.
  it('graduates a master group two years earlier than a bachelor one', async () => {
    const { service, rows } = build([
      { id: 'бак', code: 'ІМ-41', admissionYear: 2024 },
      { id: 'мп', code: 'ІМ-41мп', admissionYear: 2024 },
      { id: 'мн', code: 'ІМ-41мн', admissionYear: 2024 },
      { id: 'мп-новий', code: 'ІМ-51мп', admissionYear: 2025 },
    ], studying);

    await service.handleGraduatedGroups();

    expect(rows.find((g) => g.id === 'бак').code).toBe('ІМ-41');
    expect(rows.find((g) => g.id === 'мп').code).toBe('ІМ-41мп-2024');
    expect(rows.find((g) => g.id === 'мн').code).toBe('ІМ-41мн-2024');
    expect(rows.find((g) => g.id === 'мп-новий').code).toBe('ІМ-51мп');
  });

  it('never touches аспіранти or codes it cannot parse', async () => {
    const { service, rows } = build([
      { id: 'ф', code: 'ІТ-в51ф', admissionYear: 2015 },
      { id: '?', code: 'дивнийкод', admissionYear: 2015 },
    ], studying);

    await service.handleGraduatedGroups();

    expect(rows.find((g) => g.id === 'ф').code).toBe('ІТ-в51ф');
    expect(rows.find((g) => g.id === '?').code).toBe('дивнийкод');
  });

  it('is idempotent across nightly runs', async () => {
    const { service, rows } = build([
      { id: 'a', code: 'ІМ-21', admissionYear: 2022 },
    ], studying);

    await service.handleGraduatedGroups();
    await service.handleGraduatedGroups();

    expect(rows[0].code).toBe('ІМ-21-2022');
  });

  it('frees the bare code for the cohort ten years later', async () => {
    const { service, rows } = build([
      { id: 'old', code: 'ІМ-31', admissionYear: 2023 },
      { id: 'new', code: 'ІМ-31', admissionYear: 2033 },
    ], { year: 2036, semester: 1, isFinished: false });


    await service.handleGraduatedGroups();

    expect(rows.find((g) => g.id === 'old').code).toBe('ІМ-31-2023');
    expect(rows.find((g) => g.id === 'new').code).toBe('ІМ-31');
  });

  it('refuses to collapse two cohorts onto one code', async () => {
    const { service, rows } = build([
      { id: 'a', code: 'ІМ-21', admissionYear: 2022 },
      { id: 'b', code: 'ІМ-21-2022', admissionYear: 2022 },
    ], studying);

    await service.handleGraduatedGroups();

    expect(rows.find((g) => g.id === 'a').code).toBe('ІМ-21');
  });
});

// The gap between semesters is when graduation actually lands: the last semester
// has ended, the next has not started, and `getCurrentSemester` still reports the
// finished one. Renaming has to happen here — the next cohort wearing the freed
// code is parsed at the end of August, before the new semester begins.
describe('graduation during the break between semesters', () => {
  const build = (groups: any[], currentSemester: any) => {
    const service: any = Object.create(GroupService.prototype);
    const rows = groups.map((g) => ({ ...g }));

    const opened: string[] = [];

    service.dateService = { getCurrentSemester: async () => currentSemester };
    service.grantRepository = {
      update: async (where: any) => opened.push(where.permission),
    };
    service.groupRepository = {
      findMany: async (where: any) => rows.filter((g) => matches(where, g)),
      exists: async (where: any) => rows.some((g) => g.code === where.code),
      updateById: async (id: string, data: any) => {
        Object.assign(rows.find((g) => g.id === id), data);
      },
    };

    return { service, rows, opened };
  };

  const cohort = () => [
    { id: 'бак-22', code: 'ІМ-21', admissionYear: 2022 },
    { id: 'бак-23', code: 'ІМ-31', admissionYear: 2023 },
    { id: 'мп-24', code: 'ІМ-41мп', admissionYear: 2024 },
    { id: 'мп-25', code: 'ІМ-51мп', admissionYear: 2025 },
  ];

  const codes = (rows: any[]) => Object.fromEntries(rows.map((g) => [g.id, g.code]));

  // Літні канікули 2026: 2025/2 скінчився 7 червня, 2026/1 ще не почався.
  const summerBreak = { year: 2025, semester: 2, isFinished: true };
  // Осінь 2026: новий семестр іде.
  const newSemester = { year: 2026, semester: 1, isFinished: false };
  // Зимові канікули: перший семестр скінчився, другий не почався.
  const winterBreak = { year: 2026, semester: 1, isFinished: true };

  const expected = {
    'бак-22': 'ІМ-21-2022',   // відучився 2022–2025, щойно випустився
    'бак-23': 'ІМ-31',        // попереду ще 2026-й рік
    'мп-24': 'ІМ-41мп-2024',  // два роки, відучився 2024–2025
    'мп-25': 'ІМ-51мп',       // попереду ще один рік
  };

  it('suffixes as soon as the last semester ends, without waiting for the new one', async () => {
    const { service, rows } = build(cohort(), summerBreak);

    await service.handleGraduatedGroups();

    expect(codes(rows)).toEqual(expected);
  });

  it('gives the same answer once the new semester has started', async () => {
    const { service, rows } = build(cohort(), newSemester);

    await service.handleGraduatedGroups();

    expect(codes(rows)).toEqual(expected);
  });

  it('graduates nobody extra over the winter break', async () => {
    const { service, rows } = build(cohort(), winterBreak);

    await service.handleGraduatedGroups();

    // A first semester ending is not the end of an academic year.
    expect(codes(rows)).toEqual(expected);
  });
});

// Both effects used to hang off two separate crons, which could drift apart if
// one ran and the other did not. They are one pass now.
describe('the graduated-group pass does both things at once', () => {
  const build = (groups: any[], currentSemester: any) => {
    const service: any = Object.create(GroupService.prototype);
    const rows = groups.map((g) => ({ ...g }));
    const opened: string[] = [];

    service.dateService = { getCurrentSemester: async () => currentSemester };
    service.grantRepository = {
      update: async (where: any, data: any) => {
        expect(where.set).toBe(false);
        expect(data).toEqual({ set: true });
        opened.push(where.permission);
      },
    };
    service.groupRepository = {
      findMany: async (where: any) => rows.filter((g) => matches(where, g)),
      exists: async (where: any) => rows.some((g) => g.code === where.code),
      updateById: async (id: string, data: any) => Object.assign(rows.find((g) => g.id === id), data),
    };

    return { service, rows, opened };
  };

  const studying = { year: 2026, semester: 1, isFinished: false };

  it('frees the code and opens leave for the same group', async () => {
    const { service, rows, opened } = build([
      { id: 'g1', code: 'ІМ-21', admissionYear: 2022 },
      { id: 'g2', code: 'ІМ-31', admissionYear: 2023 },
    ], studying);

    await service.handleGraduatedGroups();

    expect(rows.find((g) => g.id === 'g1').code).toBe('ІМ-21-2022');
    expect(opened).toEqual(['groups.g1.leave']);
  });

  it('still opens leave when the code cannot be freed', async () => {
    const { service, rows, opened } = build([
      { id: 'g1', code: 'ІМ-21', admissionYear: 2022 },
      { id: 'g2', code: 'ІМ-21-2022', admissionYear: 2022 },
    ], studying);

    await service.handleGraduatedGroups();

    // The collision blocks the rename, not the captain.
    expect(rows.find((g) => g.id === 'g1').code).toBe('ІМ-21');
    expect(opened).toEqual(['groups.g1.leave', 'groups.g2.leave']);
  });

  it('leaves аспіранти entirely alone', async () => {
    const { service, rows, opened } = build([
      { id: 'ф', code: 'ІТ-в51ф', admissionYear: 2015 },
    ], studying);

    await service.handleGraduatedGroups();

    expect(rows[0].code).toBe('ІТ-в51ф');
    expect(opened).toEqual([]);
  });
});

// The `exists` check before the rename is not atomic, so the constraint can still
// reject the write. Both paths must warn rather than crash the nightly pass.
describe('freeing a code that is already taken', () => {
  const build = (rejectWrite: boolean) => {
    const service: any = Object.create(GroupService.prototype);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const rows = [{ id: 'g1', code: 'ІМ-21', admissionYear: 2022 }];

    service.dateService = {
      getCurrentSemester: async () => ({ year: 2026, semester: 1, isFinished: false }),
    };
    service.grantRepository = { update: async () => undefined };
    service.groupRepository = {
      findMany: async () => rows,
      exists: async () => !rejectWrite,
      updateById: async () => {
        throw Object.assign(new Error('Unique constraint failed'), { code: 'P2002' });
      },
    };

    return { service, rows, warn };
  };

  it('warns instead of renaming when the check catches it', async () => {
    const { service, rows, warn } = build(false);

    await service.handleGraduatedGroups();

    expect(rows[0].code).toBe('ІМ-21');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ІМ-21-2022'));
    warn.mockRestore();
  });

  it('warns instead of crashing when the constraint catches it', async () => {
    const { service, warn } = build(true);

    await expect(service.handleGraduatedGroups()).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ІМ-21-2022'));
    warn.mockRestore();
  });
});
