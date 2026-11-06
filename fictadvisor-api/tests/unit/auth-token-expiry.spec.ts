import { AuthService, TOKEN_TTL } from '../../src/modules/auth/v2/auth.service';
import { InvalidResetTokenException } from '../../src/common/exceptions/invalid-reset-token.exception';
import { InvalidVerificationTokenException } from '../../src/common/exceptions/invalid-verification-token.exception';

/**
 * Password reset, email verification and Telegram registration links are good for
 * TOKEN_TTL. Expiry used to rest entirely on an in-process `setTimeout` that deleted
 * the row an hour later; every deploy killed it, nothing else checked the age, and
 * prod had reset tokens from 2023 that still reset the password.
 */

type Row = { token: string, createdAt: Date, [key: string]: unknown };

// Enough of a Prisma delegate to honour the `token` and `createdAt` filters the
// service sends, so the tests check what the database would actually return.
const table = (rows: Row[]) => {
  const matches = (row: Row, where: any = {}) =>
    (where.token === undefined || row.token === where.token) &&
    (where.createdAt?.gte === undefined || row.createdAt >= where.createdAt.gte) &&
    (where.createdAt?.lt === undefined || row.createdAt < where.createdAt.lt);

  return {
    rows,
    findFirst: jest.fn(async ({ where }) => rows.find((row) => matches(row, where)) ?? null),
    delete: jest.fn(async ({ where }) => {
      const index = rows.findIndex((row) => row.token === where.token);
      return rows.splice(index, 1)[0];
    }),
    deleteMany: jest.fn(async ({ where }) => {
      const doomed = rows.filter((row) => matches(row, where));
      doomed.forEach((row) => rows.splice(rows.indexOf(row), 1));
      return { count: doomed.length };
    }),
    create: jest.fn(async ({ data }) => {
      const row = { token: `new-${rows.length}`, createdAt: new Date(), ...data };
      rows.push(row);
      return row;
    }),
  };
};

const ago = (ms: number) => new Date(Date.now() - ms);
const MINUTE = 60 * 1000;

const setup = () => {
  const prisma = {
    resetPasswordToken: table([
      { token: 'fresh', email: 'fresh@example.com', createdAt: ago(10 * MINUTE) },
      { token: 'stale', email: 'stale@example.com', createdAt: ago(TOKEN_TTL + MINUTE) },
      { token: 'ancient', email: 'old@example.com', createdAt: new Date('2023-11-20') },
    ]),
    verifyEmailToken: table([
      { token: 'fresh', email: 'fresh@example.com', createdAt: ago(10 * MINUTE) },
      { token: 'stale', email: 'stale@example.com', createdAt: ago(TOKEN_TTL + MINUTE) },
    ]),
    registerTelegramToken: table([
      { token: 'fresh', telegramId: 1n, createdAt: ago(10 * MINUTE) },
      { token: 'stale', telegramId: 2n, createdAt: ago(TOKEN_TTL + MINUTE) },
    ]),
  };
  const userRepository = {
    update: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({ id: 'user', email: 'fresh@example.com', password: 'hash' }),
  };
  const emailQueue = { sendEmail: jest.fn().mockResolvedValue(undefined) };
  const config = { get: jest.fn().mockReturnValue('https://ficeadvisor.com') };

  const service = new AuthService(
    {} as any, {} as any, {} as any, {} as any,
    emailQueue as any, userRepository as any, {} as any, {} as any,
    {} as any, {} as any, config as any, prisma as any,
  );

  return { service, prisma, userRepository, emailQueue };
};

describe('auth token expiry', () => {
  describe('resetPassword', () => {
    it('resets the password with a fresh token and consumes it', async () => {
      const { service, prisma, userRepository } = setup();

      await service.resetPassword('fresh', { password: 'NewPassw0rd' });

      expect(userRepository.update).toHaveBeenCalledTimes(1);
      expect(prisma.resetPasswordToken.rows.map((r) => r.token)).not.toContain('fresh');
    });

    it.each(['stale', 'ancient'])('refuses a %s token and leaves the password alone', async (token) => {
      const { service, userRepository } = setup();

      await expect(service.resetPassword(token, { password: 'NewPassw0rd' }))
        .rejects.toBeInstanceOf(InvalidResetTokenException);
      expect(userRepository.update).not.toHaveBeenCalled();
    });
  });

  it('reports only a fresh reset token as available', async () => {
    const { service } = setup();

    expect(await service.checkResetToken('fresh')).not.toBeNull();
    expect(await service.checkResetToken('stale')).toBeNull();
  });

  it('refuses to verify an email with an expired token', async () => {
    const { service } = setup();

    await expect(service.verifyEmail('stale'))
      .rejects.toBeInstanceOf(InvalidVerificationTokenException);
  });

  it('reports a Telegram registration as pending only while its token is fresh', async () => {
    const { service } = setup();

    expect(await service.checkTelegram('fresh')).not.toBeNull();
    expect(await service.checkTelegram('stale')).toBeNull();
  });

  it('deletes every expired token and keeps the fresh ones', async () => {
    const { service, prisma } = setup();

    await service.deleteExpiredTokens();

    expect(prisma.resetPasswordToken.rows.map((r) => r.token)).toEqual(['fresh']);
    expect(prisma.verifyEmailToken.rows.map((r) => r.token)).toEqual(['fresh']);
    expect(prisma.registerTelegramToken.rows.map((r) => r.token)).toEqual(['fresh']);
  });

  it('no longer leaves an hour-long timer behind when a reset is requested', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate', 'queueMicrotask'] });
    try {
      const { service, emailQueue } = setup();

      await service.forgotPassword('new@example.com');

      expect(emailQueue.sendEmail).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    } finally {
      jest.useRealTimers();
    }
  });
});
