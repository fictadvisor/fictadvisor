import { GitHub } from '@/components/common/icons/GitHub';
import { Instagram } from '@/components/common/icons/Instagram';
import { Telegram } from '@/components/common/icons/Telegram';
import { TikTok } from '@/components/common/icons/TikTok';

export const mainLinks = [
  {
    link: '/',
    text: 'Головна',
  },
  {
    link: '/poll',
    text: 'Опитування',
  },
  {
    link: '/teachers',
    text: 'Викладачі',
  },
  {
    link: '/subjects',
    text: 'Предмети',
  },
];

export const supportLinks = [
  {
    link: '/privacy',
    text: 'Конфіденційність',
  },
  {
    link: 'https://t.me/fict_robot',
    text: 'FICT robot',
  },
  {
    link: '/about',
    text: 'Про нас',
  },
];

export const socialLinks = [
  {
    link: 'https://github.com/fictadvisor/',
    text: 'GitHub',
    icon: <GitHub />,
  },
  {
    link: 'https://www.instagram.com/sr_fiot/',
    text: 'Instagram',
    icon: <Instagram />,
  },
  {
    link: 'https://t.me/fict_time',
    text: 'Telegram',
    icon: <Telegram />,
  },
  {
    link: 'https://www.tiktok.com/@sr_fiot',
    text: 'TikTok',
    icon: <TikTok />,
  },
];
