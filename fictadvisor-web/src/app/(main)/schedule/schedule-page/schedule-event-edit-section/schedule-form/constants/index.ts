import { EventTypeEnum, Period } from '@fictadvisor/utils/enums';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';

export const initialValues: SharedEventBody = {
  name: '',
  disciplineId: '',
  eventType: '' as EventTypeEnum,
  teachers: [],
  startTime: '',
  endTime: '',
  period: '' as Period,
  url: '',
  disciplineInfo: '',
  eventInfo: '',
};

export const eventTypeList: DropDownOption[] = [
  {
    id: EventTypeEnum.LABORATORY,
    text: 'Лабораторна',
    color: TagColor.MINT,
    size: TagSize.SMALL,
  },
  {
    id: EventTypeEnum.EXAM,
    text: 'Екзамен',
    color: TagColor.VIOLET,
    size: TagSize.SMALL,
  },
  {
    id: EventTypeEnum.WORKOUT,
    text: 'Відпрацювання',
    color: TagColor.PRIMARY,
    size: TagSize.SMALL,
  },
  {
    id: EventTypeEnum.PRACTICE,
    text: 'Практика',
    color: TagColor.ORANGE,
    size: TagSize.SMALL,
  },
  {
    id: EventTypeEnum.LECTURE,
    text: 'Лекція',
    color: TagColor.INDIGO,
    size: TagSize.SMALL,
  },
  {
    id: EventTypeEnum.CONSULTATION,
    text: 'Консультація',
    color: TagColor.SUCCESS,
    size: TagSize.SMALL,
  },
  {
    id: EventTypeEnum.OTHER,
    text: 'Інша подія',
    color: TagColor.SECONDARY,
    size: TagSize.SMALL,
  },
];

export const periodOptions: DropDownOption[] = [
  {
    id: Period.NO_PERIOD,
    label: 'Одиночна подія',
  },
  {
    id: Period.EVERY_FORTNIGHT,
    label: 'Раз на 2 тижні',
  },
  {
    id: Period.EVERY_WEEK,
    label: 'Раз на тиждень',
  },
];
