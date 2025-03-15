import { Injectable } from '@nestjs/common';
import { QuestionCommentData } from '../../modules/poll/v2/types/QuestionCommentData';
import { DbQuestionAnswer } from '../../database/v2/entities/DbQuestionAnswer';
import {
  CommentResponse,
  PaginatedQuestionCommentsResponse,
  QuestionWithCategoryResponse,
  ShortTeacherResponse,
} from '@fictadvisor/utils/responses';
import { DbQuestion } from '../../database/v2/entities/DbQuestion';
import { QuestionDisplay, QuestionType, QuestionWithCategoriesAndRolesResponse } from '@fictadvisor/utils';
import { DbDisciplineTeacher } from '../../database/v2/entities/DbDisciplineTeacher';
import { DbQuestionWithRoles } from '../../database/v2/entities/DbQuestionWithRoles';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { DbTeacher } from '../../database/v2/entities/DbTeacher';
import { forMembers } from '../helpers/mapper';

@Injectable()
export class QuestionMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbQuestion, QuestionWithCategoryResponse);
      createMap(mapper, DbQuestionWithRoles, QuestionWithCategoriesAndRolesResponse);
      createMap(mapper, DbTeacher, ShortTeacherResponse);

      createMap(mapper, DbQuestionAnswer, CommentResponse,
        ...forMembers<DbQuestionAnswer, CommentResponse>({
          semester: (dto) => dto.disciplineTeacher.discipline.semester,
          year: (dto) => dto.disciplineTeacher.discipline.year,
          comment: (dto) => dto.value,
          teacher: (dto) => this.mapper.map(
            dto.disciplineTeacher.teacher, DbTeacher, ShortTeacherResponse),
        })
      );
    };
  }

  getQuestionWithCategory (question: DbQuestion): QuestionWithCategoryResponse {
    return this.mapper.map(question, DbQuestion, QuestionWithCategoryResponse);
  }

  getQuestions (questions: DbQuestion[]): QuestionWithCategoryResponse[] {
    return this.mapper.mapArray(questions, DbQuestion, QuestionWithCategoryResponse);
  }

  getComment (comment: DbQuestionAnswer): CommentResponse {
    return this.mapper.map(comment, DbQuestionAnswer, CommentResponse);
  }

  getComments (comments: DbQuestionAnswer[]): CommentResponse[] {
    return this.mapper.mapArray(comments, DbQuestionAnswer, CommentResponse);
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

  getQuestionWithRoles (question: DbQuestionWithRoles) {
    return this.mapper.map(question, DbQuestionWithRoles, QuestionWithCategoryResponse);
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
}
