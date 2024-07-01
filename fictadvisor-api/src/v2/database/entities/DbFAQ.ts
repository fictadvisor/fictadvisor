import { FAQCategory, FAQToCategory } from '@prisma/client';

export class DbFAQ {
  id: string;
  text: string;
  answer: string;
  categories: (FAQToCategory & { category: FAQCategory })[];
}
