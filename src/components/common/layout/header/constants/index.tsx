import { AcademicCap } from '@/components/common/icons/AcademicCap';
import { Briefcase } from '@/components/common/icons/Briefcase';
import { Clipboard } from '@/components/common/icons/Clipboard';
import { Home } from '@/components/common/icons/Home';
import { LockClosed } from '@/components/common/icons/LockClosed';
import { Users } from '@/components/common/icons/Users';

export const accountButtons = [
  {
    link: '/account?tab=general',
    text: 'Загальне',
    icon: <AcademicCap />,
  },
  {
    link: '/account?tab=security',
    text: 'Безпека',
    icon: <LockClosed />,
  },
  {
    link: '/account?tab=group',
    text: 'Група',
    icon: <Users />,
  },
];

export const mainLinks = [
  {
    link: '/',
    text: 'Головна',
    icon: <Home />,
  },
  {
    link: '/poll',
    text: 'Опитування',
    icon: <Clipboard />,
  },
  {
    link: '/teachers',
    text: 'Викладачі',
    icon: <Briefcase />,
  },
  {
    link: '/subjects',
    text: 'Предмети',
    icon: <AcademicCap />,
  },
];
