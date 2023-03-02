import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import CustomTelegramIcon from '@/components/common/custom-svg/CustomTelegramIcon';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
import RegisterForm from '@/components/pages/register/register-page/components/register-form';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import authService from '@/lib/services/auth/AuthService';

import styles from './LeftBlock.module.scss';

const LeftBlock = () => {
  const { push } = useRouter();
  const handleClick = async () => {
    await authService.loginTelegram();
    await push('/');
  };

  const { isLoading, data } = useQuery(['groups'], () => GroupAPI.getAll(), {
    retry: true,
  });

  if (!isLoading) {
    return (
      <div className={styles['left-block']}>
        <img
          className={styles['mobile-register-logo']}
          src="/assets/login-page/new_logo.png"
          alt="fict advisor logo"
        />
        <h3 className={styles['login-header']}>Створи акаунт</h3>
        <Button
          endIcon={
            <div className="icon">
              <CustomTelegramIcon />
            </div>
          }
          text="Зареєструватися за допомогою"
          size={ButtonSize.SMALL}
          type="button"
          onClick={handleClick}
          className={styles['mobile-telegram-button']}
        />
        <Button
          startIcon={
            <div className="icon">
              <CustomTelegramIcon />
            </div>
          }
          text="Зареєструватися за допомогою Telegram"
          size={ButtonSize.LARGE}
          type="button"
          onClick={handleClick}
          className={styles['telegram-button']}
        />
        <Divider
          text="або"
          textPosition={DividerTextPosition.CENTER}
          className={styles['right-divider']}
        />
        <RegisterForm groups={data.groups || []} />
        <p className={styles['mobile-text']}>Вже маєш аккаунт?</p>
        <Button
          text="Увійти!"
          size={ButtonSize.SMALL}
          color={ButtonColor.SECONDARY}
          variant={ButtonVariant.OUTLINE}
          className={styles['login-mobile-button']}
          onClick={() => {
            void push('/login');
          }}
        />
      </div>
    );
  }
};

export default LeftBlock;
