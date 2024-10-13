import { FAQ, FAQToCategory } from '@prisma/client';

export class DbFAQCategory {
  id: string;
  name: string;
  faqs: (FAQToCategory & { faq: FAQ })[];
}
