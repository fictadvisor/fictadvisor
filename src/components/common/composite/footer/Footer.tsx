import React from 'react';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';

import { GitHubIcon } from '@/components/common/custom-svg/GitHub';
import { InstagramIcon } from '@/components/common/custom-svg/Instagram';
import { TelegramIcon } from '@/components/common/custom-svg/Telegram';
import Button, {
  ButtonIconPosition,
  ButtonSize,
  ButtonType,
} from '@/components/common/ui/button';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');
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
    <div className={styles['footer-container']}>
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
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Опитування"
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Викладачі"
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Предмети"
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="Розклад"
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
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
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text="FICT robot"
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
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
              icon={socialLabels[0].icon}
              iconPosition={ButtonIconPosition.LEFT}
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}} style={{ height: '36px', width: '36px' }}>
            <Button
              text={socialLabels[1].text}
              icon={socialLabels[1].icon}
              iconPosition={ButtonIconPosition.LEFT}
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}} style={{ height: '36px', width: '36px' }}>
            <Button
              text={socialLabels[2].text}
              icon={socialLabels[2].icon}
              iconPosition={ButtonIconPosition.LEFT}
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
