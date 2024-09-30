'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import UserAPI from '@/lib/api/user/UserAPI';
import TelegramService from '@/lib/services/telegram/TelegramService';
import StorageUtil from '@/lib/utils/StorageUtil';

const TokenPopup = () => {
  const { displayError } = useToastError();
  const router = useRouter();
  const { user } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const loadData = useCallback(
    async (token: string) => {
      const { isRegistered } = await AuthAPI.checkRegisterTelegram(token);
      if (isRegistered) {
        setIsOpen(true);
      } else {
        toast.error('Поганий токен!');

        if (user) {
          router.push('/account');
        } else {
          router.push('/register');
        }
      }
    },
    [user, router],
  );

  useEffect(() => {
    if (token) void loadData(token);
  }, [loadData, token]);

  const handleClick = useCallback(async () => {
    try {
      await TelegramService.register();
      if (user) {
        await UserAPI.linkTelegram(user.id, {
          ...StorageUtil.getTelegramInfo().telegram,
        });
        // await update();
        //  update: async () => {
        //         setJwt(StorageUtil.getTokens());
        //         await refetch();
        //       },
        StorageUtil.deleteTelegramInfo();
        toast.success('Telegram успішно приєднано!');

        router.push('/account');
      } else {
        toast.success('Telegram успішно приєднано, дозаповни усі поля!');
        router.push('/register');
      }
    } catch (error) {
      displayError(error);
    } finally {
      setIsOpen(false);
    }
  }, [user, router]);

  if (!isOpen) return null;

  return (
    <Popup
      open={isOpen}
      title="Підключи Telegram"
      content="Натисни, щоб підключити Telegram"
      onClose={() => setIsOpen(false)}
      sx={{ display: token ? 'block' : 'none' }}
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
