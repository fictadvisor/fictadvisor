import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';

export const AuthDocumentationCheckCaptain: ApiDocumentationParams = {
  ok: {
    type: Boolean,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Group with such id is not found
    
    AbsenceOfCaptainException
      Captain was not found`,
  },
  params: [
    {
      name: 'groupId',
      required: true,
      description: 'Id of the group for which the check',
    },
  ],
};
