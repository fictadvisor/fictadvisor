import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { CreateAnswersDTO } from "../teacher/dto/CreateAnswersDTO";
import { CreateAnswerData } from "./dto/CreateAnswerData";

@Injectable()
export class QuestionAnswerRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateAnswerData) {
    return this.prisma.questionAnswer.create({
      data,
    });
  }

  find(where: Omit<CreateAnswerData, "value">) {
    return this.prisma.questionAnswer.findFirst({
      where,
    });
  }
}