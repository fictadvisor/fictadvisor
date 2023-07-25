class AttachmentData {
  name: string;
  contentType: string;
  buffer: ArrayBuffer;
}

export class EmailOptionsData {
  to: string | string[];
  link?: string;
  subject: string;
  message?: string;
  attachments?: AttachmentData[];
}
