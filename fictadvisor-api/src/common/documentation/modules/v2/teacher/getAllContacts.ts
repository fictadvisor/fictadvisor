import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { ContactsResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetAllContacts: ApiDocumentationParams = {
  ok: {
    type: ContactsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found`,
  },
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
  ],
};
