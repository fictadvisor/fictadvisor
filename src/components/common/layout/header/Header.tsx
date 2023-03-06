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
import { useRouter } from 'next/router';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import useAuthentication from '@/hooks/use-authentication';
import useIsMobile from '@/hooks/use-is-mobile/UseIsMobile';

import { BurgerMenu } from '../../custom-svg/BurgerMenu';
import {
  IconButton,
  IconButtonColor,
  IconButtonSize,
} from '../../ui/icon-button/IconButton';
import { CloseButton } from '../../ui/icon-button/variants';
import { TabItem, TabItemContentPosition } from '../../ui/tab';
import { TabItemContentSize } from '../../ui/tab/tab-item/TabItem';

import { HeaderDesktopCard } from './components/header-desktop-card';
import HeaderDivider from './components/header-divider/HeaderDivider';
import { HeaderMobileCard } from './components/header-mobile-card/HeaderMobileCard';

import styles from './Header.module.scss';

const roleMapper = {
  ['CAPTAIN']: 'Староста',
  ['MODERATOR']: 'Зам. старости',
  ['STUDENT']: 'Студент',
};

const Header: React.FC = () => {
  const router = useRouter();

  const { isLoggedIn, user } = useAuthentication();
  const name = [user?.lastName, user?.firstName, user?.middleName].join(' ');
  const groupName = user?.group.code;
  const position = roleMapper[user?.role];
  const avatar = user?.avatar;

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
  const returnLogin = () => {
    router.push('/login');
  };
  const returnRegister = () => {
    router.push('/register');
  };
  const isMobile = useIsMobile(1200);
  const [clicked, setClicked] = useState(false);
  const mobileMenu = (
    <div className={styles['mobile-menu']}>
      <Link href={'/'}>
        <TabItem
          className=""
          text="Головна"
          position={TabItemContentPosition.LEFT}
          icon={<HomeIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
      <Link href={'/poll'}>
        <TabItem
          className=""
          text="Опитування"
          position={TabItemContentPosition.LEFT}
          icon={<ClipboardIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
      <Link href={'/teachers'}>
        <TabItem
          className=""
          text="Викладачі"
          position={TabItemContentPosition.LEFT}
          icon={<BriefcaseIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
      <Link href={'/subjects'}>
        <TabItem
          className=""
          text="Предмети"
          position={TabItemContentPosition.LEFT}
          icon={<AcademicCapIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
    </div>
  );

  const handleClick = () => {
    setClicked(clicked => !clicked);
  };

  if (isMobile && isLoggedIn) {
    return clicked ? (
      <div className={styles['wrapper']}>
        <div className={styles['shadow']} onClick={handleClick}></div>
        <div
          className={styles['header-container']}
          style={{ backgroundColor: '#1e1e1e' }}
        >
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
          <div className={styles['mobile-button']}>
            <CloseButton
              onClick={handleClick}
              size={IconButtonSize.MEDIUM}
              color={IconButtonColor.TRANSPARENT}
            />
          </div>
        </div>
        <div className={styles['drop']}>
          <div>
            <HeaderMobileCard
              name={name}
              groupName={groupName}
              position={position}
              url={avatar}
            />
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

          <HeaderDivider />

          {mobileMenu}
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['mobile-button']}>
          <IconButton
            onClick={handleClick}
            size={IconButtonSize.MEDIUM}
            color={IconButtonColor.TRANSPARENT}
            icon={<BurgerMenu />}
          />
        </div>
      </div>
    );
  }

  if (isMobile && !isLoggedIn) {
    return clicked ? (
      <div className={styles['wrapper']}>
        <div className={styles['shadow']} onClick={handleClick}></div>
        <div
          className={styles['header-container']}
          style={{ backgroundColor: '#1e1e1e' }}
        >
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
          <div className={styles['mobile-button']}>
            <CloseButton
              onClick={handleClick}
              size={IconButtonSize.MEDIUM}
              color={IconButtonColor.TRANSPARENT}
            />
          </div>
        </div>
        <div className={styles['drop']}>
          <div className={styles['login-buttons']}>
            <div style={{ width: '192px' }}>
              <Button
                onClick={returnRegister}
                text="Зареєструватись"
                size={ButtonSize.SMALL}
                variant={ButtonVariant.OUTLINE}
              />
            </div>
            <div style={{ width: '120px' }}>
              <Button
                onClick={returnLogin}
                text="Увійти"
                size={ButtonSize.SMALL}
                variant={ButtonVariant.FILLED}
              />
            </div>
          </div>

          <HeaderDivider />

          {mobileMenu}
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['mobile-button']}>
          <IconButton
            onClick={handleClick}
            size={IconButtonSize.MEDIUM}
            color={IconButtonColor.TRANSPARENT}
            icon={<BurgerMenu />}
          />
        </div>
      </div>
    );
  }

  return (
    !isMobile && (
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <img src={`/assets/logo.png`} alt="logo" />
        </div>
        <div className={styles['menu']}>
          <div>
            <Button
              onClick={returnMain}
              text="Головна"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </div>

          <div>
            <Button
              onClick={returnPoll}
              text="Опитування"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </div>

          <div>
            <Button
              onClick={returnTeachers}
              text="Викладачі"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </div>

          <div>
            <Button
              onClick={returnSubjects}
              text="Предмети"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </div>

          {/* <Link href={{}}>
            <Button
              text="Розклад"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link> */}
        </div>
        {isLoggedIn ? (
          <div className={styles['header-desktop-card']}>
            <HeaderDesktopCard
              name={name}
              groupName={groupName}
              position={position}
              url={avatar}
            />
          </div>
        ) : (
          <div className={styles['login-buttons']}>
            <Button
              onClick={returnRegister}
              text="Зареєструватись"
              size={ButtonSize.SMALL}
              variant={ButtonVariant.OUTLINE}
            />
            <Button
              onClick={returnLogin}
              text="Увійти"
              size={ButtonSize.SMALL}
              variant={ButtonVariant.FILLED}
            />
          </div>
        )}
      </div>
    )
  );
};

export default Header;
