import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './EmailService';
import { join } from 'path';

console.log(__dirname, join(__dirname, 'src/v2/email/templates'));

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'fictadvisor@gmail.com',
          pass: 'vmmennbumbzodlzt',
        },
      },
      defaults: {
        from: '"FictAdvisor" <noreply@fictadvisor.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], // export for DI
})
export class EmailModule {}
