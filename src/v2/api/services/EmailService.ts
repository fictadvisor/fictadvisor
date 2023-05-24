import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { EmailOptionsData } from '../datas/EmailData';

@Injectable()
export class EmailService {
  constructor (private mailerService: MailerService) {}

  async sendEmail ({ to, subject, message, link }: EmailOptionsData) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: './template', // src/v2/email/templates/template.hbs
      context: {
        // filling curly brackets confirmation.hbs with content
        message,
        link,
      },
    });
  }
}
