import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Popup from '@/components/common/ui/pop-ups-mui/Popup';
import useAuthentication from '@/hooks/use-authentication';
import AuthAPI from '@/lib/api/auth/AuthAPI';
import UserAPI from '@/lib/api/user/UserAPI';
import AuthService from '@/lib/services/auth';
import StorageUtil from '@/lib/utils/StorageUtil';
import { showAlert } from '@/redux/reducers/alert.reducer';

interface TokenPopupProps {
  token: string;
}

const TokenPopup: FC<TokenPopupProps> = ({ token }) => {
  const router = useRouter();
  const { user, isLoggedIn, update } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const loadData = useCallback(
    async (token: string) => {
      const { isRegistered } = await AuthAPI.checkRegisterTelegram(token);
      if (isRegistered) {
        setIsOpen(true);
      } else {
        dispatch(
          showAlert({
            title: 'Поганий токен!',
            color: AlertColor.ERROR,
          }),
        );
        if (isLoggedIn) await router.push('/account');
        else await router.push('/register');
      }
    },
    [dispatch, isLoggedIn, router],
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
        dispatch(
          showAlert({
            title: 'Telegram успішно приєднано!',
            color: AlertColor.SUCCESS,
          }),
        );
        await router.push('/account');
      } else {
        dispatch(
          showAlert({
            title: 'Telegram успішно приєднано, дозаповни усі поля!',
            color: AlertColor.SUCCESS,
          }),
        );
        await router.push('/register');
      }
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Не вдалось підключити Telegram, спробуй ще раз',
          color: AlertColor.ERROR,
        }),
      );
    } finally {
      setIsOpen(false);
    }
  }, [dispatch, isLoggedIn, router, update, user.id]);

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
