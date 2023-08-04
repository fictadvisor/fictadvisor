import { Contract, EntrantData, EntrantPriority, Priority, RepresentativeData } from '@prisma/client';

export class DbEntrant {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  competitivePoint: number;
  entrantData?: EntrantData;
  representativeData?: RepresentativeData;
  contract?: Contract;
  priority?: EntrantPriority & {
    priorities?: Priority[],
  };
}