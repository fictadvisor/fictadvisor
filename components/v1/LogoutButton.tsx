import Link from "next/link";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import oauth from '../../lib/oauth';
import Button from "./ui/Button";
import LogoutIcon from "./ui/icons/LogoutIcon";
import SettingsIcon from "./ui/icons/SettingsIcon";

export type LogoutButtonProperties = {
  authentication: ReturnType<typeof useAuthentication>;
  compact?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const getName = ({ username, first_name, last_name }) => {
  if (username) {
    return username;
  }

  return last_name ? `${first_name} ${last_name}` : first_name;
};

const LogoutButton = ({ authentication, compact, ...props }: LogoutButtonProperties) => {
  const name = getName(authentication.user);
  return (
    <div className="d-flex" {...props}>
      <Button 
        disabled 
        title="У розробці"
        style={{ borderRadius: '8px 0 0 8px', borderRight: '1px solid #323D4D' }}
      >
        <SettingsIcon style={{ margin: '-2px -8px 0' }} />
      </Button>
      <Button 
        title={name}
        className="no-hover"
        style={{ borderRadius: '0', borderRight: '1px solid #323D4D', padding: '8px 14px' }}
      >
        <img src={authentication.user.image} style={{ width: '24px', height: '24px', margin: '0 0 0 0', borderRadius: '50%' }} />
      </Button>
      {
        !compact &&
        <Button 
          className="no-hover"
          style={{ borderRadius: '0', borderRight: '1px solid #323D4D', padding: '14px 24px 14px 24px' }}
        >
          {name}
        </Button>
      }
      <Button 
        title="Вийти"
        style={{ borderRadius: '0 8px 8px 0' }}
        onClick={() => {
          oauth.logout();
          authentication.update();
        }}
      >
          <LogoutIcon style={{ width: '18px', height: '18px', margin: '-2px -8px 0' }} />
      </Button>
    </div>
  );
};

export default LogoutButton;
