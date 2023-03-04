import React from 'react';
import mergeClassNames from 'merge-class-names';

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
export enum ContactSize {
  BIG = 'big',
  SMALL = 'small',
}

export interface ContactProps {
  name: ContactType;
  displayName: string;
  link: string;
  size?: ContactSize;
  className?: string;
}

const Contact: React.FC<ContactProps> = ({
  name,
  displayName,
  link,
  size = ContactSize.BIG,
  className: additionalClassName,
}) => {
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
      case ContactType.TELEGRAM:
        return <TelegramIcon />;
    }
  };
  return (
    <div className={mergeClassNames('contact', additionalClassName)}>
      <div className={styles[`icon-${size}`]}>{icon()}</div>
      <a href={link} className={styles[`link-${size}`]}>
        {displayName}
      </a>
    </div>
  );
};

export default Contact;
