import Link from "next/link";
import { useState } from "react";
import useComponentVisible from "../../lib/component";
import Button from "../ui/Button";
import { Divider } from "../ui/Divider";
import SettingsIcon from "../ui/icons/SettingsIcon";
import { SearchInput } from "../ui/SearchInput";

const MENU = {
  navigation: [
    {
      text: 'Головна',
      href: '/',
    },
    {
      text: 'Викладачі',
      href: '/teachers',
    },
    {
      text: 'Предмети',
      href: '/',
    },
    {
      text: 'Допомога',
      href: '/',
    }
  ],
  actions: [
    {
      icon: () => <span style={{ margin: '0 -8px' }}><SettingsIcon style={{ marginTop: '-2px' }} /></span>,
      href: ''
    },
    {
      text: 'Вийти',
      href: ''
    }
  ]
};

const MenuItem = ({ item, setMenuActive }) => {
  const Icon = item.icon;

  return (
    <div className="item">
      <Link href={item.href}>
        <a>
          <Button onClick={() => setMenuActive(false)}>
            {
              Icon 
                ? <Icon />
                : item.text
            }
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default function PageHeader() {
  const [searchText, setSearchText] = useState('');
  const { ref: menuRef, ignoreRef: menuBtnRef, isComponentVisible: menuActive, setIsComponentVisible: setMenuActive } = useComponentVisible(false);

  const searchActive = searchText.length > 0;

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
              {
                MENU.actions.map((t, index) => <MenuItem key={index} item={t} setMenuActive={setMenuActive} />)
              }
            </div>
          </div>
        }
      </div>

      <div className="right">

      </div>
    </div>
  );
};