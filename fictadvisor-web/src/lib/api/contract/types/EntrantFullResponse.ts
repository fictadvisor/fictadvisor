import { PriorityDataBody } from '@/lib/api/contract/types/PriorityDataBody';
import {
  Fullname,
  PaymentTypeParam,
  StudyFormParam,
  StudyTypeParam,
} from '@/types/contract';

import { PersonalData } from './ContractBody';

export const enum priorityState {
  APPROVED = 'APPROVED',
  NOT_APPROVED = 'NOT_APPROVED',
}
export interface EntrantFuIlResponse extends Fullname {
  id: string;
  specialty: '121' | '123' | '126';
  competitivePoint: number;
  studyType: StudyTypeParam;
  studyForm: StudyFormParam;
  paymentType: PaymentTypeParam;
  entrantData?: PersonalData;
  representativeData?: PersonalData;
  contract?: {
    entrantId: string;
    number: string;
    date: string;
    group: string;
  };
  priority?: {
    entrantId: string;
    state: priorityState;
    date: string;
    priorities: PriorityDataBody['priorities'];
  };
}
