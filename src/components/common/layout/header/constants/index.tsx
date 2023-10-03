import { CalendarIcon, FireIcon } from '@heroicons/react/24/outline';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ClipboardIcon,
  HomeIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

export const accountButtons = [
  {
    link: '/account?tab=GENERAL',
    text: 'Загальне',
    icon: <AcademicCapIcon />,
  },
  {
    link: '/account?tab=SECURITY',
    text: 'Безпека',
    icon: <LockClosedIcon />,
  },
  {
    link: '/account?tab=GROUP',
    text: 'Група',
    icon: <UsersIcon />,
  },
  {
    link: '/account?tab=SELECTIVE',
    text: 'Мої вибіркові',
    icon: <FireIcon />,
  },
];

export const mainLinks = [
  {
    link: '/',
    text: 'Головна',
    icon: <HomeIcon />,
  },
  {
    link: '/poll',
    text: 'Опитування',
    icon: <ClipboardIcon />,
  },
  {
    link: '/teachers',
    text: 'Викладачі',
    icon: <BriefcaseIcon />,
  },
  {
    link: '/subjects',
    text: 'Предмети',
    icon: <AcademicCapIcon />,
  },
  {
    link: '/schedule',
    text: 'Розклад',
    icon: <CalendarIcon />,
  },
];
