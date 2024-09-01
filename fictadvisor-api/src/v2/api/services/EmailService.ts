import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { EmailOptionsData } from '../datas/EmailData';
import { compile } from 'handlebars';

@Injectable()
export class EmailService {
  constructor (private mailerService: MailerService) {}

  TEMPLATE_URL = 'https://firebasestorage.googleapis.com/v0/b/test-2cfd4.appspot.com/o/template.hbs?alt=media&token=94a42785-3da6-4817-b395-5ca84899c359';

  async fetchTemplate(url) {
    const templateFile = await (await fetch(url)).text();
    return compile(templateFile);
  }

  async sendEmail ({ to, subject, message, link }: EmailOptionsData) {
    const template = await this.fetchTemplate(this.TEMPLATE_URL);
    const emailHtml = template({ message, link });
    await this.mailerService.sendMail({
      to,
      subject,
      html: emailHtml,
      /*template: resolve('./email/templates/template.hbs'), // src/v2/email/templates/template.hbs
      context: {
        // filling curly brackets confirmation.hbs with content
        message,
        link,
      },*/
    });
  }

  async sendWithAttachments ({ to, subject, message, link, attachments }: EmailOptionsData) {
    const template = await this.fetchTemplate(this.TEMPLATE_URL);
    const emailHtml = template({ message, link });
    await this.mailerService.sendMail({
      to,
      subject,
      html: emailHtml,
      /*template: resolve('./email/templates/template.hbs'),
      context: {
        message,
        link,
      },*/
      attachments: attachments.map(({ name, buffer, contentType }) => ({
        filename: name,
        content: buffer,
        contentType,
      })),
    });
  }
}
