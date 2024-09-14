import { ApiDocumentationParams } from 'src/v2/utils/documentation/decorators';
import { TeacherWithContactsFullResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetSubject: ApiDocumentationParams = {
  ok: {
    type: TeacherWithContactsFullResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      Subject with such id is not found`,
  },
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
    {
      name: 'subjectId',
      required: true,
      description: 'Id of certain subject',
    },
  ],
};
