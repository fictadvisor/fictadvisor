import { EmailOptionsData } from './types/email-options.data';
import { EmailJobData } from './types/email-job.data';

// The two halves of the Buffer <-> base64 conversion described in EmailJobData.
// They live together so a change to one is impossible to make without seeing
// the other.
export function toEmailJob ({ to, subject, message, link, attachments }: EmailOptionsData): EmailJobData {
  return {
    to,
    subject,
    message,
    link,
    attachments: attachments?.map(({ name, contentType, buffer }) => ({
      name,
      contentType,
      content: buffer.toString('base64'),
    })),
  };
}

export function fromEmailJob ({ to, subject, message, link, attachments }: EmailJobData): EmailOptionsData {
  return {
    to,
    subject,
    message,
    link,
    attachments: attachments?.map(({ name, contentType, content }) => ({
      name,
      contentType,
      buffer: Buffer.from(content, 'base64'),
    })),
  };
}
