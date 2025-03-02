import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { EmailOptionsData } from './types/EmailOptionsData';

@Injectable()
export class EmailService {
  constructor (private mailerService: MailerService) {}

  async sendEmail ({ to, subject, message, link, attachments }: EmailOptionsData) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: resolve('./email/templates/template.hbs'),
      context: {
        message,
        link,
      },
      attachments: attachments?.map(({ name, buffer, contentType }) => ({
        filename: name,
        content: buffer,
        contentType,
      })),
    });
  }
}
