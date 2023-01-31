import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import {CreateUserData} from "./dto/CreateUserData";


@Injectable()
export class UserRepository {
    constructor(
        private prisma: PrismaService,
    ) {}

    async create(data: CreateUserData) {
        return this.prisma.user.create({
            data,
        });
    }

    async get(id: string){
        return this.prisma.user.findUnique({
            where:{
                id,
            },
            include:{
                student: true,
            },
        });
    }

    async updateByEmail(
      email: string,
      data: UpdateUserDTO,
    ) {
        return this.prisma.user.update({
            where:{
                email,
            },
            data,
        });
    }

    async deleteByEmail(
      email: string
    ) {
        return this.prisma.user.delete({
            where: {
                email,
            },
        });
    }
}

