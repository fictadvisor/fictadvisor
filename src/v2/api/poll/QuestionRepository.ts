import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import {CreateQuestionData} from "./dto/CreateQuestionDTO";
import {UpdateQuestionDTO} from "./dto/UpdateQuestionDTO";

@Injectable()
export class QuestionRepository {
    constructor(
        private prisma: PrismaService,
    ) {
    }

    async create(data: CreateQuestionData) {
        return this.prisma.question.create({
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.question.deleteMany({
            where: {
                id,
            },
        },);
    }

    async update(id: string, data: UpdateQuestionDTO) {
        return this.prisma.question.update({
            where: {
                id,
            },
            data,
        });
    }

    async getQuestion(id: string) {
         return await this.prisma.question.findUnique({
            where: {
                id,
            },
        });
    }
}