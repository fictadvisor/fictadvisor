import { Injectable } from "@nestjs/common";
import { State } from "@prisma/client";
import { PrismaService } from "src/v2/database/PrismaService";

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async verificate(email: string){
    await this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          state: State.APPROVED,
        },
      });
  }

  async deleteByEmail(email: string){
    this.prisma.user.delete({
        where: {
          email: email,
        },
      });
  }
}