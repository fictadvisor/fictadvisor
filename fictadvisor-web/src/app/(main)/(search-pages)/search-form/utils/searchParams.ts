import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

import { SearchFormFields } from '../types';

const LIST_SEPARATOR = ',';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const disciplineTypeValues = Object.values(DisciplineTypeEnum) as string[];

// Anything reaching these helpers comes from the address bar, so every value is
// validated before it is handed to the API - a hand-edited query string must not
// turn into a 400.
const parseList = <T extends string>(
  raw: string | null,
  isValid: (value: string) => boolean,
): T[] => (raw ? (raw.split(LIST_SEPARATOR).filter(isValid) as T[]) : []);

const isUuid = (value: string) => UUID_REGEX.test(value);

export interface ParseSearchFormOptions {
  /** Values the sort dropdown of this page actually offers. */
  sortOptions: string[];
  /** Teacher only filters - the subject search does not render them. */
  withTeacherFilters?: boolean;
}

export const parseSearchFormFields = (
  params: URLSearchParams,
  initialValues: SearchFormFields,
  { sortOptions, withTeacherFilters = false }: ParseSearchFormOptions,
): SearchFormFields => {
  const sort = params.get('sort');
  const order = params.get('order');
  const groupId = params.get('groupId');

  return {
    search: params.get('search') ?? initialValues.search,
    order: order === 'asc' || order === 'desc' ? order : initialValues.order,
    sort: sort && sortOptions.includes(sort) ? sort : initialValues.sort,
    groupId: groupId && isUuid(groupId) ? groupId : undefined,
    disciplineTypes: withTeacherFilters
      ? parseList<DisciplineTypeEnum>(params.get('disciplineTypes'), value =>
          disciplineTypeValues.includes(value),
        )
      : [],
    cathedrasId: withTeacherFilters
      ? parseList<string>(params.get('cathedrasId'), isUuid)
      : [],
  };
};

/**
 * Only values that differ from the page defaults end up in the URL, so an
 * untouched search page keeps a clean address.
 */
export const serializeSearchFormFields = (
  values: SearchFormFields,
  initialValues: SearchFormFields,
): string => {
  const params = new URLSearchParams();

  if (values.search) params.set('search', values.search);
  if (values.order !== initialValues.order) params.set('order', values.order);
  if (values.sort !== initialValues.sort) params.set('sort', values.sort);
  if (values.groupId) params.set('groupId', values.groupId);
  if (values.disciplineTypes.length)
    params.set('disciplineTypes', values.disciplineTypes.join(LIST_SEPARATOR));
  if (values.cathedrasId.length)
    params.set('cathedrasId', values.cathedrasId.join(LIST_SEPARATOR));

  return params.toString();
};

const areListsEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

export const areSearchFormFieldsEqual = (
  a: SearchFormFields,
  b: SearchFormFields,
) =>
  a.search === b.search &&
  a.order === b.order &&
  a.sort === b.sort &&
  a.groupId === b.groupId &&
  areListsEqual(a.disciplineTypes, b.disciplineTypes) &&
  areListsEqual(a.cathedrasId, b.cathedrasId);
