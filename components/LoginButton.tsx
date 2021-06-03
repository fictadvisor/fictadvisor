import { useRouter } from 'next/router';
import { useAuthentication } from "../lib/context/AuthenticationContext";
import { tryTelegramLogin } from '../lib/login';
import Button, { ButtonProperties } from "./ui/Button";
import LoginIcon from "./ui/icons/LoginIcon";

export type LoginButtonProperties = {
  authentication: ReturnType<typeof useAuthentication>;
} & ButtonProperties;

const LoginButton = ({ authentication, ...props }: LoginButtonProperties) => {
  const router = useRouter();

  return (
    <a className="simple">
      <Button 
        title="Авторизуватись"
        onClick={async () => {
          const logged = await tryTelegramLogin(authentication);

          if (!logged) {
            router.push(authentication.loginUrl);
          }
        }}
        {...props}
        >
          <LoginIcon style={{ width: '18px', height: '18px', margin: '-2px -8px 0' }} />
      </Button>
    </a>
  );
};

export default LoginButton;
