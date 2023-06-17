import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Popup } from 'src/components/common/ui/popup';

import { AlertColor } from '@/components/common/ui/alert';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import useAuthentication from '@/hooks/use-authentication';
import { AuthAPI } from '@/lib/api/auth/AuthAPI';
import { UserAPI } from '@/lib/api/user/UserAPI';
import AuthService from '@/lib/services/auth';
import StorageUtil from '@/lib/utils/StorageUtil';
import { showAlert } from '@/redux/reducers/alert.reducer';

interface TokenPopupProps {
  token: string;
}
const TokenPopup: FC<TokenPopupProps> = ({ token }) => {
  const { push } = useRouter();
  const { user, isLoggedIn, update } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const loadData = useCallback(
    async token => {
      const { isRegistered } = await AuthAPI.checkRegisterTelegram(
        token as string,
      );
      if (isRegistered) {
        setIsOpen(true);
      } else {
        dispatch(
          showAlert({
            title: 'Поганий токен!',
            color: AlertColor.ERROR,
          }),
        );
        if (isLoggedIn) await push('/account');
        else await push('/register');
      }
    },
    [dispatch, isLoggedIn, push],
  );

  useEffect(() => {
    void loadData(token);
  }, [loadData, token]);

  const handleClick = async () => {
    try {
      await AuthService.registerTelegram();
      if (isLoggedIn) {
        await UserAPI.linkTelegram(user.id, {
          ...StorageUtil.getTelegramInfo().telegram,
        });
        update();
        StorageUtil.deleteTelegramInfo();
        dispatch(
          showAlert({
            title: 'Telegram успішно приєднано!',
            color: AlertColor.SUCCESS,
          }),
        );
        await push('/account');
      } else {
        dispatch(
          showAlert({
            title: 'Telegram успішно приєднано, дозаповни усі поля!',
            color: AlertColor.SUCCESS,
          }),
        );
        await push('/register');
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
  };

  return (
    isOpen && (
      <Popup
        isClosable={false}
        hasIcon
        isTelegramIcon
        title="Підключи Telegram"
        text="Натисни, щоб підключити Telegram"
        closeFunction={setIsOpen}
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
    )
  );
};

export default TokenPopup;
