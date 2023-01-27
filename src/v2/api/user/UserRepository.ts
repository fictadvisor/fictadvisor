import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/v2/database/PrismaService";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
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