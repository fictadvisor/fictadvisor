import { FC } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import Button, { ButtonSize } from '@/components/common/ui/button';
import authService from '@/lib/services/auth';

const LoginTelegramButton: FC = () => {
  const router = useRouter();
  const handleClick = async () => {
    await authService.loginTelegram();
    await router.push('/');
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

export default LoginTelegramButton;
