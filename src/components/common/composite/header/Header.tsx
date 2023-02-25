import React from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ClipboardIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import useIsMobile from '@/hooks/use-is-mobile/UseIsMobile';

import { BurgerMenu } from '../../custom-svg/BurgerMenu';
import { XMark } from '../../custom-svg/XMark';
import Divider, { DividerTextPosition } from '../../ui/divider/Divider';
import { TabContentPosition } from '../../ui/tab';
import Tab from '../../ui/tab/Tab';
import { HeaderCard } from '../cards';

import styles from './Header.module.scss';

interface HeaderProps {
  name: string;
  groupName: string;
  position: string;
  isLoggined?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  name,
  groupName,
  position,
  isLoggined = false,
}) => {
  //1031-1033px, 1065, 977 - possible breakpoint
  const isMobile = useIsMobile();
  const mobileUnloggined = '';
  const mobileLoggined = '';
  const clicked = true;

  if (isMobile) {
    return clicked ? (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <div
          className={styles['header-container']}
          style={{ position: 'relative', backgroundColor: '#1E1E1E' }}
        >
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
          <div className={styles['mobile-button']}>
            <Button
              size={ButtonSize.MEDIUM}
              text={''}
              variant={ButtonVariant.TEXT}
              startIcon={<XMark />}
            ></Button>
          </div>
        </div>
        <div className={styles['login-buttons']}>
          <div className={styles['first-button']} style={{ width: '192px' }}>
            <Button
              text="Зареєструватись"
              size={ButtonSize.SMALL}
              variant={ButtonVariant.OUTLINE}
            />
          </div>
          <div className={styles['second-button']} style={{ width: '120px' }}>
            <Button
              text="Увійти"
              size={ButtonSize.SMALL}
              variant={ButtonVariant.FILLED}
            />
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '-35px' }}>
          <Divider></Divider>
        </div>
        <div className={styles['mobile-menu']}>
          <Tab
            className=""
            text="Головна"
            position={TabContentPosition.CENTRE}
            icon={<HomeIcon />}
          />
          <Tab
            className=""
            text="Опитування"
            position={TabContentPosition.CENTRE}
            icon={<ClipboardIcon />}
          />
          <Tab
            className=""
            text="Викладачі"
            position={TabContentPosition.CENTRE}
            icon={<BriefcaseIcon />}
          />
          <Tab
            className=""
            text="Предмети"
            position={TabContentPosition.CENTRE}
            icon={<AcademicCapIcon />}
          />
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['mobile-button']}>
          <Button
            size={ButtonSize.MEDIUM}
            text={''}
            variant={ButtonVariant.TEXT}
            startIcon={<BurgerMenu />}
          ></Button>
        </div>
      </div>
    );
  }
  if (!isMobile) {
    return (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>

        <div className={styles['menu']}>
          <Link href={{}}>
            <Button
              text="Головна"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Опитування"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Викладачі"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={{}}>
            <Button
              text="Предмети"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
        </div>
        {isLoggined ? (
          <div>
            <HeaderCard
              name={name}
              groupName={groupName}
              position={position}
            ></HeaderCard>
          </div>
        ) : (
          <div className={styles['login-buttons']}>
            <div className={styles['first-button']}>
              <Button
                text="Зареєструватись"
                size={ButtonSize.SMALL}
                variant={ButtonVariant.OUTLINE}
              />
            </div>
            <div className={styles['second-button']}>
              <Button
                text="Увійти"
                size={ButtonSize.SMALL}
                variant={ButtonVariant.FILLED}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Header;
