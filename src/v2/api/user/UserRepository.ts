import { PrismaService } from '../../database/PrismaService';
import {Injectable} from "@nestjs/common";
@Injectable()
export class UserRepository{
    constructor(
        private prisma: PrismaService,
    ) {}
    async get(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                avatar: true,
                username: true,
            },
        });
    }
}