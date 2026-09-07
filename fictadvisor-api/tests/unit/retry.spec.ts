import { retry } from '../../src/common/utils/retry.util';

const immediately = { attempts: 5, delayMs: () => 0 };

describe('retry', () => {
  it('returns the first success without waiting', async () => {
    const work = jest.fn().mockResolvedValue('ok');

    await expect(retry(work, immediately)).resolves.toBe('ok');
    expect(work).toHaveBeenCalledTimes(1);
  });

  it('keeps going until the work stops throwing', async () => {
    const work = jest.fn()
      .mockRejectedValueOnce(new Error('not yet'))
      .mockRejectedValueOnce(new Error('still not'))
      .mockResolvedValue('ok');

    await expect(retry(work, immediately)).resolves.toBe('ok');
    expect(work).toHaveBeenCalledTimes(3);
  });

  it('rethrows the last failure once the attempts run out', async () => {
    const work = jest.fn()
      .mockRejectedValueOnce(new Error('first'))
      .mockRejectedValue(new Error('last'));

    await expect(retry(work, { attempts: 3, delayMs: () => 0 })).rejects.toThrow('last');
    expect(work).toHaveBeenCalledTimes(3);
  });

  it('runs the work once when only one attempt is allowed', async () => {
    const work = jest.fn().mockRejectedValue(new Error('nope'));

    await expect(retry(work, { attempts: 1, delayMs: () => 0 })).rejects.toThrow('nope');
    expect(work).toHaveBeenCalledTimes(1);
  });

  it('reports every retry with the attempt it just lost and the wait it chose', async () => {
    const seen: Array<[string, number, number]> = [];
    const work = jest.fn()
      .mockRejectedValueOnce(new Error('one'))
      .mockRejectedValueOnce(new Error('two'))
      .mockResolvedValue('ok');

    await retry(work, {
      attempts: 5,
      delayMs: (attempt) => attempt * 10,
      onRetry: (error, attempt, delay) => seen.push([(error as Error).message, attempt, delay]),
    });

    expect(seen).toEqual([['one', 1, 10], ['two', 2, 20]]);
  });
});
