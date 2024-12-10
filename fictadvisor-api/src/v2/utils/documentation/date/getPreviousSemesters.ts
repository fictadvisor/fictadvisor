import { SemestersResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';

export const DateDocumentationGetPreviousSemesters: ApiDocumentationParams = {
  ok: {
    type: SemestersResponse,
  },
  queries: [{
    name: 'isFinished',
    required: false,
    type: Boolean,
    description: 'Whether last semester is finished',
  }],
};
