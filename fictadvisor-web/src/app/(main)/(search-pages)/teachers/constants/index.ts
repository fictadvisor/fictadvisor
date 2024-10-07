import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const filterOptions: DropDownOption[] = [
  { id: 'firstName', label: 'Іменем' },
  { id: 'lastName', label: 'Прізвищем' },
];

export const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Викладачі',
    href: '/teachers',
  },
];

export const PAGE_SIZE = 20;
