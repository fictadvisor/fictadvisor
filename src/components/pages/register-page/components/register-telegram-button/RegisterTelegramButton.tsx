import { FC } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import Button, { ButtonSize } from '@/components/common/ui/button';
import AuthService from '@/lib/services/auth';

const RegisterTelegramButton: FC = () => {
  const router = useRouter();
  const handleClick = async () => {
    await AuthService.redirectToRegisterBot(router);
  };

  return (
    <Button
      startIcon={<HeartIcon className="icon" />}
      text="Увійти за допомогою Telegram"
      size={ButtonSize.LARGE}
      type="button"
      onClick={handleClick}
    />
  );
};

export default RegisterTelegramButton;
