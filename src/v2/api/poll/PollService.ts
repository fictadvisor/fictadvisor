import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionWithRolesDTO } from './dto/CreateQuestionWithRolesDTO';
import { QuestionRepository } from './QuestionRepository';
import { QuestionType, State, TeacherRole } from '@prisma/client';
import { StudentRepository } from '../user/StudentRepository';
import { DisciplineService } from '../discipline/DisciplineService';
import { UpdateQuestionWithRolesDTO } from './dto/UpdateQuestionWithRolesDTO';
import { MarksData } from '../teacher/data/MarksData';
import { CreateQuestionRoleDTO } from './dto/CreateQuestionRoleDTO';
import { DbQuestionWithAnswers } from './DbQuestionWithAnswers';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { UserRepository } from '../user/UserRepository';
import { DisciplineMapper } from '../discipline/DisciplineMapper';
import { DateService } from '../../utils/date/DateService';
import { DisciplineRepository } from '../discipline/DisciplineRepository';
import { DbQuestionWithRoles } from './DbQuestionWithRoles';
import { QuestionAnswerRepository } from './QuestionAnswerRepository';

@Injectable()
export class PollService {
  constructor (
    @Inject(forwardRef(() => DisciplineService))
    private disciplineService: DisciplineService,
    private studentRepository: StudentRepository,
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository,
    private disciplineMapper: DisciplineMapper,
    private dateService: DateService,
    private disciplineRepository: DisciplineRepository,
    private questionAnswerRepository: QuestionAnswerRepository,
  ) {}

  async create ({ roles, ...data }: CreateQuestionWithRolesDTO) {
    return this.questionRepository.create({
      ...data,
      questionRoles: {
        create: roles,
      },
    });
  }

  async deleteById (id: string) {
    return  this.questionRepository.deleteById(id);
  }

  async updateById (id: string, { roles, ...data }: UpdateQuestionWithRolesDTO) {
    const questionRoles = roles ? {
      deleteMany: {},
      create: roles,
    } : {};
    return this.questionRepository.updateById(id, {
      ...data,
      questionRoles,
    });

  }

  async getQuestions (roles: TeacherRole[], disciplineRoles: TeacherRole[]) {
    return this.questionRepository.findMany({
      where: {
        questionRoles: {
          some: {
            isShown: true,
            role: {
              in: roles,
            },
          },
          none: {
            isRequired: true,
            role: {
              notIn: disciplineRoles,
            },
          },
        },
      },
    }) as unknown as Promise<DbQuestionWithRoles[]>;
  }

  async getQuestionWithMarks (teacherId: string, data?: MarksData): Promise<DbQuestionWithAnswers[]> {
    return await this.questionRepository.findMany({
      where: {
        OR: [{
          type: QuestionType.TOGGLE,
        }, {
          type: QuestionType.SCALE,
        }],
      },
      include: {
        questionAnswers: {
          where: {
            disciplineTeacher: {
              teacherId,
              discipline: {
                ...data,
              },
            },
          },
        },
      },
    }) as unknown as Promise<DbQuestionWithAnswers[]>;
  }

  async getQuestionById (id: string) {
    return this.questionRepository.findById(id);
  }

  async giveRole (data: CreateQuestionRoleDTO, questionId: string) {
    return await this.questionRepository.updateById(questionId, {
      questionRoles: {
        create: {
          ...data,
        },
      },
    });
  }

  async deleteRole (questionId: string, role: TeacherRole) {
    return this.questionRepository.updateById(questionId, {
      questionRoles: {
        delete: {
          questionId_role: {
            questionId: questionId,
            role: role,
          },
        },
      },
    });
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

    const answers = await this.questionAnswerRepository.findMany({ where: { userId } });

    for (const discipline of disciplines) {
      discipline.disciplineTeachers = discipline.disciplineTeachers.filter((teacher) => {
        const hasAnyAnswer = (answer) => teacher.id === answer.disciplineTeacherId;
        return !answers.some(hasAnyAnswer);
      });
    }

    return this.disciplineMapper.getDisciplineTeachers(disciplines);
  }
}
