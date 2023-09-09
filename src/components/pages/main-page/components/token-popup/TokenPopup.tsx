import { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import UserAPI from '@/lib/api/user/UserAPI';
import AuthService from '@/lib/services/auth';
import StorageUtil from '@/lib/utils/StorageUtil';

interface TokenPopupProps {
  token: string;
}

const TokenPopup: FC<TokenPopupProps> = ({ token }) => {
  const { displayError } = useToastError();
  const router = useRouter();
  const { user, isLoggedIn, update } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const loadData = useCallback(
    async (token: string) => {
      const { isRegistered } = await AuthAPI.checkRegisterTelegram(token);
      if (isRegistered) {
        setIsOpen(true);
      } else {
        toast.error('Поганий токен!');

        if (isLoggedIn) await router.push('/account');
        else await router.push('/register');
      }
    },
    [isLoggedIn, router],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  const handleClick = useCallback(async () => {
    try {
      await AuthService.registerTelegram();
      if (isLoggedIn) {
        await UserAPI.linkTelegram(user.id, {
          ...StorageUtil.getTelegramInfo().telegram,
        });
        await update();
        StorageUtil.deleteTelegramInfo();
        toast.success('Telegram успішно приєднано!');

        await router.push('/account');
      } else {
        toast.success('Telegram успішно приєднано, дозаповни усі поля!');
        await router.push('/register');
      }
    } catch (error) {
      displayError(error);
    } finally {
      setIsOpen(false);
    }
  }, [isLoggedIn, router, update]);

  if (!isOpen) return null;

  return (
    <Popup
      open={isOpen}
      title="Підключи Telegram"
      text="Натисни, щоб підключити Telegram"
      onClose={() => setIsOpen(false)}
      firstButton={
        <Button
          size={ButtonSize.MEDIUM}
          text="Прийняти"
          color={ButtonColor.PRIMARY}
          variant={ButtonVariant.FILLED}
          onClick={handleClick}
        />
      }
    />
  );
};

export default TokenPopup;
