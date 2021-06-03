import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Review } from 'src/database/entities/review.entity';
import { Context, Telegraf } from 'telegraf';
import { Course } from 'src/database/entities/course.entity';
import { User } from 'src/database/entities/user.entity';
import { escape } from 'html-escaper';
import { Teacher } from 'src/database/entities/teacher.entity';
import { Superhero } from 'src/database/entities/superhero.entity';
import { Subject } from '../database/entities/subject.entity';
import { TeacherContact } from '../database/entities/teacher-contact.entity';
import { createHmac } from 'crypto';
import { writeFile as _writeFile } from 'fs';

import axios from 'axios';

const writeFile = (path: string, data: any) => new Promise<void>((resolve, reject) => _writeFile(path, data, {}, (err) => err ? reject(err) : resolve()));

@Injectable()
export class TelegramService {
  private bot: Telegraf<Context>;

  constructor(private configService: ConfigService) {
    this.bot = new Telegraf(configService.get<string>('telegram.botToken'));
  }

  private splitMessage(text: string, chunkSize = 2048): string[] {
    if (text.length <= chunkSize) {
      return [text];
    }

    const chunks = [];
    const chunksSize = Math.ceil(text.length / chunkSize);

    for (let i = 0; i < chunksSize; i++) {
      const start = i * chunkSize;
      const length = Math.min(chunkSize, text.length - start);

      chunks.push(text.substr(start, length));
    }

    return chunks;
  }

  private getImageKey(id: number) {
    return createHmac('sha256', this.configService.get<string>('security.secret'))
        .update(id.toString())
        .digest('hex');
  }

  public async saveUserPhoto(id: number, url: string) {
    try {
      const file = `images/${this.getImageKey(id)}.jpg`;
      const imagePath = `${this.configService.get<string>('static.dir')}/${file}`;
      const { data } = await axios.get(url.toString(), { responseType: 'arraybuffer' });

      await writeFile(imagePath, data);

      return `/cdn/${file}`;
    } catch (e) {
      return null;
    }
  }

  /**
   * @param superhero required relations: user
   */
  async broadcastPendingSuperhero(superhero: Superhero) {
    const chatId = this.configService.get<string>('telegram.chatId');
    const { user } = superhero;

    await this.bot.telegram.sendMessage(
      chatId,
      `<b>Заявка на супергероя</b>\n\n` +
        `<b>Від:</b> ${user.firstName} (${
          user.username ? `@${user.username}, ` : ''
        }${user.id})\n\n` +
        `<b>Ім'я:</b> ${escape(superhero.name)}\n` +
        `<b>Юзернейм:</b> @${escape(superhero.username)}\n` +
        `<b>Курс:</b> ${superhero.year}\n` +
        `<b>Гуртожиток:</b> ${superhero.dorm ? 'так' : 'ні'}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Схвалити',
                callback_data: `approve_superhero:${user.id}:${user.telegramId}`,
              },
            ],
            [
              {
                text: 'Відмовити',
                callback_data: `deny_superhero:${user.id}:${user.telegramId}`,
              },
            ],
          ],
        },
      }
    );
  }

  /**
   * @param superhero required relations: user
   */
  async broadcastApprovedSuperhero(superhero: Superhero) {
    await this.bot.telegram.sendMessage(
      superhero.user.telegramId,
      `<b>Вітаємо тебе, ти — супергерой!</b>`,
      {
        parse_mode: 'HTML',
      }
    );
  }

  /**
   * @param superhero required relations: user
   */
  async broadcastDeclinedSuperhero(superhero: Superhero) {
    await this.bot.telegram.sendMessage(
      superhero.user.telegramId,
      `<b>На жаль, твій запит на супергероя було відхилено.</b>\n\n` +
        `Якщо в тебе є питання, звертайся до нас через бота зворотнього зв'язку: @fict_robot`,
      {
        parse_mode: 'HTML',
      }
    );
  }

