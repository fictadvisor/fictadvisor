import { disciplineDocumentationCreate } from './create';
import { disciplineDocumentationGetAll } from './get-all';
import { disciplineDocumentationGetAllTeachersByDiscipline } from './get-all-teachers-by-discipline';
import { disciplineDocumentationDeleteById } from './delete-by-id';
import { disciplineDocumentationGetById } from './get-by-id';
import { disciplineDocumentationUpdateById } from './update-by-id';

export const DisciplineDocumentation = {
  CREATE: disciplineDocumentationCreate,
  GET_ALL: disciplineDocumentationGetAll,
  GET_ALL_TEACHERS_BY_DISCIPLINE: disciplineDocumentationGetAllTeachersByDiscipline,
  DELETE_BY_ID: disciplineDocumentationDeleteById,
  GET_BY_ID: disciplineDocumentationGetById,
  UPDATE_BY_ID: disciplineDocumentationUpdateById,
};
