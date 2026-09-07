import { Logger } from '@nestjs/common';
import { CronErrorReporter } from '../../src/common/services/cron-error-reporter';

// The handler is fired and forgotten by cron, so the reporting it kicks off has to be
// let through the microtask queue before it can be asserted on.
const flush = () => new Promise((resolve) => setImmediate(resolve));

const job = () => ({ errorHandler: undefined as ((error: unknown) => void) | undefined });

const build = (jobs: Record<string, ReturnType<typeof job>>, telegram: { error: jest.Mock }) =>
  new CronErrorReporter(
    { getCronJobs: () => new Map(Object.entries(jobs)) } as any,
    telegram as any,
  );

describe('CronErrorReporter', () => {
  let logged: jest.SpyInstance;
  let telegram: { error: jest.Mock };

  beforeEach(() => {
    logged = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    telegram = { error: jest.fn().mockResolvedValue(undefined) };
  });

  afterEach(() => jest.restoreAllMocks());

  it('hangs a handler on every registered job', () => {
    const jobs = { 'TeacherService.updateRating': job(), 'GroupService.handleGraduated': job() };

    build(jobs, telegram).attach();

    expect(typeof jobs['TeacherService.updateRating'].errorHandler).toBe('function');
    expect(typeof jobs['GroupService.handleGraduated'].errorHandler).toBe('function');
  });

  it('reports a failure with the job name and the stack', async () => {
    const jobs = { 'ScheduleService.autoParse': job() };
    build(jobs, telegram).attach();

    jobs['ScheduleService.autoParse'].errorHandler!(new Error('campus is down'));
    await flush();

    expect(telegram.error).toHaveBeenCalledTimes(1);
    const [message] = telegram.error.mock.calls[0];
    expect(message).toContain('ScheduleService.autoParse');
    expect(message).toContain('campus is down');
    expect(logged).toHaveBeenCalled();
  });

  it('reports a thrown non-Error too', async () => {
    const jobs = { 'ScheduleService.autoParse': job() };
    build(jobs, telegram).attach();

    jobs['ScheduleService.autoParse'].errorHandler!('just a string');
    await flush();

    expect(telegram.error.mock.calls[0][0]).toContain('just a string');
  });

  // The bot being unreachable at 03:00 must not turn a failed cron into a dead process:
  // nothing is awaiting this, so a rejection here would be an unhandled one.
  it('survives Telegram being unreachable', async () => {
    telegram.error.mockRejectedValue(new Error('ECONNREFUSED'));
    const jobs = { 'ScheduleService.autoParse': job() };
    build(jobs, telegram).attach();

    expect(() => jobs['ScheduleService.autoParse'].errorHandler!(new Error('boom'))).not.toThrow();
    await flush();

    expect(logged.mock.calls.some(([m]) => String(m).includes('Telegram'))).toBe(true);
  });

  it('says so when no job is registered', () => {
    expect(() => build({}, telegram).attach()).not.toThrow();
  });
});
