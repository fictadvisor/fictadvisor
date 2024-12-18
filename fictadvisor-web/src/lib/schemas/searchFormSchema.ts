import { DisciplineTypeEnum } from '@fictadvisor/utils';
import { z } from 'zod';

export const SearchFormSchema = z.object({
  search: z.string(),
  order: z.enum(['asc', 'desc']),
  sort: z.string(),
  groupId: z.string(),
  disciplineTypes: z.array(z.nativeEnum(DisciplineTypeEnum)),
  cathedrasId: z.array(z.string()),
});

export type TSearchFormSchema = z.infer<typeof SearchFormSchema>;
