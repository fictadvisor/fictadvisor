import { GroupService } from '../../src/modules/group/v2/group.service';
import { AlreadyExistException } from '../../src/common/exceptions/already-exist.exception';
import { isUniqueViolation } from '../../src/common/utils/prisma-error.util';

// What Prisma throws when a unique index rejects a write.
const uniqueViolation = () => Object.assign(new Error('Unique constraint failed'), {
  code: 'P2002',
  meta: { target: ['code'] },
});

describe('isUniqueViolation', () => {
  it('recognises P2002 and nothing else', () => {
    expect(isUniqueViolation(uniqueViolation())).toBe(true);
    expect(isUniqueViolation(Object.assign(new Error('nope'), { code: 'P2025' }))).toBe(false);
    expect(isUniqueViolation(new Error('boom'))).toBe(false);
    expect(isUniqueViolation(undefined)).toBe(false);
    expect(isUniqueViolation(null)).toBe(false);
  });
});

describe('creating a group with a code that is taken', () => {
  const build = (existing: string[]) => {
    const service: any = Object.create(GroupService.prototype);
    const rows = existing.map((code, i) => ({ id: `g${i}`, code }));

    service.groupRepository = {
      create: async (data: any) => {
        if (rows.some((r) => r.code === data.code)) throw uniqueViolation();
        const row = { id: `g${rows.length}`, ...data };
        rows.push(row);
        return row;
      },
      findOne: async (where: any) => rows.find((r) => r.code === where.code),
      updateById: async (id: string, data: any) => {
        if (data.code && rows.some((r) => r.id !== id && r.code === data.code)) throw uniqueViolation();
        return Object.assign(rows.find((r) => r.id === id), data);
      },
    };
    service.addPermissions = async () => undefined;
    service.roleRepository = { count: async () => 1 };

    return { service, rows };
  };

  it('rejects it as a bad request rather than a server error', async () => {
    const { service } = build(['ІМ-31']);

    await expect(service.create({ code: 'ІМ-31' })).rejects.toThrow(AlreadyExistException);
  });

  it('still creates a group whose code is free', async () => {
    const { service, rows } = build(['ІМ-31']);

    await expect(service.create({ code: 'ІМ-41' })).resolves.toMatchObject({ code: 'ІМ-41' });
    expect(rows).toHaveLength(2);
  });

  it('derives the admission year for a group created without one', async () => {
    const { service } = build([]);

    const group = await service.create({ code: 'ІМ-31' });

    expect(group.admissionYear).toBe(2023);
  });

  it('lets an unrelated failure through untouched', async () => {
    const { service } = build([]);
    service.groupRepository.create = async () => {
      throw new Error('database is on fire');
    };

    await expect(service.create({ code: 'ІМ-31' })).rejects.toThrow('database is on fire');
  });

  it('rejects renaming a group onto a taken code', async () => {
    const { service } = build(['ІМ-31', 'ІМ-41']);

    await expect(service.updateGroup('g0', { code: 'ІМ-41' })).rejects.toThrow(AlreadyExistException);
  });
});

// Two parses can run at once — the nightly cron and a manual one — and both miss
// the lookup for a group neither has seen before.
describe('getOrCreate losing the race', () => {
  it('reads back the row the other writer inserted', async () => {
    const service: any = Object.create(GroupService.prototype);
    const winner = { id: 'winner', code: 'ІМ-61', admissionYear: 2026 };
    let inserted = false;

    service.groupRepository = {
      // Absent on the first look, present by the time the insert is rejected.
      findOne: async () => (inserted ? winner : undefined),
      create: async () => {
        inserted = true;
        throw uniqueViolation();
      },
    };
    service.roleRepository = { count: async () => 1 };

    await expect(service.getOrCreate({ code: 'ІМ-61' })).resolves.toBe(winner);
  });

  it('creates the group when nothing else got there first', async () => {
    const service: any = Object.create(GroupService.prototype);

    service.groupRepository = {
      findOne: async () => undefined,
      create: async (data: any) => ({ id: 'new', ...data }),
    };
    service.roleRepository = { count: async () => 1 };

    await expect(service.getOrCreate({ code: 'ІМ-61' }))
      .resolves.toMatchObject({ code: 'ІМ-61', admissionYear: 2026 });
  });
});
