import { disciplineDocumentationCreate } from './create';
import { disciplineDocumentationGetAll } from './getAll';
import { disciplineDocumentationGetAllTeachersByDiscipline } from './getAllTeachersByDiscipline';
import { disciplineDocumentationDeleteById } from './deleteById';
import { disciplineDocumentationGetById } from './getById';
import { disciplineDocumentationUpdateById } from './updateById';

export const DisciplineDocumentation = {
  CREATE: disciplineDocumentationCreate,
  GET_ALL: disciplineDocumentationGetAll,
  GET_ALL_TEACHERS_BY_DISCIPLINE: disciplineDocumentationGetAllTeachersByDiscipline,
  DELETE_BY_ID: disciplineDocumentationDeleteById,
  GET_BY_ID: disciplineDocumentationGetById,
  UPDATE_BY_ID: disciplineDocumentationUpdateById,
};
