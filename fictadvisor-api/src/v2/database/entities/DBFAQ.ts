import { FAQCategory, FAQToCategory } from '@prisma/client';

export class DBFAQ {
  id: string;
  text: string;
  answer: string;
  categories: (FAQToCategory & { category: FAQCategory })[];
}
