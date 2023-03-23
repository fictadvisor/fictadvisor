import React from 'react';
import Link from 'next/link';

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
  const isMobile = useIsMobile(768);
  const socialLabels = isMobile
    ? [
        {
          text: '',
          icon: <TelegramIcon />,
          url: 'https://t.me/fict_time',
        },
        {
          text: '',
          icon: <InstagramIcon />,
          url: 'https://www.instagram.com/sr_fiot/',
        },
        {
          text: '',
          icon: <GitHubIcon />,
          url: 'https://github.com/fictadvisor/',
        },
      ]
    : [
        {
          text: 'GitHub',
          icon: <GitHubIcon />,
          url: 'https://github.com/fictadvisor/',
        },
        {
          text: 'Instagram',
          icon: <InstagramIcon />,
          url: 'https://www.instagram.com/sr_fiot/',
        },
        {
          text: 'Telegram',
          icon: <TelegramIcon />,
          url: 'https://t.me/fict_time',
        },
      ];

  return (
    <div className={styles['footer-container']}>
      <div className={styles['footer-logo-container']}>
        <div className={styles['footer-logo']}>
          <Link href={'/'}>
            <img src={`/assets/logo.png`} alt="logo" />
          </Link>
        </div>

        <div className={styles['signature']}>
          <p>By Dev-відділ СР ФІОТ</p>
        </div>
      </div>
      <div className={styles['main-references']}>
        <div className={styles['title']}>
          <p>Основні посилання</p>
        </div>
        <Link href={'/'} style={{ height: '36px' }}>
          <Button
            style={{ paddingLeft: '12px' }}
            text="Головна"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>

        <Link href={'/poll'} style={{ height: '36px' }}>
          <Button
            style={{ paddingLeft: '12px' }}
            text="Опитування"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={'/teachers'} style={{ height: '36px' }}>
          <Button
            style={{ paddingLeft: '12px' }}
            text="Викладачі"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={'/subjects'} style={{ height: '36px' }}>
          <Button
            style={{ paddingLeft: '12px' }}
            // style={{ height: '36px', padding: '8px 12px' }}
            text="Предмети"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
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
        <Link href={'/privacy'} style={{ height: '36px' }}>
          <Button
            style={{ paddingLeft: '12px' }}
            text="Конфіденційність"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={'https://t.me/fict_robot'} style={{ height: '36px' }}>
          <Button
            style={{ paddingLeft: '12px' }}
            text="FICT robot"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
      </div>
      <div className={styles['social-media']}>
        <div className={styles['title']}>
          <p>Соцмережі</p>
        </div>
        <div className={styles['social-buttons']}>
          <Link
            style={{ height: '36px', width: '36px' }}
            href={socialLabels[0].url}
          >
            <Button
              style={{ paddingLeft: '12px' }}
              text={socialLabels[0].text}
              startIcon={socialLabels[0].icon}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link
            href={socialLabels[1].url}
            style={{ height: '36px', width: '36px' }}
          >
            <Button
              style={{ paddingLeft: '12px' }}
              text={socialLabels[1].text}
              startIcon={socialLabels[1].icon}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link
            href={socialLabels[2].url}
            style={{ height: '36px', width: '36px' }}
          >
            <Button
              style={{ paddingLeft: '12px' }}
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