  async broadcastPendingReview(user: User, course: Course, review: Review) {
    const messageChunks = this.splitMessage(review.content);
    const chatId = this.configService.get<string>('telegram.chatId');

    let message = await this.bot.telegram.sendMessage(
      chatId,
      `<b>Відгук на <a href="${this.configService.get<string>(
        'frontBaseUrl'
      )}/courses/${course.link}">${course.link}</a>\n` +
        `Автор: ${user.firstName} (${user.id})\nОцінка: ${review.rating}</b>\n\n` +
        `<pre>${escape(messageChunks[0])}</pre>`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Схвалити',
                callback_data: `approve_review:${review.id}:${user.telegramId}`,
              },
            ],
            [
              {
                text: 'Відмовити',
                callback_data: `deny_review:${review.id}:${user.telegramId}`,
              },
            ],
          ],
        },
      }
    );

    if (messageChunks.length > 1) {
      for (let i = 1; i < messageChunks.length; i++) {
        message = await this.bot.telegram.sendMessage(
          chatId,
          `<pre>${escape(messageChunks[i])}</pre>`,
          {
            parse_mode: 'HTML',
            reply_to_message_id: message.message_id,
          }
        );
      }
    }
  }

  private getCourseTag(course: Course) {
    const teacher = `<a href="${this.configService.get<string>(
      'frontBaseUrl'
    )}/teachers/${course.teacher.link}">(${escape(
      course.teacher.getFullName()
    )})</a>`;
    const subject = `<a href="${this.configService.get<string>(
      'frontBaseUrl'
    )}/courses/${course.link}">${escape(course.subject.name)}</a>`;

    return `${subject} ${teacher}`;
  }

  /**
   * @param review required relations: user, course, course.teacher, course.subject
   */
  async broadcastDeclinedReview(review: Review) {
    const { user, course } = review;

    await this.bot.telegram.sendMessage(
      user.telegramId,
      `<b>На жаль, твій відгук на (${this.getCourseTag(
        course
      )}) було відхилено.</b>\n\n` +
        `Якщо в тебе є питання, звертайся до нас через бота зворотнього зв'язку: @fict_robot`,
      {
        parse_mode: 'HTML',
      }
    );
  }

  /**
   * @param review required relations: user, course, course.teacher, course.subject
   */
  async broadcastApprovedReview(review: Review) {
    await this.bot.telegram.sendMessage(
      review.user.telegramId,
      `<b>Твій відгук на ${this.getCourseTag(
        review.course
      )} вже на сайті.</b>\n\n` + `Дякуємо за небайдужість!`,
      {
        parse_mode: 'HTML',
      }
    );
  }

  async broadcastPendingTeacher(user: User, teacher: Teacher) {
    const chatId = this.configService.get<string>('telegram.chatId');

    await this.bot.telegram.sendMessage(
      chatId,
      `<b>Заявка на додавання викладача</b>\n\n` +
        `<b><a href="${this.configService.get<string>(
          'frontBaseUrl'
        )}/teachers/${teacher.link}">${teacher.getFullName()}</a></b> (${
          teacher.id
        })\n` +
        `<b>Автор</b>: ${user.firstName}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Схвалити',
                callback_data: `approve_teacher:${teacher.id}:${user.telegramId}`,
              },
            ],
            [
              {
                text: 'Відмовити',
                callback_data: `deny_teacher:${teacher.id}:${user.telegramId}`,
              },
            ],
          ],
        },
      }
    );
  }

  async broadcastPendingCourse(user: User, course: Course) {
    const chatId = this.configService.get<string>('telegram.chatId');

    await this.bot.telegram.sendMessage(
      chatId,
      `<b>Заявка на додавання курсу</b>\n\n` +
        `<b><a href="${this.configService.get<string>(
          'frontBaseUrl'
        )}/courses/${course.link}">${
          course.subject.name
        }</a></b> (${course.teacher.getFullName()})\n` +
        `<b>Автор</b>: ${user?.firstName}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Схвалити',
                callback_data: `approve_course:${course.id}:${user?.telegramId}`,
              },
            ],
            [
              {
                text: 'Відмовити',
                callback_data: `deny_course:${course.id}:${user?.telegramId}`,
              },
            ],
          ],
        },
      }
    );
  }

  async broadcastPendingSubject(user: User, subject: Subject) {
    const chatId = this.configService.get<string>('telegram.chatId');

    await this.bot.telegram.sendMessage(
      chatId,
      `<b>Заявка на додавання предмету</b>\n\n` +
        `<b><a href="${this.configService.get<string>(
          'frontBaseUrl'
        )}/courses/${subject.link}">${subject.name}</a></b>\n\n` +
        `<b>Автор</b>: ${user?.firstName}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Схвалити',
                callback_data: `approve_subject:${subject.id}:${user?.telegramId}`,
              },
            ],
            [
              {
                text: 'Відмовити',
                callback_data: `deny_subject:${subject.id}:${user?.telegramId}`,
              },
            ],
          ],
        },
      }
    );
  }

  async broadcastPendingTeacherContact(
    user: User,
    teacher: Teacher,
    contact: TeacherContact
  ) {
    const chatId = this.configService.get<string>('telegram.chatId');

    await this.bot.telegram.sendMessage(
      chatId,
      `<b>Заявка на додавання контакту викладача</b>\n\n` +
        `<b>Викладач: </b><a href="${this.configService.get<string>(
          'frontBaseUrl'
        )}/teachers/${teacher.link}">${teacher.getFullName()}</a>\n` +
        `<b>${contact.name}:</b> ${contact.value}\n` +
        `\n<b>Автор</b>: ${user?.firstName}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Схвалити',
                callback_data: `approve_contact:${contact.id}:${user?.telegramId}`,
              },
            ],
            [
              {
                text: 'Відмовити',
                callback_data: `deny_contact:${contact.id}:${user?.telegramId}`,
              },
            ],
          ],
        },
      }
    );
  }
}
