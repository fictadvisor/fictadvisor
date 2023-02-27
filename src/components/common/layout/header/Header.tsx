import React, { useState } from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ClipboardIcon,
  HomeIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import useIsMobile from '@/hooks/use-is-mobile/UseIsMobile';

import { HeaderCard } from '../../composite/cards';
import { BurgerMenu } from '../../custom-svg/BurgerMenu';
import { XMark } from '../../custom-svg/XMark';
import { TabItem, TabItemContentPosition } from '../../ui/tab';
import { TabItemContentSize } from '../../ui/tab/tab-item/TabItem';

import HeaderDivider from './components/header-divider/HeaderDivider';
import HeaderMobileButton from './components/header-mobile-button/HeaderMobileButton';
import { HeaderMobileCard } from './components/mobile-card/HeaderMobileCard';

import styles from './Header.module.scss';

interface HeaderProps {
  name?: string;
  groupName?: string;
  position?: string;
  isLoggined?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  name = 'Ярмоленко Єлизавета Миколаївна',
  groupName = 'ІС-11',
  position = 'Зам. ст',
  isLoggined = false,
}) => {
  const isMobile = useIsMobile(1101);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(clicked => !clicked);
  };

  if (isMobile && isLoggined) {
    return clicked ? (
      <div className={styles['wrapper']}>
        <div className={styles['shadow']} onClick={handleClick}></div>
        <div className={styles['header-container']}>
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
          <div className={styles['mobile-button']}>
            <HeaderMobileButton
              onClick={handleClick}
              size={ButtonSize.MEDIUM}
              text={''}
              variant={ButtonVariant.TEXT}
              startIcon={<XMark />}
            />
          </div>
        </div>
        <div className={styles['drop']}>
          <div>
            <HeaderMobileCard
              name={name}
              groupName={groupName}
              position={position}
            ></HeaderMobileCard>
          </div>
          <div className={styles['account-buttons']}>
            <TabItem
              className=""
              text="Загальне"
              position={TabItemContentPosition.LEFT}
              icon={<AcademicCapIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Безпека"
              position={TabItemContentPosition.LEFT}
              icon={<LockClosedIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Група"
              position={TabItemContentPosition.LEFT}
              icon={<UsersIcon />}
              size={TabItemContentSize.SMAll}
            />
          </div>

          <div style={{ width: '100%', marginTop: '-35px' }}>
            <HeaderDivider></HeaderDivider>
          </div>

          <div className={styles['mobile-menu']}>
            <TabItem
              className=""
              text="Головна"
              position={TabItemContentPosition.LEFT}
              icon={<HomeIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Опитування"
              position={TabItemContentPosition.LEFT}
              icon={<ClipboardIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Викладачі"
              position={TabItemContentPosition.LEFT}
              icon={<BriefcaseIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Предмети"
              position={TabItemContentPosition.LEFT}
              icon={<AcademicCapIcon />}
              size={TabItemContentSize.SMAll}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['mobile-button']}>
          <HeaderMobileButton
            onClick={handleClick}
            size={ButtonSize.MEDIUM}
            text={''}
            variant={ButtonVariant.TEXT}
            startIcon={<BurgerMenu />}
          />
        </div>
      </div>
    );
  }

  if (isMobile && !isLoggined) {
    return clicked ? (
      <div className={styles['wrapper']}>
        <div className={styles['header-container']}>
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
          <div className={styles['mobile-button']}>
            <HeaderMobileButton
              onClick={handleClick}
              size={ButtonSize.MEDIUM}
              text={''}
              variant={ButtonVariant.TEXT}
              startIcon={<XMark />}
            />
          </div>
        </div>
        <div className={styles['drop']}>
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
            <HeaderDivider></HeaderDivider>
          </div>
          <div className={styles['mobile-menu']}>
            <TabItem
              className=""
              text="Головна"
              position={TabItemContentPosition.LEFT}
              icon={<HomeIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Опитування"
              position={TabItemContentPosition.LEFT}
              icon={<ClipboardIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Викладачі"
              position={TabItemContentPosition.LEFT}
              icon={<BriefcaseIcon />}
              size={TabItemContentSize.SMAll}
            />
            <TabItem
              className=""
              text="Предмети"
              position={TabItemContentPosition.LEFT}
              icon={<AcademicCapIcon />}
              size={TabItemContentSize.SMAll}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['mobile-button']}>
          <HeaderMobileButton
            onClick={handleClick}
            size={ButtonSize.MEDIUM}
            text={''}
            variant={ButtonVariant.TEXT}
            startIcon={<BurgerMenu />}
          />
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
          {/* <Link href={{}}>
            <Button
              text="Розклад"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link> */}
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
