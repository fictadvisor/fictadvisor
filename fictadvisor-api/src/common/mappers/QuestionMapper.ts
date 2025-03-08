import { Injectable } from '@nestjs/common';
import { QuestionRole } from '@prisma/client/fictadvisor';
import { QuestionCommentData } from '../../modules/poll/v2/types/QuestionCommentData';
import { DbQuestionAnswer } from '../../database/v2/entities/DbQuestionAnswer';
import {
  CommentResponse,
  PaginatedQuestionCommentsResponse,
  QuestionWithCategoryResponse,
} from '@fictadvisor/utils/responses';
import { DbQuestion } from '../../database/v2/entities/DbQuestion';
import { QuestionDisplay, QuestionType } from '@fictadvisor/utils';
import { DbDisciplineTeacher } from '../../database/v2/entities/DbDisciplineTeacher';
import { DbQuestionWithRoles } from '../../database/v2/entities/DbQuestionWithRoles';

@Injectable()
export class QuestionMapper {
  getQuestionWithCategory (question: DbQuestion): QuestionWithCategoryResponse {
    return {
      id: question.id,
      order: question.order,
      category: question.category,
      name: question.name,
      description: question.description,
      text: question.text,
      isRequired: question.isRequired,
      criteria: question.criteria,
      type: question.type as QuestionType,
      display: question.display as QuestionDisplay,
    };
  }

  getQuestions (questions: DbQuestion[]): QuestionWithCategoryResponse[] {
    const result = [];
    for (const question of questions) {
      result.push(this.getQuestionWithCategory(question));
    }
    return result;
  }

  sortByCategories (questions: DbQuestion[]) {
    const results = [];
    for (const q of questions) {
      const question = this.getQuestionWithCategory(q);
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

  getQuestionComments (questionComments: QuestionCommentData[]): PaginatedQuestionCommentsResponse {
    const result = [];
    for (const questionComment of questionComments) {
      const question = {
        id: questionComment.id,
        name: questionComment.name,
      };

      const comments = [];
      for (const comment of questionComment.comments.data) {
        comments.push({
          disciplineTeacherId: comment.disciplineTeacherId,
          userId: comment.userId,
          comment: comment.value,
          discipline: comment.disciplineTeacher.discipline.subject.name,
          year: comment.disciplineTeacher.discipline.year,
          semester: comment.disciplineTeacher.discipline.semester,
        });
      }

      result.push({
        ...question,
        comments,
        pagination: questionComment.comments.pagination,
      });
    }

    return {
      questions: result,
    };
  }

  getSortedQuestionsWithAnswers (disciplineTeachers: DbDisciplineTeacher[]) {
    const sortedQuestions = [];
    for (const disciplineTeacher of disciplineTeachers) {
      for (const questionWithAnswer of disciplineTeacher.questionAnswers) {
        const { question, value } = questionWithAnswer;
        const sortedQuestion = sortedQuestions.find((q) => q.name === question.name);
        if (!sortedQuestion) {
          sortedQuestions.push({
            name: question.name,
            type: question.type,
            display: question.display,
            questionAnswers: [{
              value,
            }],
          });
        } else {
          sortedQuestion.questionAnswers.push({ value });
        }
      }
    }
    return sortedQuestions;
  }

  getMarks (questionWithAnswers: DbQuestion[]) {
    return questionWithAnswers.map((q) => ({
      name: q.name,
      amount: q.questionAnswers.length,
      type: q.display,
      mark: this.getRightMarkFormat(q),
    }));
  }

  private parseMark (type: QuestionType, marksSum: number, answerQty: number) {
    const divider = (answerQty * ((type === QuestionType.SCALE) ? 10 : 1));
    return parseFloat(((marksSum / divider) * 100).toFixed(2));
  }

  getRightMarkFormat ({ display, type, questionAnswers: answers }: DbQuestion) {
    if (display === QuestionDisplay.RADAR || display === QuestionDisplay.CIRCLE) {
      return this.parseMark(type as QuestionType, answers.reduce((acc, answer) => acc + (+answer.value), 0), answers.length);
    } else if (display === QuestionDisplay.AMOUNT) {
      const table = {};
      for (let i = 1; i <= 10; i++) {
        table[i] = answers.filter((a) => +a.value === i).length;
      }
      return table;
    }
  }

  getComment (comment: DbQuestionAnswer): CommentResponse {
    const { disciplineTeacher: { teacher, discipline } } = comment;
    return {
      disciplineTeacherId: comment.disciplineTeacherId,
      questionId: comment.questionId,
      userId: comment.userId,
      comment: comment.value,
      semester: discipline.semester,
      year: discipline.year,
      teacher: {
        id: teacher.id,
        lastName: teacher.lastName,
        firstName: teacher.firstName,
        middleName: teacher.middleName,
      },
      subject: {
        id: discipline.subjectId,
        name: discipline.subject.name,
      },
    };
  }

  getComments (comments: DbQuestionAnswer[]): CommentResponse[] {
    return comments.map(this.getComment);
  }
}
