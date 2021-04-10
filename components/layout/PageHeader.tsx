import Link from "next/link";
import { useState } from "react";
import { useComponentVisible } from "../../lib/component";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Button from "../ui/Button";
import Divider from "../ui/Divider";
import LoginIcon from "../ui/icons/LoginIcon";
import LogoutIcon from "../ui/icons/LogoutIcon";
import SettingsIcon from "../ui/icons/SettingsIcon";
import SearchInput from "../ui/SearchInput";

const MENU = {
  navigation: [
    { text: 'Головна', href: '/' },
    { text: 'Викладачі', href: '/teachers' },
    { text: 'Предмети', href: '/subjects' },
    { text: 'Допомога', href: '/help' }
  ],
};

const MenuItem = ({ item, action = null, setMenuActive }) => {
  const Icon = item.icon;

  if (action) {
    return (
      <Button 
        onClick={() => { 
          action(); 
          setMenuActive(false); 
        }}
      >
        {Icon ? <Icon /> : item.text}
      </Button>
    );
  }

  return (
    <div className="item">
      <Link href={item.href}>
        <a><Button onClick={() => setMenuActive(false)}>{Icon ? <Icon /> : item.text}</Button></a>
      </Link>
    </div>
  );
};

const PageHeader = () => {
  const authentication = useAuthentication();
  const [searchText, setSearchText] = useState('');
  const { ref: menuRef, ignoreRef: menuBtnRef, isComponentVisible: menuActive, setIsComponentVisible: setMenuActive } = useComponentVisible(false);

  const searchActive = searchText.length > 0;

  const UserActionButton = authentication.user ? LogoutButton : LoginButton;

  return (
    <div className="header">
      <div className="left">
        <div className="logo">
          <Link href="/">
            <a className="simple">
              <img src="/assets/logo.png" />
            </a>
          </Link>
        </div>
      </div>

      <div className={`navigation-menu-blackout ${menuActive ? 'active' : ''}`} />

      <div className="content">
        <div className="logo-md">
          <Link href="/">
            <a className="simple">
              <img src="/assets/logo.png" />
            </a>
          </Link>
        </div>
        <div className="flex full-width">
          <SearchInput 
            active={searchActive} 
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Пошук викладачів, предметів та іншої інформації" 
            style={{ flex: 1, marginRight: '10px' }}
          />
          <Button innerRef={menuBtnRef} onClick={() => setMenuActive(!menuActive)}>Меню</Button>
          {
            authentication.user 
              ? <LogoutButton className="only-compact" compact={true} style={{ display: 'flex', marginLeft: '10px' }} authentication={authentication} />
              : <LoginButton style={{ marginLeft: '10px' }} authentication={authentication} />
          }
        </div>
        {
          menuActive &&
          <div ref={menuRef} className="navigation-menu">
            <div>
              {
                MENU.navigation.map(t => <MenuItem key={t.text} item={t} setMenuActive={setMenuActive} />)
              }
            </div>
          </div>
        }
      </div>

      <div className="right">
        {
          authentication.user &&
          <LogoutButton compact={true} style={{ width: 'fit-content', margin: '0 auto' }} authentication={authentication} />
        }
      </div>
    </div>
  );
};

export default PageHeader;
