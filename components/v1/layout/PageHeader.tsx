import Link from "next/link";
import config from "../../../config";
import GlobalSearch from "../GlobalSearch";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Button from "../ui/Button";
import {useAuthentication} from "../../../lib/v1/context/AuthenticationContext";
import {useComponentVisible} from "../../../lib/v1/component";

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
      <Link href={item.href} legacyBehavior>
        <Button onClick={() => setMenuActive(false)}>{Icon ? <Icon /> : item.text}</Button>
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
          <div>
            <Link href="/" className="simple" legacyBehavior>

              <img src={config.logo}  alt="logo"/>

            </Link>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="logo-md">
          <Link href="/" className="simple" legacyBehavior>

            <img src={config.logo}  alt="logo"/>

          </Link>
        </div>
        <div className="navigation d-flex w-full">
          <GlobalSearch />
          <div className="d-flex">
            <Button innerRef={menuBtnRef} onClick={() => setMenuActive(!menuActive)}>Меню</Button>
            {
              authentication.user 
                ? <LogoutButton className="only-compact d-flex m-l" compact={true} authentication={authentication} />
                : <LoginButton style={{ marginLeft: '10px' }} authentication={authentication} />
            }
          </div>
        </div>
        {
          menuActive &&
          <div style={{ position: 'relative' }}>
            <div ref={menuRef} className="navigation-menu">
              <div>
                {
                  MENU.navigation.map(t => <MenuItem key={t.text} item={t} setMenuActive={setMenuActive} />)
                }
              </div>
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
