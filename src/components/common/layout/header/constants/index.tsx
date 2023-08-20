import { FireIcon } from '@heroicons/react/24/outline';
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
    link: '/account?tab=general',
    text: 'Загальне',
    icon: <AcademicCapIcon />,
  },
  {
    link: '/account?tab=security',
    text: 'Безпека',
    icon: <LockClosedIcon />,
  },
  {
    link: '/account?tab=group',
    text: 'Група',
    icon: <UsersIcon />,
  },
  {
    link: '/account?tab=selective',
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
];
