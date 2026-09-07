import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../../src/database/prisma.module';
import { PrismaService } from '../../../src/database/v2/prisma.service';
import { SubjectRepository } from '../../../src/database/v2/repositories/subject.repository';

// The transaction is ambient: nothing is handed a `tx` client, the repository is the
// same instance in and out of it. These exercise the proxy in PrismaService that makes
// that true, because everything the parser queue relies on rests on it.
describe('PrismaService.transaction', () => {
  let prisma: PrismaService;
  let subjects: SubjectRepository;

  const name = (suffix: string) => `tx-spec ${suffix} ${Date.now()}`;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    subjects = moduleRef.get(SubjectRepository);
  });

  afterAll(async () => {
    await prisma.subject.deleteMany({ where: { name: { startsWith: 'tx-spec ' } } });
  });

  it('commits what the callback wrote', async () => {
    const subjectName = name('committed');

    await prisma.transaction(async () => {
      await subjects.create({ name: subjectName });
    });

    expect(await subjects.findOne({ name: subjectName })).not.toBeNull();
  });

  it('rolls the whole callback back when it throws', async () => {
    const first = name('rolled-back-1');
    const second = name('rolled-back-2');

    await expect(prisma.transaction(async () => {
      await subjects.create({ name: first });
      await subjects.create({ name: second });
      throw new Error('half way through');
    })).rejects.toThrow('half way through');

    // Not just the write after the throw -- the one before it has to be gone too.
    expect(await subjects.findOne({ name: first })).toBeNull();
    expect(await subjects.findOne({ name: second })).toBeNull();
  });

  // A partly-written group is exactly the failure that left 102 lessonless events
  // behind on prod, so a killed job must leave nothing rather than half a schedule.
  it('leaves nothing behind when a unique constraint fires mid-way', async () => {
    const subjectName = name('constraint');
    await subjects.create({ name: subjectName });

    const survivor = name('survivor');
    await expect(prisma.transaction(async () => {
      await subjects.create({ name: survivor });
      await subjects.create({ name: subjectName });
    })).rejects.toBeDefined();

    expect(await subjects.findOne({ name: survivor })).toBeNull();
  });

  it('lets a nested call join the transaction in progress', async () => {
    const subjectName = name('nested');

    await expect(prisma.transaction(async () => {
      await prisma.transaction(async () => {
        await subjects.create({ name: subjectName });
      });
      throw new Error('outer fails after the inner one returned');
    })).rejects.toThrow('outer fails');

    // If the inner call had opened its own transaction it would have committed
    // independently and this row would still be here.
    expect(await subjects.findOne({ name: subjectName })).toBeNull();
  });

  it('writes outside a transaction exactly as before', async () => {
    const subjectName = name('plain');

    await subjects.create({ name: subjectName });

    expect(await subjects.findOne({ name: subjectName })).not.toBeNull();
  });
});
