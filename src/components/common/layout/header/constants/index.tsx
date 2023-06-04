import { AcademicCapIcon } from '@/components/common/custom-svg/AcademicCap';
import { BriefcaseIcon } from '@/components/common/custom-svg/Briefcase';
import { ClipboardIcon } from '@/components/common/custom-svg/Clipboard';
import { HomeIcon } from '@/components/common/custom-svg/Home';
import { LockClosedIcon } from '@/components/common/custom-svg/LockClosed';
import { UsersIcon } from '@/components/common/custom-svg/Users';

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
