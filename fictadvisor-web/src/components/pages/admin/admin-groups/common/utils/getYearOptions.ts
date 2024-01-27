import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const getYearOptions = (): DropDownOption[] => {
  const currentYear = new Date().getFullYear();
  return [
    currentYear + 2,
    currentYear + 1,
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ].map(year => ({
    label: year.toString(),
    id: year.toString(),
  }));
};
