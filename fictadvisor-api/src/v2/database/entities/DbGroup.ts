import { SelectiveAmount, TelegramGroup } from '@prisma/client';

export class DbGroup {
  id: string;
  code: string;
  selectiveAmounts: SelectiveAmount[];
  telegramGroups: TelegramGroup[];
}

