import React from 'react';
import { useQuery } from 'react-query';
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
  const socialLabels =
    window.innerWidth > 480
      ? ['GitHub', 'Instagram', 'Telegram']
      : ['', '', ''];
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
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text={socialLabels[0]}
            icon={<GitHubIcon />}
            iconPosition={ButtonIconPosition.LEFT}
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text={socialLabels[1]}
            icon={<InstagramIcon />}
            iconPosition={ButtonIconPosition.LEFT}
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
        <Link href={{}} style={{ height: '36px' }}>
          <Button
            text={socialLabels[2]}
            icon={<TelegramIcon />}
            iconPosition={ButtonIconPosition.LEFT}
            isDisabled={false}
            size={ButtonSize.MEDIUM}
            type={ButtonType.TERTIARY}
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
