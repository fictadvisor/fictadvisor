import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Review } from 'src/database/entities/review.entity';
import { Context, Telegraf } from 'telegraf';
import escape from 'escape-html';
import { Course } from 'src/database/entities/course.entity';

@Injectable()
export class TelegramService {
    private bot: Telegraf<Context>;

    constructor(
        private configService: ConfigService
    ) {
        this.bot = new Telegraf(configService.get<string>('telegram.botToken'));
    }

    async broadcastPendingReview(course: Course, review: Review) {
        this.bot.telegram.sendMessage(
            this.configService.get<string>('telegram.chatId'),
            `<b>Відгук на ${course}</b>`
        );
    }
}
