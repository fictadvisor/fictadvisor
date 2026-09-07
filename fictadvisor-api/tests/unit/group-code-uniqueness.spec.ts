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

// Two parses can run at once -- the nightly cron and a manual one -- and both miss
// the lookup for a group neither has seen before. It is an upsert now rather than a
// create-and-catch: the loser's unique violation would abort the transaction the
// import runs in, and the read-back that used to rescue it would never get to run.
describe('getOrCreate under a race', () => {
  const build = (upsert: any) => {
    const service: any = Object.create(GroupService.prototype);
    service.groupRepository = { upsert };
    service.roleRepository = { count: async () => 1 };
    return service;
  };

  it('returns the row the other writer inserted, without raising', async () => {
    const winner = { id: 'winner', code: 'ІМ-61', admissionYear: 2026 };

    // What Postgres does on conflict: hands back what is already there.
    const service = build(async () => winner);

    await expect(service.getOrCreate({ code: 'ІМ-61' })).resolves.toBe(winner);
  });

  it('creates the group when nothing else got there first', async () => {
    const service = build(async (_where: any, create: any) => ({ id: 'new', ...create }));

    await expect(service.getOrCreate({ code: 'ІМ-61' }))
      .resolves.toMatchObject({ code: 'ІМ-61', admissionYear: 2026 });
  });

  it('derives the admission year from the code it upserts', async () => {
    let created: any;
    const service = build(async (_where: any, create: any) => (created = create));

    await service.getOrCreate({ code: 'ІМ-31' });

    expect(created.admissionYear).toBe(2023);
  });

  // Locks the hazard out rather than trusting the reader: a bare create here is what
  // used to poison the surrounding transaction.
  it('never falls back to a bare create or a read-first lookup', async () => {
    const service = build(async () => ({ id: 'x', code: 'ІМ-61' }));
    service.groupRepository.create = () => {
      throw new Error('must not create directly'); 
    };
    service.groupRepository.findOne = () => {
      throw new Error('must not read first'); 
    };

    await expect(service.getOrCreate({ code: 'ІМ-61' })).resolves.toBeDefined();
  });
});
