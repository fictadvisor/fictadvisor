import { Contract, CustomerData, EntrantData, EntrantPriority, Priority, RepresentativeData } from '@prisma/client';

export class DbEntrant {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  competitivePoint: number;
  entrantData?: EntrantData;
  representativeData?: RepresentativeData;
  customerData?: CustomerData;
  contract?: Contract;
  priority?: EntrantPriority & {
    priorities?: Priority[],
  };
}