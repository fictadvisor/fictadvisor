import Link from "next/link";
import config from "../../config";
import { useComponentVisible } from "../../lib/component";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import GlobalSearch from "../GlobalSearch";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Button from "../ui/Button";

export const MENU = {
  navigation: config.menu,
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
  const { ref: menuRef, ignoreRef: menuBtnRef, isComponentVisible: menuActive, setIsComponentVisible: setMenuActive } = useComponentVisible(false);

  return (
    <div className="header">
      <div className="left">
        <div className="logo">
          <Link href="/">
            <a className="simple">
              <img src={config.logo} />
            </a>
          </Link>
        </div>
      </div>

      <div className={`navigation-menu-blackout ${menuActive ? 'active' : ''}`} />

      <div className="content">
        <div className="logo-md">
          <Link href="/">
            <a className="simple">
              <img src={config.logo} />
            </a>
          </Link>
        </div>
        <div className="flex full-width">
          <GlobalSearch />
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
