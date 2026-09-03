import {
  AcademicCapIcon,
  ArrowUpTrayIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  HomeIcon,
  IdentificationIcon,
  NewspaperIcon,
  PencilSquareIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { Captain } from '@/components/common/icons/Captain';

export const BASE_URL = '/admin';

export const adminPanelTabs = [
  {
    link: BASE_URL + '/roles',
    text: 'Ролі',
    icon: <Captain />,
  },
  {
    link: BASE_URL + '/users',
    text: 'Користувачі',
    icon: <UserCircleIcon />,
  },
  {
    link: BASE_URL + '/students',
    text: 'Студенти',
    icon: <IdentificationIcon />,
  },
  {
    link: BASE_URL + '/groups',
    text: 'Групи',
    icon: <UserGroupIcon />,
  },
  {
    link: BASE_URL + '/departments',
    text: 'Кафедри',
    icon: <BuildingLibraryIcon />,
  },
  {
    link: BASE_URL + '/teachers',
    text: 'Викладачі',
    icon: <BriefcaseIcon />,
  },
  {
    link: BASE_URL + '/disciplines',
    text: 'Дисципліни',
    icon: <NewspaperIcon />,
  },
  {
    link: BASE_URL + '/subjects',
    text: 'Предмети',
    icon: <AcademicCapIcon />,
  },
  {
    link: BASE_URL + '/main',
    text: 'Головна сторінка',
    icon: <HomeIcon />,
  },
  {
    link: BASE_URL + '/semesters',
    text: 'Семестри',
    icon: <CalendarDaysIcon />,
  },
  {
    link: BASE_URL + '/selective-files',
    text: 'Вибіркові',
    icon: <ArrowUpTrayIcon />,
  },
  'Опитування',
  {
    link: BASE_URL + '/poll-dates',
    text: 'Дати опитувань',
    icon: <ClockIcon />,
  },
  {
    link: BASE_URL + '/questions',
    text: 'База питань',
    icon: <PencilSquareIcon />,
  },
  {
    link: BASE_URL + '/comments',
    text: 'База відповідей',
    icon: <ClipboardDocumentListIcon />,
  },
];
