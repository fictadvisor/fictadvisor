import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
import LoginForm from '@/components/pages/login-page/components/right-block/components/login-form';
import LoginTelegramButton from '@/components/pages/login-page/components/right-block/components/login-telegram-button';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  return (
    <div>
      <h3 className={styles['register-header']}>З поверненням!</h3>
      <Divider text="або" textPosition={DividerTextPosition.CENTER} />
      <LoginTelegramButton />
      <LoginForm />
    </div>
  );
};

export default RightBlock;
