import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import path from 'path';

import { EmailOptionsData } from '../datas/EmailData';

@Injectable()
export class EmailService {
  constructor (private mailerService: MailerService) {}

  async sendEmail ({ to, subject, message, link }: EmailOptionsData) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: path.resolve('./email/templates/template.hbs'), // src/v2/email/templates/template.hbs
      context: {
        // filling curly brackets confirmation.hbs with content
        message,
        link,
      },
    });
  }
}
