import { EmailQueueService } from '../../src/modules/email/email-queue.service';
import { fromEmailJob, toEmailJob } from '../../src/modules/email/email-job.mapper';
import { SEND_EMAIL_JOB } from '../../src/modules/email/email.constants';
import { EmailOptionsData } from '../../src/modules/email/types/email-options.data';

const options = (): EmailOptionsData => ({
  to: 'student@example.com',
  subject: 'Верифікація пошти на fictadvisor.com',
  message: 'Для верифікації пошти натисни на кнопку нижче.',
  link: 'https://fictadvisor.com/register/email-verification/token',
  attachments: [{
    name: 'report.csv',
    contentType: 'text/csv',
    buffer: Buffer.from('id,name\n1,Ivan'),
  }],
});

// BullMQ stores job data as JSON, so anything that does not survive
// JSON.parse(JSON.stringify(...)) reaches the worker corrupted.
const throughRedis = <T> (data: T): T => JSON.parse(JSON.stringify(data));

describe('email job mapper', () => {
  it('brings an attachment back as the same Buffer', () => {
    const original = options();

    const restored = fromEmailJob(throughRedis(toEmailJob(original)));

    const attachment = restored.attachments[0];
    expect(Buffer.isBuffer(attachment.buffer)).toBe(true);
    expect(attachment.buffer.equals(original.attachments[0].buffer)).toBe(true);
    expect(attachment.name).toBe('report.csv');
    expect(attachment.contentType).toBe('text/csv');
  });

  it('keeps the fields the template renders', () => {
    const { to, subject, message, link } = fromEmailJob(throughRedis(toEmailJob(options())));

    expect({ to, subject, message, link }).toEqual({
      to: 'student@example.com',
      subject: 'Верифікація пошти на fictadvisor.com',
      message: 'Для верифікації пошти натисни на кнопку нижче.',
      link: 'https://fictadvisor.com/register/email-verification/token',
    });
  });

  // The reason the mapper exists at all: a Buffer put through JSON on its own
  // arrives as { type: 'Buffer', data: [...] }, which nodemailer would attach
  // as a broken body rather than the file.
  it('is needed because a raw Buffer does not survive the trip', () => {
    const raw = throughRedis(options());

    expect(Buffer.isBuffer(raw.attachments[0].buffer)).toBe(false);
  });

  it('leaves an email with no attachments alone', () => {
    const { attachments } = fromEmailJob(throughRedis(toEmailJob({
      to: 'student@example.com',
      subject: 'Відновлення пароля',
    })));

    expect(attachments).toBeUndefined();
  });
});

describe('EmailQueueService', () => {
  const emailService = () => ({ sendEmail: jest.fn().mockResolvedValue(undefined) });

  it('queues the send instead of waiting on SMTP', async () => {
    const email = emailService();
    const queue = { add: jest.fn().mockResolvedValue({ id: '1' }) };

    await new EmailQueueService(email as any, queue as any).sendEmail(options());

    expect(queue.add).toHaveBeenCalledTimes(1);
    const [jobName, data] = queue.add.mock.calls[0];
    expect(jobName).toBe(SEND_EMAIL_JOB);
    expect(data.attachments[0].content).toBe(Buffer.from('id,name\n1,Ivan').toString('base64'));
    expect(email.sendEmail).not.toHaveBeenCalled();
  });

  // No REDIS_URL means no queue is registered at all — unit and integration runs
  // and local `start:dev` all take this path, and must keep sending emails.
  it('sends inline when there is no queue', async () => {
    const email = emailService();

    await new EmailQueueService(email as any, undefined).sendEmail(options());

    expect(email.sendEmail).toHaveBeenCalledWith(options());
  });

  // Losing a password reset because Redis blinked would be worse than making the
  // caller wait for the SMTP handshake it used to wait for anyway.
  it('falls back to sending inline when the queue rejects the job', async () => {
    const email = emailService();
    const queue = { add: jest.fn().mockRejectedValue(new Error('connection refused')) };

    await new EmailQueueService(email as any, queue as any).sendEmail(options());

    expect(email.sendEmail).toHaveBeenCalledWith(options());
  });
});
