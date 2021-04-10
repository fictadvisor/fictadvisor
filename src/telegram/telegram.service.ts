import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Review } from 'src/database/entities/review.entity';
import { Context, Telegraf } from 'telegraf';
import { Course } from 'src/database/entities/course.entity';
import { User } from 'src/database/entities/user.entity';
import { escape } from 'html-escaper';
import { Teacher } from 'src/database/entities/teacher.entity';

@Injectable()
export class TelegramService {
    private bot: Telegraf<Context>;

    constructor(
        private configService: ConfigService
    ) {
        this.bot = new Telegraf(configService.get<string>('telegram.botToken'));
    }

    private splitMessage(text: string, chunkSize: number = 2048): string[] {
        if (text.length <= chunkSize) {
            return [text];
        }
    
        const chunks = [];
        const chunksSize = Math.ceil(text.length / chunkSize)
    
        for (let i = 0; i < chunksSize; i++) {
            const start = i * chunkSize;
            const length = Math.min(chunkSize, text.length - start);
    
            chunks.push(text.substr(start, length));
        }
    
        return chunks;
    }

    async broadcastPendingReview(user: User, course: Course, review: Review) {
        const messageChunks = this.splitMessage(review.content);
        const chatId = this.configService.get<string>('telegram.chatId');

        let message = await this.bot.telegram.sendMessage(
            chatId,
            `<b>Відгук на <a href="${this.configService.get<string>('frontBaseUrl')}/courses/${course.link}">${course.link}</a>\n` +
            `Автор: ${user.firstName} (${user.id})\nОцінка: ${review.rating}</b>\n\n` +
            `<pre>${escape(messageChunks[0])}</pre>`,
            {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Схвалити', callback_data: `approve_review:${review.id}:${user.telegramId}` }],
                        [{ text: 'Відмовити', callback_data: `deny_review:${review.id}:${user.telegramId}` }],
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

    private getTeacherName(teacher: Teacher) {
        return `<a href="${this.configService.get<string>('frontBaseUrl')}/teachers/${teacher.link}">${teacher.getFullName()}</a>`;
    }

    async broadcastDeniedReview(user: User, teacher: Teacher) {
        await this.bot.telegram.sendMessage(
            user.telegramId,
            `<b>На жаль, твій відгук на ${this.getTeacherName(teacher)} було відхилено.</b>\n\n` +
            `Якщо в тебе є питання, звертайся до нас через бота зворотнього зв'язку: @fict_robot`,
            {
                parse_mode: 'HTML',
            }
        );
    }

    async broadcastApprovedReview(user: User, teacher: Teacher) {
        await this.bot.telegram.sendMessage(
            user.telegramId,
            `<b>Твій відгук на ${this.getTeacherName(teacher)} вже на сайті.</b>\n\n` +
            `Дякуємо за небайдужість!`,
            {
                parse_mode: 'HTML',
            }
        );
    }
}
