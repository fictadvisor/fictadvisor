import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiDocumentationParams } from './ApiDocumentationParams';

export class ApiEndpointParams {
  summary: string;
  permissions?: PERMISSION | PERMISSION[];
  guards?: any | any[];
  documentation? : ApiDocumentationParams;
}
