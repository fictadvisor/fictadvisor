import { ResourceCategory, ResourcesOnCategories, Subject, Teacher } from '@prisma/client';

export class DbDisciplineResource {
  id: string;
  name: string;
  description?: string;
  link: string;
  subject: Subject;
  teacher: Teacher;
  categories: (ResourcesOnCategories & {
    category: ResourceCategory,
  })[];
}