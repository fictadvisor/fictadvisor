import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { GitHubIcon } from '@/components/common/custom-svg/GitHub';
import { InstagramIcon } from '@/components/common/custom-svg/Instagram';
import { TelegramIcon } from '@/components/common/custom-svg/Telegram';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import useIsMobile from '@/hooks/use-is-mobile/UseIsMobile';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const router = useRouter();
  const returnMain = () => {
    router.push('/');
  };
  const returnPoll = () => {
    router.push('/poll');
  };
  const returnSubjects = () => {
    router.push('/subjects');
  };
  const returnTeachers = () => {
    router.push('/teachers');
  };
  const returnPrivacy = () => {
    router.push('/privacy');
  };
  const isMobile = useIsMobile(710);
  const socialLabels = isMobile
    ? [
        {
          text: '',
          icon: <TelegramIcon />,
        },
        {
          text: '',
          icon: <InstagramIcon />,
          ref: 'https://www.instagram.com/fiotkpi/',
        },
        {
          text: '',
          icon: <GitHubIcon />,
          ref: 'https://github.com/fictadvisor',
        },
      ]
    : [
        {
          text: 'GitHub',
          icon: <GitHubIcon />,
          ref: 'https://github.com/fictadvisor',
        },
        {
          text: 'Instagram',
          icon: <InstagramIcon />,
          ref: 'https://www.instagram.com/fiotkpi/',
        },
        { text: 'Telegram', icon: <TelegramIcon /> },
      ];

  return (
    <div className={styles['footer-container']}>
      <div className={styles['footer-logo-container']}>
        <div className={styles['footer-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['signature']}>
          <p>By Dev-відділ СР ФІОТ</p>
        </div>
      </div>
      <div className={styles['main-references']}>
        <div className={styles['title']}>
          <p>Основні посилання</p>
        </div>
        <div style={{ height: '36px' }}>
          <Button
            onClick={returnMain}
            text="Головна"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </div>
        <div style={{ height: '36px' }}>
          <Button
            onClick={returnPoll}
            text="Опитування"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </div>
        <div style={{ height: '36px' }}>
          <Button
            onClick={returnTeachers}
            text="Викладачі"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </div>
        <div style={{ height: '36px' }}>
          <Button
            onClick={returnSubjects}
            text="Предмети"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </div>
        {/* <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Розклад"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link> */}
      </div>
      <div className={styles['support']}>
        <div className={styles['title']}>
          <p>Підтримка</p>
        </div>
        <div style={{ height: '36px' }}>
          <Button
            onClick={returnPrivacy}
            text="Конфіденційність"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </div>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="FICT robot"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
      </div>
      <div className={styles['social-media']}>
        <div className={styles['title']}>
          <p>Соціальне</p>
        </div>
        <div className={styles['social-buttons']}>
          <Link
            href={'https://github.com/fictadvisor'}
            style={{ height: '36px', width: '36px' }}
          >
            <Button
              text={socialLabels[0].text}
              startIcon={socialLabels[0].icon}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link
            href={'https://www.instagram.com/fiotkpi/'}
            style={{ height: '36px', width: '36px' }}
          >
            <Button
              text={socialLabels[1].text}
              startIcon={socialLabels[1].icon}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={{}} style={{ height: '36px', width: '36px' }}>
            <Button
              text={socialLabels[2].text}
              startIcon={socialLabels[2].icon}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
