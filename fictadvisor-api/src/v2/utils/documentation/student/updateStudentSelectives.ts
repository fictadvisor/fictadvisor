import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const StudentDocumentationUpdateStudentSelectives: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Student with such id is not found
    
    InvalidBodyException:
      Ids of selective disciplines should be an array
      Ids of selective disciplines should be UUIDs
      Ids of selective disciplines should be an array
      Ids of selective disciplines should be UUIDs 
    
    NotBelongException: 
      This selective does not belong to this student
      This discipline does not belong to this group
      
    AlreadySelectedException:
      You have already selected these disciplines
      
    ExcessiveSelectiveDisciplinesException:
      There are excessive selective disciplines in the request`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'studentId',
      required: true,
      description: 'Id of a student',
    },
  ],
};