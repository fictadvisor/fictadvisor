import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { State, TeacherRole } from '@prisma/client';
import { CreateQuestionWithRolesDTO } from './dto/CreateQuestionWithRolesDTO';
import { UpdateQuestionDTO } from './dto/UpdateQuestionDTO';
import { CreateQuestionRoleDTO } from './dto/CreateQuestionRoleDTO';
import { QuestionRepository } from './QuestionRepository';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { StudentRepository } from '../user/StudentRepository';
import { UserRepository } from '../user/UserRepository';
import { DisciplineService } from '../discipline/DisciplineService';
import { DateService } from '../../utils/date/DateService';
import { DisciplineMapper } from '../discipline/DisciplineMapper';
import { DbQuestion } from '../teacher/DbQuestion';
import { NoPermissionException } from 'src/v2/utils/exceptions/NoPermissionException';

@Injectable()
export class PollService {
  constructor (
    @Inject(forwardRef(() => DisciplineService))
    private disciplineService: DisciplineService,
    private disciplineRepository: DisciplineRepository,
    private disciplineMapper: DisciplineMapper,
    private studentRepository: StudentRepository,
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository,
    private dateService: DateService,
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
    const user = await this.userRepository.findById(userId);
    if (user.state !== State.APPROVED) {
      throw new NoPermissionException();
    }

    let disciplines = await this.disciplineRepository.findMany({
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

    const { semester, year } = await this.dateService.getCurrentSemester();

    disciplines = disciplines.filter((discipline) => {
      return this.dateService.earlierSemester(
        { semester, year },
        { semester: discipline.semester, year: discipline.year }
      );
    });

    const answers = await this.studentRepository.getAnswers(userId);

    for (const discipline of disciplines) {
      discipline.disciplineTeachers = discipline.disciplineTeachers.filter((teacher) => {
        const hasAnyAnswer = (answer) => teacher.id === answer.disciplineTeacherId;
        return answers.some(hasAnyAnswer);
      });
    }

    return this.disciplineMapper.getDisciplineTeachers(disciplines);
  }
}
