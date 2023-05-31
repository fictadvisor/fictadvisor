import { Injectable } from '@nestjs/common';
import { DbQuestionWithRoles } from '../database/entities/DbQuestionWithRoles';
import { QuestionRole } from '@prisma/client';
import { DbQuestionWithDiscipline } from '../database/entities/DbQuestionWithDiscipline';


@Injectable()
export class QuestionMapper {
  private getQuestion (question: DbQuestionWithRoles) {
    return {
      id: question.id,
      category: question.category,
      name: question.name,
      description: question.description,
      text: question.text,
      isRequired: question.isRequired,
      criteria: question.criteria,
      type: question.type,
      display: question.display,
    };
  }

  sortByCategories (questions: DbQuestionWithRoles[]) {
    const results = [];
    for (const q of questions) {
      const question = this.getQuestion(q);
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

  private getRoles (roles: QuestionRole[]) {
    return roles.map((r) => ({
      role: r.role,
      isShown: r.isShown,
      isRequired: r.isRequired,
    }));
  }

  getQuestionWithRoles (question: DbQuestionWithRoles) {
    return {
      id: question.id,
      category: question.category,
      name: question.name,
      order: question.order,
      description: question.description,
      text: question.text,
      isRequired: question.isRequired,
      criteria: question.criteria,
      type: question.type,
      display: question.display,
      questionRoles: this.getRoles(question.questionRoles),
    };
  }

  getQuestionWithResponses (questions: DbQuestionWithDiscipline[]) {
    const responses = {
      questions: [],
    };
    for (const question of questions) {
      if (question.questionAnswers.length === 0) continue;
      responses.questions.push({
        name: question.name,
        amount: question.questionAnswers.length,
        comments: [],
      });
      for (const answer of question.questionAnswers) {
        responses.questions.at(-1).comments.push({
          discipline: answer.disciplineTeacher.discipline.subject.name,
          semester: answer.disciplineTeacher.discipline.semester,
          year: answer.disciplineTeacher.discipline.year,
          comment: answer.value,
        });
      }
    }
    return responses;
  }
}
