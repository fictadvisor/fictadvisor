import React from 'react';
import NextLink from 'next/link';

import { GitHubIcon } from '@/components/common/custom-svg/GitHub';
import { InstagramIcon } from '@/components/common/custom-svg/Instagram';
import { MailIcon } from '@/components/common/custom-svg/Mail';
import { TelegramIcon } from '@/components/common/custom-svg/Telegram';
import { TwitterIcon } from '@/components/common/custom-svg/Twitter';
import { YouTubeIcon } from '@/components/common/custom-svg/YouTube';

import styles from './Contact.module.scss';

export enum ContactType {
  YOUTUBE = 'YOUTUBE',
  DISCORD = 'DISCORD',
  TELEGRAM = 'TELEGRAM',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  TWITTER = 'TWITTER',
  MAIL = 'MAIL',
}

export interface ContactProps {
  name: ContactType;
  displayName: string;
  link: string;
}

const Contact: React.FC<ContactProps> = ({ name, displayName, link }) => {
  const icon = () => {
    switch (name) {
      case ContactType.YOUTUBE:
        return <YouTubeIcon />;
      case ContactType.TWITTER:
        return <TwitterIcon />;
      case ContactType.MAIL:
        return <MailIcon />;
      case ContactType.GITHUB:
        return <GitHubIcon />;
      case ContactType.INSTAGRAM:
        return <InstagramIcon />;
      case ContactType.DISCORD:
        return <TelegramIcon />;
      case ContactType.FACEBOOK:
        return <TelegramIcon />;
      case ContactType.TELEGRAM:
        return <TelegramIcon />;
    }
  };
  return (
    <div className={styles['contact']}>
      <div className={styles[`icon`]}>{icon()}</div>
      {link != '' && (
        <NextLink href={link} className={styles[`link`]}>
          {displayName}
        </NextLink>
      )}
      {link == '' && <p className={styles[`link`]}>{displayName}</p>}
    </div>
  );
};

export default Contact;
