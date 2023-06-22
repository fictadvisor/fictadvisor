import { SelectiveAmount } from '@prisma/client';

export class DbGroup {
  id: string;
  code: string;
  selectiveAmounts: SelectiveAmount[];
}

