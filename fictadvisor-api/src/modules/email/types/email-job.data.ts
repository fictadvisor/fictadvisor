// What actually travels through Redis. It mirrors EmailOptionsData except for
// the attachments: BullMQ serializes job data with JSON.stringify, which turns a
// Buffer into `{ type: 'Buffer', data: [...] }` and would hand nodemailer a
// broken body on the way out. Base64 survives the round trip intact.
export interface EmailJobAttachmentData {
  name: string;
  contentType: string;
  content: string;
}

export interface EmailJobData {
  to: string | string[];
  subject: string;
  message?: string;
  link?: string;
  attachments?: EmailJobAttachmentData[];
}
