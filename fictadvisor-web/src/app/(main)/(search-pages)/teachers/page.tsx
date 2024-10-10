import { PAGE_SIZE } from '@/app/(main)/(search-pages)/teachers/constants';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import TeacherPage from './TeacherPage';
import { DisciplineTypeEnum, SortQATParam } from '@fictadvisor/utils/enums';
import { getQueryClient } from '@/lib/api/getQueryClient';

interface PageProps {
  searchParams: {
    search: string | undefined;
    order: string | undefined;
    sort: string | undefined;
    groupId: string | undefined;
    disciplineTypes: string | undefined;
    cathedrasId: string | undefined;
    page: string | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const search = searchParams.search || '';

  const order = searchParams.order
    ? isValidOrder(searchParams.order)
      ? searchParams.order
      : 'asc'
    : 'asc';

  const sort = searchParams.sort
    ? isValidSortQATParam(searchParams.sort)
      ? searchParams.sort
      : SortQATParam.LAST_NAME
    : SortQATParam.LAST_NAME;

  const groupId = searchParams.groupId || '';

  const cathedrasId =
    searchParams.cathedrasId?.split(',').filter(value => value) || [];

  const disciplineTypes =
    searchParams.disciplineTypes?.split(',').filter(isValidDisciplineType) ||
    [];

  const page = searchParams.page ? parseInt(searchParams.page) : 0;

  const data = await queryClient.fetchQuery({
    queryKey: [
      'lecturers',
      search,
      order,
      sort,
      groupId,
      cathedrasId,
      disciplineTypes,
    ],
    queryFn: () =>
      TeacherAPI.getAll({
        search,
        order,
        sort,
        groupId,
        cathedrasId,
        disciplineTypes,
        pageSize: PAGE_SIZE,
        page,
      }),
  });

  return <TeacherPage {...data} />;
}

function isValidEnumValue<T extends Record<string, string | number>>(
  enumObj: T,
  value: string | number,
): value is T[keyof T] {
  return Object.values(enumObj).includes(value as T[keyof T]);
}

// Type guard for sort
function isValidSortQATParam(value: string): value is SortQATParam {
  return isValidEnumValue(SortQATParam, value);
}

// Type guard for discipline types
function isValidDisciplineType(value: string): value is DisciplineTypeEnum {
  return isValidEnumValue(DisciplineTypeEnum, value);
}

// Type guard for order
function isValidOrder(value: string): value is 'asc' | 'desc' {
  return value === 'asc' || value === 'desc';
}
