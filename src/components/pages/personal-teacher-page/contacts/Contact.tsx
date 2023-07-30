import React, { FC } from 'react';
import NextLink from 'next/link';

import { GitHub } from '@/components/common/icons/GitHub';
import { Instagram } from '@/components/common/icons/Instagram';
import { Mail } from '@/components/common/icons/Mail';
import { Telegram } from '@/components/common/icons/Telegram';
import { Twitter } from '@/components/common/icons/Twitter';
import { YouTube } from '@/components/common/icons/YouTube';
import { ContactType } from '@/types/contact';

import styles from './Contact.module.scss';

export interface ContactProps {
  name: ContactType;
  displayName: string;
  link: string;
}

const contactIconsMap: Record<ContactType, React.ReactElement> = {
  [ContactType.YOUTUBE]: <YouTube />,
  [ContactType.TWITTER]: <Twitter />,
  [ContactType.MAIL]: <Mail />,
  [ContactType.GITHUB]: <GitHub />,
  [ContactType.INSTAGRAM]: <Instagram />,
  [ContactType.DISCORD]: <Telegram />,
  [ContactType.FACEBOOK]: <Telegram />,
  [ContactType.TELEGRAM]: <Telegram />,
};

const Contact: FC<ContactProps> = ({ name, displayName, link }) => {
  const Icon = () => contactIconsMap[name];

  return (
    <div className={styles['contact']}>
      <div className={styles[`icon`]}>
        <Icon />
      </div>
      {link && (
        <NextLink href={link} className={styles[`link`]}>
          {displayName}
        </NextLink>
      )}
      {!link && <p className={styles[`link`]}>{displayName}</p>}
    </div>
  );
};

export default Contact;
