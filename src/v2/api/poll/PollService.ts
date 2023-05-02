import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionWithRolesDTO } from './dto/CreateQuestionWithRolesDTO';
import { QuestionRepository } from './QuestionRepository';
import { UpdateQuestionDTO } from './dto/UpdateQuestionDTO';
import { TeacherRole } from '@prisma/client';
import { CreateQuestionRoleDTO } from './dto/CreateQuestionRoleDTO';
import { StudentRepository } from '../user/StudentRepository';
import { DisciplineService } from '../discipline/DisciplineService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { DisciplineMapper } from '../discipline/DisciplineMapper';
import { DbQuestion } from '../teacher/DbQuestion';

@Injectable()
export class PollService {
  constructor (
    @Inject(forwardRef(() => DisciplineService))
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private disciplineMapper: DisciplineMapper,
    private studentRepository: StudentRepository,
    private questionRepository: QuestionRepository,
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
    return this.questionRepository.deleteRole(questionId, role);
  }

  sortByCategories (questions: DbQuestion[]) {
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
    const disciplines = await this.disciplineRepository.findMany({
      where: {
        group: {
          students: {
            some: {
              userId,
            },
          },
        },
      },
    });

    const answers = await this.studentRepository.getAnswers(userId);
    const disciplinesWithTeachers = this.disciplineMapper.getDisciplinesWithTeachers(disciplines);
    const teachers = [];

    for (const disciplineWithTeachers of disciplinesWithTeachers) {
      for (const teacher of disciplineWithTeachers.teachers) {
        if (!answers.some((answer) => teacher.disciplineTeacherId === answer.disciplineTeacherId)) {
          teachers.push({
            disciplineTeacherId: teacher.disciplineTeacherId,
            roles: teacher.roles,
            firstName: teacher.firstName,
            middleName: teacher.middleName,
            lastName: teacher.lastName,
            avatar: teacher.avatar,
            subject: disciplineWithTeachers.subject,
          });
        }
      }
    }
    return teachers;
  }
}
