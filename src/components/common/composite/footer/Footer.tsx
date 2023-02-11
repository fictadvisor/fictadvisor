import React from 'react';
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
      <div className={styles['link-container']}>
        <div className={styles['main-references']}>
          <div className={styles['title']}>
            <p>Основні посилання</p>
          </div>
          <Link href={{}}>
            <Button
              text="Головна"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Опитування"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Викладачі"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Предмети"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Розклад"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
        </div>
        <div className={styles['support']}>
          <div className={styles['title']}>
            <p>Підтримка</p>
          </div>
          <Link href={{}}>
            <Button
              text="Конфіденційність"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
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
          <Link href={{}}>
            <Button
              text="GitHub"
              icon={<GitHubIcon />}
              iconPosition={ButtonIconPosition.LEFT}
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Instagram"
              icon={<InstagramIcon />}
              iconPosition={ButtonIconPosition.LEFT}
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Telegram"
              icon={<TelegramIcon />}
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
