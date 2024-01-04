import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const filterOptions: DropDownOption[] = [
  { id: 'name', label: 'За назвою' },
];

export const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Предмети',
    href: '/subjects',
  },
];

export const PAGE_SIZE = 20;
