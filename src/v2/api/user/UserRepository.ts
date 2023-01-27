import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/v2/database/PrismaService";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async updateByEmail(
    email: string,
    data: UpdateUserDTO,
  ) {
    return await this.prisma.user.update({
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