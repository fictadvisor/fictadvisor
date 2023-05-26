import React from 'react';

import { GitHubIcon } from '@/components/common/custom-svg/GitHub';
import { InstagramIcon } from '@/components/common/custom-svg/Instagram';
import { TelegramIcon } from '@/components/common/custom-svg/Telegram';

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
];

export const socialLinks = [
  {
    link: 'https://github.com/fictadvisor/',
    text: 'GitHub',
    icon: <GitHubIcon />,
  },
  {
    link: 'https://www.instagram.com/sr_fiot/',
    text: 'Instagram',
    icon: <InstagramIcon />,
  },
  {
    link: 'https://t.me/fict_time',
    text: 'Telegram',
    icon: <TelegramIcon />,
  },
];
