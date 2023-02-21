import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateQuestionWithRolesDTO } from './dto/CreateQuestionDTO';
import { QuestionRepository } from './QuestionRepository';
import { UpdateQuestionDTO } from './dto/UpdateQuestionDTO';
import { Question, TeacherRole } from '@prisma/client';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { DisciplineTeacherRepository } from '../teacher/DisciplineTeacherRepository';
import { CreateQuestionRoleDTO } from './dto/CreateQuestionRoleDTO';
import { StudentRepository } from '../user/StudentRepository';
import { QuestionAnswerRepository } from './QuestionAnswerRepository';

@Injectable()
export class PollService {
  constructor (
    private prisma: PrismaService,
    private questionAnswerRepository: QuestionAnswerRepository,
    private studentRepository: StudentRepository,
    private questionRepository: QuestionRepository,

    private disciplineRepository: DisciplineRepository,
    @Inject(forwardRef(() => DisciplineTeacherRepository))
    private disciplineTeacherRepository: DisciplineTeacherRepository,
  ) {}

  async createQuestions (data: CreateQuestionWithRolesDTO) {
    return this.questionRepository.createWithRoles(data);
  }

  async delete (id: string) {
    await this.questionRepository.delete(id);
  }

  async update (id: string, body: UpdateQuestionDTO) {
    return this.questionRepository.update(id, body);
  }

  async getQuestion (id: string) {
    return await this.questionRepository.getQuestion(id);
  }

  async giveRole (body: CreateQuestionRoleDTO, questionId: string) {
    return await this.questionRepository.connectRole(questionId, body);
  }

  async deleteRole (questionId: string, role: TeacherRole) {
    return await this.questionRepository.deleteRole(questionId, role);
  }

  sortByCategories (questions: Question[]) {
    const results = [];
    for (const question of questions) {
      const name = question.category;
      delete question.category;
      const category = results.find((c) => (c.name === name));
      if (!category) {
        results.push({
          name: name,
          count: 1,
          questions: [question],
        });
      } else {
        category.count++;
        category.questions.push(question);
      }
    }
    return results;
  }
  async getDisciplineTeachers (userId: string) {
    const disciplines = await this.studentRepository.getDisciplines(userId);
    const answers = await this.studentRepository.getAnswers(userId);
    const teachers = [];

    for (const discipline of disciplines) {
      for (const disciplineTeacher of discipline.disciplineTeachers) {
        if (answers.some((answer) => disciplineTeacher.id !== answer.disciplineTeacherId)) {
          teachers.push({
            disciplineTeacherId: disciplineTeacher.id,
            roles: disciplineTeacher.roles,
            firstName: disciplineTeacher.teacher.firstName,
            middleName: disciplineTeacher.teacher.middleName,
            lastName: disciplineTeacher.teacher.lastName,
            avatar: disciplineTeacher.teacher.avatar,
            subject: discipline.subject,
          });
        }
      }
    }
    return {
      teachers,
    };

  }
}
