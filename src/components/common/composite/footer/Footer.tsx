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
  const isMobile = useIsMobile();
  const socialLabels = isMobile
    ? [
        { text: '', icon: <TelegramIcon /> },
        { text: '', icon: <InstagramIcon /> },
        { text: '', icon: <GitHubIcon /> },
      ]
    : [
        { text: 'GitHub', icon: <GitHubIcon /> },
        { text: 'Instagram', icon: <InstagramIcon /> },
        { text: 'Telegram', icon: <TelegramIcon /> },
      ];
  return (
    <footer className={styles['footer-container']}>
      <div>
        <div className={styles['footer-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['signature']}>
          <p>By Dev відділ ср ФІОТ</p>
        </div>
      </div>
      <div className={styles['main-references']}>
        <div className={styles['title']}>
          <p>Основні посилання</p>
        </div>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Головна"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Опитування"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Викладачі"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Предмети"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Розклад"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
      </div>{' '}
      <div className={styles['support']}>
        <div className={styles['title']}>
          <p>Підтримка</p>
        </div>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Конфіденційність"
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
          />
        </Link>
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
          <Link href={{}} style={{ height: '36px', width: '36px' }}>
            <Button
              text={socialLabels[0].text}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
              startIcon={socialLabels[0].icon}
            />
          </Link>
          <Link href={{}} style={{ height: '36px', width: '36px' }}>
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
    </footer>
  );
};

export default Footer;
