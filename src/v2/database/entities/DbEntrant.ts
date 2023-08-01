import { Contract, EntrantData, EntrantPriority, Priority } from '@prisma/client';

export class DbEntrant {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  competitivePoint: number;
  entrantData?: EntrantData;
  contract?: Contract;
  priority?: EntrantPriority & {
    priorities?: Priority[],
  };
}