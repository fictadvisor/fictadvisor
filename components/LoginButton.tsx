import { useAuthentication } from "../lib/context/AuthenticationContext";
import Button, { ButtonProperties } from "./ui/Button";
import LoginIcon from "./ui/icons/LoginIcon";

export type LoginButtonProperties = {
  authentication: ReturnType<typeof useAuthentication>;
} & ButtonProperties;

const LoginButton = ({ authentication, ...props }: LoginButtonProperties) => {
  return (
    <a className="simple" href={authentication.loginUrl}>
      <Button 
        title="Авторизуватись"
        {...props}
        >
          <LoginIcon style={{ width: '18px', height: '18px', margin: '-2px -8px 0' }} />
      </Button>
    </a>
  );
};

export default LoginButton;
