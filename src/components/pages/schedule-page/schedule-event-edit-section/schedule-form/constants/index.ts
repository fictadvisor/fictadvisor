import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { TDiscipline, TEventPeriod } from '@/types/schedule';

export const initialValues: SharedEventBody = {
  name: '',
  disciplineId: '',
  disciplineType: '',
  teachers: [],
  startTime: '',
  endTime: '',
  period: '',
  url: '',
  disciplineInfo: '',
  eventInfo: '',
};

export const eventTypeList: DropDownOption[] = [
  {
    id: TDiscipline.LABORATORY,
    text: 'Лабораторна',
    color: TagColor.MINT,
    size: TagSize.SMALL,
  },
  {
    id: TDiscipline.EXAM,
    text: 'Екзамен',
    color: TagColor.VIOLET,
    size: TagSize.SMALL,
  },
  {
    id: TDiscipline.WORKOUT,
    text: 'Тренування',
    color: TagColor.PRIMARY,
    size: TagSize.SMALL,
  },
  {
    id: TDiscipline.PRACTICE,
    text: 'Практика',
    color: TagColor.ORANGE,
    size: TagSize.SMALL,
  },
  {
    id: TDiscipline.LECTURE,
    text: 'Лекція',
    color: TagColor.INDIGO,
    size: TagSize.SMALL,
  },
  {
    id: TDiscipline.CONSULTATION,
    text: 'Консультація',
    color: TagColor.SUCCESS,
    size: TagSize.SMALL,
  },
  {
    id: '',
    text: 'Інша подія',
    color: TagColor.SECONDARY,
    size: TagSize.SMALL,
  },
];

export const periodOptions: DropDownOption[] = [
  {
    id: TEventPeriod.NO_PERIOD,
    label: 'Одиночна подія',
  },
  {
    id: TEventPeriod.EVERY_FORTNIGHT,
    label: 'Раз на 2 тижні',
  },
  {
    id: TEventPeriod.EVERY_WEEK,
    label: 'Раз на тиждень',
  },
];
