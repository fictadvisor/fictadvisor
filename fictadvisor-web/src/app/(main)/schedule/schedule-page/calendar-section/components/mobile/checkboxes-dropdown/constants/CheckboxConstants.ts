import { CheckboxColor } from '@/components/common/ui/form/checkbox/types';
import { TagColor } from '@/components/common/ui/tag/types';

export const NegativeCheckboxes: Record<string, boolean> = {
  addLecture: false,
  addLaboratory: false,
  addPractice: false,
  otherEvents: false,
  isSelective: false,
};

export const TagLabelMapper: Record<string, string> = {
  addLecture: 'Лекція',
  addLaboratory: 'Лабораторна',
  addPractice: 'Практика',
  otherEvents: 'Інша подія',
  isSelective: 'Мої вибіркові',
};

export const TagColorMapper: Record<string, TagColor> = {
  addLecture: TagColor.INDIGO,
  addLaboratory: TagColor.MINT,
  addPractice: TagColor.ORANGE,
  otherEvents: TagColor.VIOLET,
  isSelective: TagColor.SECONDARY,
};

export const CheckBoxColorMapper: Record<string, CheckboxColor> = {
  addLecture: CheckboxColor.LECTURE,
  addLaboratory: CheckboxColor.LAB,
  addPractice: CheckboxColor.PRACTICE,
  otherEvents: CheckboxColor.EVENT,
  isSelective: CheckboxColor.PRIMARY,
};
