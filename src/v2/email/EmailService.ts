import { Injectable } from '@nestjs/common';
import { EmailConfigService } from '../config/EmailConfigService';

import { EmailOptions } from './dto/EmailDTO';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private emailConfig: EmailConfigService;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: this.emailConfig.host,
      port: this.emailConfig.port,
      service: 'gmail',
      secure: true,
      auth: {
        user: this.emailConfig.username,
        pass: this.emailConfig.password,
      },
    });
  }

  async sendEmail({ to, link, subject, message }: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.emailConfig.username,
        to,
        subject,
        text: message,
        html: `<a href="${link}">${link}</a>`,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
