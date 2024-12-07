import { ApiDocumentationParams } from '../decorators';
import { CurrentSemester } from '@fictadvisor/utils';

export const DateDocumentationGetCurrentSemester: ApiDocumentationParams = {
  ok: {
    type: CurrentSemester,
  },
  badRequest: {
    description: ` \n
      DataNotFoundException:
        Data was not found`,
  },
};
