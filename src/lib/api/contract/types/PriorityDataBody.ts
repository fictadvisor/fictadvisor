export interface PriorityDataBody {
  firstName: string;
  middleName: string;
  lastName: string;
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
