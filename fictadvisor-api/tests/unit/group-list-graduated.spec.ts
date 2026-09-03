import { GroupService } from '../../src/modules/group/v2/group.service';
import { SortQAGroupsParam } from '@fictadvisor/utils';

// A pocket-sized reader for the slice of Prisma's `where` that `getAll` builds,
// so the filter is judged by the groups it actually selects rather than by the
// shape of the object it hands to Prisma.
const matches = (where: any, group: any): boolean =>
  Object.entries(where).every(([key, value]: [string, any]) => {
    if (key === 'AND') return value.every((clause: any) => matches(clause, group));
    if (key === 'OR') return value.some((clause: any) => matches(clause, group));
    if (key === 'NOT') return !matches(value, group);
    if (key === 'code') return group.code.includes(value.contains);
    if (key === 'admissionYear') return group.admissionYear <= value.lte;
    throw new Error(`unsupported where key: ${key}`);
  });

// Semester 1 of 2026/27 is under way: bachelors admitted in 2022 and masters
// admitted in 2024 have graduated, the cohorts after them are still studying.
const studying = { year: 2026, semester: 1, isFinished: false };

const GROUPS = [
  { id: 'бак-2022', code: 'ІМ-21', admissionYear: 2022 },
  { id: 'бак-2023', code: 'ІМ-31', admissionYear: 2023 },
  { id: 'бак-перейменований', code: 'ІМ-11-2021', admissionYear: 2021 },
  { id: 'мп-2024', code: 'ІМ-41мп', admissionYear: 2024 },
  { id: 'мп-2025', code: 'ІМ-51мп', admissionYear: 2025 },
  { id: 'ф', code: 'ІТ-в51ф', admissionYear: 2015 },
  { id: '?', code: 'дивнийкод', admissionYear: 2015 },
];

const STUDYING_CODES = ['ІМ-31', 'ІМ-51мп', 'ІТ-в51ф'];

// Built with the constructor rather than a bare prototype: the searching clauses
// `getAll` assembles are an instance field.
const build = () => {
  const select = async (where: any) => GROUPS.filter((group) => matches(where, group));

  const groupRepository = {
    findMany: select,
    count: async (where: any) => (await select(where)).length,
  };
  const studentRepository = {
    findMany: async (where: any) => (await select(where.group))
      .map((group) => ({ userId: `captain-${group.id}`, group })),
    count: async () => 0,
  };
  const dateService = { getCurrentSemester: async () => studying };

  return new (GroupService as any)(
    groupRepository, undefined, studentRepository,
    undefined, undefined, undefined, undefined, dateService,
  );
};

const codesOf = async (query: any): Promise<string[]> => {
  const { data } = await build().getAll(query);
  return data.map((group: any) => group.code);
};

describe('GroupService.getAll with hideGraduated', () => {
  it('lists every group when the option is not asked for', async () => {
    expect(await codesOf({})).toEqual(GROUPS.map((group) => group.code));
  });

  // Аспіранти never graduate here, so they stay on the studying side.
  it('leaves out the graduated groups and keeps everyone else', async () => {
    expect(await codesOf({ hideGraduated: true })).toEqual(STUDYING_CODES);
  });

  // SQL cannot tell a bachelor's code from one the grammar does not recognise —
  // bachelors are simply the codes carrying no level marker — so an old unknown
  // code is filtered on its year like any other. The nightly rename is the
  // stricter of the two on purpose: it changes the code, this only hides a row.
  it('leaves out an old group whose code the grammar does not recognise', async () => {
    expect(await codesOf({ hideGraduated: true })).not.toContain('дивнийкод');
  });

  it('drops a group whose code the nightly pass has already renamed', async () => {
    expect(await codesOf({ hideGraduated: true })).not.toContain('ІМ-11-2021');
  });

  it('narrows the captain listing the same way', async () => {
    expect(await codesOf({ hideGraduated: true, sort: SortQAGroupsParam.CAPTAIN }))
      .toEqual(STUDYING_CODES);
  });
});
