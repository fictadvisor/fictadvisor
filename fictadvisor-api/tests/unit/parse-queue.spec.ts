import { ParserTypeEnum } from '@fictadvisor/utils/enums';
import { ParseQueueService } from '../../src/modules/parser/v2/parse-queue.service';
import { PARSE_GROUP_JOB } from '../../src/modules/parser/v2/parse-queue.constants';

const plan = {
  parserType: ParserTypeEnum.CAMPUS,
  groups: [{ name: 'ІА-11' }, { name: 'ІА-12' }],
  weekNumber: 3,
  semesterStartDate: new Date('2026-08-31T00:00:00Z').toISOString(),
  year: 2026,
  semester: 1,
};

const parser = () => ({
  plan: jest.fn().mockResolvedValue(plan),
  parse: jest.fn().mockResolvedValue(undefined),
  parseGroupJob: jest.fn().mockResolvedValue(undefined),
});

const build = (p: ReturnType<typeof parser>, queue?: { addBulk: jest.Mock }) =>
  new ParseQueueService(p as any, queue as any);

describe('ParseQueueService', () => {
  it('fans the plan out into one job per group', async () => {
    const p = parser();
    const queue = { addBulk: jest.fn().mockResolvedValue([]) };

    const queued = await build(p, queue).enqueueNightly(ParserTypeEnum.CAMPUS);

    expect(queued).toBe(2);
    const [jobs] = queue.addBulk.mock.calls[0];
    expect(jobs).toHaveLength(2);
    expect(jobs[0].name).toBe(PARSE_GROUP_JOB);
    // The group travels with the shared context, and nothing else does.
    expect(jobs[0].data).toEqual({
      parserType: ParserTypeEnum.CAMPUS,
      weekNumber: 3,
      semesterStartDate: plan.semesterStartDate,
      year: 2026,
      semester: 1,
      group: { name: 'ІА-11' },
    });
  });

  // The whole double-fire problem: two processes running the cron in the same minute
  // produce identical job ids, and BullMQ keeps one of each.
  it('keys the nightly run by calendar day so a second run collides with it', async () => {
    const queue = { addBulk: jest.fn().mockResolvedValue([]) };
    await build(parser(), queue).enqueueNightly(ParserTypeEnum.CAMPUS);
    await build(parser(), queue).enqueueNightly(ParserTypeEnum.CAMPUS);

    const first = queue.addBulk.mock.calls[0][0].map((j: any) => j.opts.jobId);
    const second = queue.addBulk.mock.calls[1][0].map((j: any) => j.opts.jobId);

    expect(first).toEqual(second);
    expect(first[0]).toMatch(/^nightly:\d{4}-\d{2}-\d{2}:ІА-11$/);
  });

  // A hand-triggered re-parse after fixing data must not be swallowed by the morning's
  // run, so its key is fresh every time.
  it('gives a manual run a key of its own', async () => {
    const queue = { addBulk: jest.fn().mockResolvedValue([]) };
    const service = build(parser(), queue);

    await service.enqueueNightly(ParserTypeEnum.CAMPUS);
    await service.enqueueManual(ParserTypeEnum.CAMPUS);

    const nightly = queue.addBulk.mock.calls[0][0][0].opts.jobId;
    const manual = queue.addBulk.mock.calls[1][0][0].opts.jobId;
    expect(manual).not.toBe(nightly);
    expect(manual).toMatch(/^manual:\d+:ІА-11$/);
  });

  it('queues nothing when the semester is over', async () => {
    const p = parser();
    p.plan.mockResolvedValue(null);
    const queue = { addBulk: jest.fn().mockResolvedValue([]) };

    expect(await build(p, queue).enqueueNightly(ParserTypeEnum.CAMPUS)).toBe(0);
    expect(queue.addBulk).not.toHaveBeenCalled();
  });

  // No REDIS_URL -- CI, `.testing.env`, local runs -- means no queue at all, and the
  // import has to still happen, in one loop, exactly as it did before.
  it('parses inline when there is no queue', async () => {
    const p = parser();

    await build(p, undefined).enqueueManual(ParserTypeEnum.CAMPUS, ['ІА-11'], undefined, 2);

    expect(p.parse).toHaveBeenCalledWith(ParserTypeEnum.CAMPUS, ['ІА-11'], undefined, 2);
    expect(p.plan).not.toHaveBeenCalled();
  });
});
