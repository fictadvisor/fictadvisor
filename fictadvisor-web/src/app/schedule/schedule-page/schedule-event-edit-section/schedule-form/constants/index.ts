import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { TEvent, TEventPeriod } from '@/types/schedule';

export const initialValues: SharedEventBody = {
  name: '',
  disciplineId: '',
  eventType: '',
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
    id: TEvent.LABORATORY,
    text: 'Лабораторна',
    color: TagColor.MINT,
    size: TagSize.SMALL,
  },
  {
    id: TEvent.EXAM,
    text: 'Екзамен',
    color: TagColor.VIOLET,
    size: TagSize.SMALL,
  },
  {
    id: TEvent.WORKOUT,
    text: 'Відпрацювання',
    color: TagColor.PRIMARY,
    size: TagSize.SMALL,
  },
  {
    id: TEvent.PRACTICE,
    text: 'Практика',
    color: TagColor.ORANGE,
    size: TagSize.SMALL,
  },
  {
    id: TEvent.LECTURE,
    text: 'Лекція',
    color: TagColor.INDIGO,
    size: TagSize.SMALL,
  },
  {
    id: TEvent.CONSULTATION,
    text: 'Консультація',
    color: TagColor.SUCCESS,
    size: TagSize.SMALL,
  },
  {
    id: TEvent.OTHER,
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
