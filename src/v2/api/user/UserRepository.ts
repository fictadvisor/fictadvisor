import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import {EmailDTO} from "../group/dto/EmailDTO";
import {State} from "@prisma/client";


@Injectable()
export class UserRepository {
    constructor(
        private prisma: PrismaService,
    ) {}

    async addUnregistered(groupId: string, body: EmailDTO) {
        for (const email of body.emails) {
            await this.prisma.user.create({
                data: {
                    email: email,
                    student: {
                        create: {
                            groupId: groupId,
                            state: State.APPROVED,
                        },
                    },
                },
            });
        }
        return;
    }

    async getByEmail(email: string){
        return await this.prisma.user.findUnique({
            where:{
                email,
            },
            include:{
                student: true,
            },
        });
    }

    async get(id: string){
        return await this.prisma.user.findUnique({
            where:{
                id,
            },
            include:{
                student: true,
            },
        });
    }
}

