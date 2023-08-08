import { EducationProgram } from '@/components/pages/priority-page/constants/index';
import { Fullname } from '@/types/contract';

export interface PriorityDataBody extends Fullname {
  specialty: string;
  email: string;
  day: string;
  isToAdmission: boolean;
  priorities: {
    1: string;
    2: string;
    3?: string;
  };
}

export interface ExtendedPriorityDataBody extends PriorityDataBody {
  secretNumber: string;
  noMiddleName: boolean;
  isForcePushed: boolean;
  forcePushedNumber: string;
}
