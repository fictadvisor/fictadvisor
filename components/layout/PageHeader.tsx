import Link from "next/link";
import { useState } from "react";
import { useComponentVisible } from "../../lib/component";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import Button from "../ui/Button";
import Divider from "../ui/Divider";
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

const getUnauthorizedActions = (authentication) => {
  return (
    <>
      <a href={authentication.loginUrl}><Button>Авторизуватись</Button></a>
    </>
  );
};

const getName = ({ username, first_name, last_name }) => {
  if (username) {
    return username;
  }

  return last_name ? `${first_name} ${last_name}` : first_name;
};

const getAuthorizedActions = (authentication) => {
  const name = getName(authentication.user);

  return (
    <>
      <Button disabled style={{ borderRadius: '8px 0 0 8px', borderRight: '1px solid #323D4D' }}>
        <span style={{ margin: '0 -8px' }}><SettingsIcon style={{ marginTop: '-2px' }} /></span>
      </Button>
      <Button style={{ borderRadius: '0', borderRight: '1px solid #323D4D' }}>
        {name}
      </Button>
      <Link href={authentication.logoutUrl}>
        <a>
          <Button style={{ borderRadius: '0 8px 8px 0' }}>
            Вийти
          </Button>
        </a>
      </Link>
    </>
  );
};

const PageHeader = () => {
  const authentication = useAuthentication();
  const [searchText, setSearchText] = useState('');
  const { ref: menuRef, ignoreRef: menuBtnRef, isComponentVisible: menuActive, setIsComponentVisible: setMenuActive } = useComponentVisible(false);

  const searchActive = searchText.length > 0;
  const actions = authentication.user ? getAuthorizedActions(authentication) : getUnauthorizedActions(authentication);

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
          <Button innerRef={menuBtnRef} className="accent" onClick={() => setMenuActive(!menuActive)}>Меню</Button>
        </div>
        {
          menuActive &&
          <div ref={menuRef} className="navigation-menu">
            <div>
              {
                MENU.navigation.map(t => <MenuItem key={t.text} item={t} setMenuActive={setMenuActive} />)
              }
            </div>
            <Divider />
            <div>
              {actions}
            </div>
          </div>
        }
      </div>

      <div className="right">

      </div>
    </div>
  );
};

export default PageHeader;
