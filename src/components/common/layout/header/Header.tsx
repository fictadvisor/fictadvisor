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
  const { isLoggedIn, user } = useAuthentication();
  const name = [user?.lastName, user?.firstName, user?.middleName].join(' ');
  const groupName = user?.group.state === 'APPROVED' ? user?.group.code : null;
  const position = roleMapper[user?.group.role];
  const avatar = user?.avatar;
  const isMobile = useIsMobile(1200);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(isOpen => !isOpen);
  };
  const mobileMenu = (
    <div className={styles['mobile-menu']}>
      <Link href={'/'} onClick={handleClick}>
        <TabItem
          className=""
          text="Головна"
          position={TabItemContentPosition.LEFT}
          icon={<HomeIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
      <Link href={'/poll'} onClick={handleClick}>
        <TabItem
          className=""
          text="Опитування"
          position={TabItemContentPosition.LEFT}
          icon={<ClipboardIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
      <Link href={'/teachers'} onClick={handleClick}>
        <TabItem
          className=""
          text="Викладачі"
          position={TabItemContentPosition.LEFT}
          icon={<BriefcaseIcon />}
          size={TabItemContentSize.SMAll}
        />
      </Link>
      <Link href={'/subjects'} onClick={handleClick}>
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

  if (isMobile && isLoggedIn) {
    return isOpen ? (
      <div className={styles['wrapper']}>
        <div className={styles['shadow']} onClick={handleClick}></div>
        <div
          className={styles['header-container']}
          style={{ backgroundColor: '#1e1e1e' }}
        >
          <Link href={'/'}>
            <div className={styles['header-logo']}>
              <img src={`/assets/logo.png`} alt="logo" />
            </div>
          </Link>

          <div className={styles['mobile-button']}>
            <CloseButton
              onClick={handleClick}
              size={IconButtonSize.MEDIUM}
              color={IconButtonColor.TRANSPARENT}
            />
          </div>
        </div>
        <div className={styles['drop']}>
          <Link href={'/account'} onClick={handleClick}>
            <HeaderMobileCard
              name={name}
              groupName={groupName}
              position={position}
              url={avatar}
            />
          </Link>
          <div className={styles['account-buttons']}>
            <Link href={'/account?tab=general'} onClick={handleClick}>
              <TabItem
                className=""
                text="Загальне"
                position={TabItemContentPosition.LEFT}
                icon={<AcademicCapIcon />}
                size={TabItemContentSize.SMAll}
              />
            </Link>
            <Link href={'/account?tab=security'} onClick={handleClick}>
              <TabItem
                className=""
                text="Безпека"
                position={TabItemContentPosition.LEFT}
                icon={<LockClosedIcon />}
                size={TabItemContentSize.SMAll}
              />
            </Link>
            <Link href={'/account?tab=group'} onClick={handleClick}>
              <TabItem
                className=""
                text="Група"
                position={TabItemContentPosition.LEFT}
                icon={<UsersIcon />}
                size={TabItemContentSize.SMAll}
              />
            </Link>
          </div>

          <HeaderDivider />

          {mobileMenu}
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <Link href={'/'}>
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
        </Link>
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
    return isOpen ? (
      <div className={styles['wrapper']}>
        <div className={styles['shadow']} onClick={handleClick}></div>
        <div
          className={styles['header-container']}
          style={{ backgroundColor: '#1e1e1e' }}
        >
          <Link href={'/'}>
            <div className={styles['header-logo']}>
              <img src={`/assets/logo.png`} alt="logo" />
            </div>
          </Link>
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
              <Link href={'/register'}>
                <Button
                  text="Зареєструватись"
                  size={ButtonSize.SMALL}
                  variant={ButtonVariant.OUTLINE}
                />
              </Link>
            </div>
            <div style={{ width: '120px' }}>
              <Link href={'/login'}>
                <Button
                  text="Увійти"
                  size={ButtonSize.SMALL}
                  variant={ButtonVariant.FILLED}
                />
              </Link>
            </div>
          </div>

          <HeaderDivider />

          {mobileMenu}
        </div>
      </div>
    ) : (
      <div className={styles['header-container']}>
        <Link href={'/'}>
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
        </Link>
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
        <Link href={'/'}>
          <div className={styles['header-logo']}>
            <img src={`/assets/logo.png`} alt="logo" />
          </div>
        </Link>
        <div className={styles['menu']}>
          <Link href={'/'}>
            <Button
              text="Головна"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={'/poll'}>
            <Button
              text="Опитування"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={'/teachers'}>
            <Button
              text="Викладачі"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
          <Link href={'/subjects'}>
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
        {isLoggedIn ? (
          <div className={styles['header-desktop-card']}>
            <Link href={'/account'}>
              <HeaderDesktopCard
                name={name}
                groupName={groupName}
                position={position}
                url={avatar}
              />
            </Link>
          </div>
        ) : (
          <div className={styles['login-buttons']}>
            <Link href={'/register'}>
              <Button
                text="Зареєструватись"
                size={ButtonSize.SMALL}
                variant={ButtonVariant.OUTLINE}
              />
            </Link>
            <Link href={'/login'}>
              <Button
                text="Увійти"
                size={ButtonSize.SMALL}
                variant={ButtonVariant.FILLED}
              />
            </Link>
          </div>
        )}
      </div>
    )
  );
};

export default Header;
