import { Injectable } from '@nestjs/common';
import { CommentData, QuestionCommentData } from '../../modules/poll/v2/types/question-comment.data';
import { DbQuestionAnswer } from '../../database/v2/entities/question-answer.entity';
import {
  Comment,
  CommentResponse, MarkResponse,
  QuestionWithCategoriesAndRolesResponse,
  QuestionWithCategoryResponse,
} from '@fictadvisor/utils/responses';
import { DbQuestion } from '../../database/v2/entities/question.entity';
import {
  QuestionComment,
  QuestionRole,
  ShortTeacherResponse,
} from '@fictadvisor/utils';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, forSelf, mapFrom, Mapper, mapWith } from '@automapper/core';
import { DbQuestionWithRoles } from '../../database/v2/entities/question-with-roles.entity';
import { DbDiscipline } from '../../database/v2/entities/discipline.entity';
import { DbTeacher } from '../../database/v2/entities/teacher.entity';
import { forMembers } from '../utils/mapper.utils';
import { DbQuestionRole } from '../../database/v2/entities/question-role.entity';
import { TeacherService } from '../../modules/teacher/v2/teacher.service';

@Injectable()
export class QuestionProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbQuestionRole, QuestionRole);
      createMap(mapper, DbQuestion, QuestionWithCategoryResponse);

      createMap(mapper, DbQuestionWithRoles, QuestionWithCategoriesAndRolesResponse,
        forMember((response) => response.roles,
          mapWith(QuestionRole, DbQuestionRole, (dto) => dto.questionRoles)));

      createMap(mapper, DbQuestion, MarkResponse,
        ...forMembers<DbQuestion, MarkResponse>({
          type: ({ display }) => display,
          mark: (dto) => TeacherService.getRightMarkFormat(dto),
          amount: ({ questionAnswers }) => questionAnswers.length,
        }));

      createMap(mapper, DbQuestionAnswer, CommentResponse,
        forSelf(DbDiscipline, ({ disciplineTeacher }) => disciplineTeacher.discipline),

        forMember((response) => response.teacher,
          mapWith(ShortTeacherResponse, DbTeacher, ({ disciplineTeacher }) => disciplineTeacher.teacher)),

        ...forMembers<DbQuestionAnswer, CommentResponse>({
          comment: ({ value }) => value,
          subject: ({ disciplineTeacher: { discipline } }) => ({
            name: discipline.subject.name,
            id: discipline.subjectId,
          }),
        }),

      );

      createMap(mapper, CommentData, Comment,
        ...forMembers<CommentData, Comment>({
          comment: ({ value }) => value,
          discipline: ({ disciplineTeacher }) => disciplineTeacher.discipline.subject.name,
          year: ({ disciplineTeacher }) => disciplineTeacher.discipline.year,
          semester: ({ disciplineTeacher }) => disciplineTeacher.discipline.semester,
        }));

      createMap(mapper, QuestionCommentData, QuestionComment,
        forMember((response) => response.comments,
          mapWith(Comment, CommentData, (dto) => dto.comments.data)),

        forMember((response) => response.pagination,
          mapFrom((dto) => dto.comments.pagination)
        ));
    };
  }
}
