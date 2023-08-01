import { Contract, EntrantData, EntrantPriority } from '@prisma/client';

export class DbEntrant {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  competitivePoint: number;
  entrantData: EntrantData;
  priority: EntrantPriority;
  contract: Contract;
}