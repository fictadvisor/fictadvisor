import { ApiDocumentationParams } from 'src/v2/utils/documentation/decorators';
import { ContactResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetContact: ApiDocumentationParams = {
  ok: {
    type: ContactResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      Contact with such id is not found`,
  },
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
    {
      name: 'contactId',
      required: true,
      description: 'Id of certain teacher\'s contact',
    },
  ],
};
