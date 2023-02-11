import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';

import PageLayout from '../../common/layout/page-layout/PageLayout';
import Button from '../../common/ui/button';
import {
  ButtonIconPosition,
  ButtonSize,
  ButtonType,
} from '../../common/ui/button/Button';
import Check, { CheckState } from '../../common/ui/check/Check';
import Divider from '../../common/ui/divider';
import Input, {
  InputSize,
  InputState,
  InputType,
} from '../../common/ui/input/Input';
import CustomLink from '../../common/ui/link';

import styles from './LoginPage.module.scss';

const LoginPage = () => (
  <PageLayout description={'Сторінка для авторизації'}>
    <div className={styles['login-page']}>
      <div className={styles['login-page__content']}>
        <div className={styles['left-block']}>
          <div className={styles['left-block__content']}>
            <img
              className={styles['login-logo']}
              src={'/assets/login-page/new_logo.png'}
              alt="fict advisor logo"
            />
            <h3 className={styles['register-text']}>
              Ти ще не знами?
              <br />
              Приєднуйся!
            </h3>
            <div className={styles['login-button-container']}>
              <Button
                text="Зарeєструватися"
                isDisabled={false}
                size={ButtonSize.MEDIUM}
                type={ButtonType.PRIMARY_RED}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className={styles['right-block']}>
          <div className={styles['right-block__content']}>
            <h3 className={styles['register-header']}>З поверненням!</h3>
            <Button
              icon={<HeartIcon className="icon" />}
              iconPosition={ButtonIconPosition.LEFT}
              text="Увійти за допомогою Telegram"
              isDisabled={false}
              size={ButtonSize.LARGE}
              type={ButtonType.PRIMARY_RED}
            />
            <Divider text="або" className={styles['login-divider']} />
            <Input
              className={styles['login-input']}
              label={'Пошта або юзернейм'}
              placeholder={'placeholder'}
              state={InputState.DEFAULT}
              size={InputSize.LARGE}
              type={InputType.DEFAULT}
            />
            <Input
              label={'Пароль'}
              placeholder={'placeholder'}
              state={InputState.DEFAULT}
              size={InputSize.LARGE}
              type={InputType.HIDDABLE}
              defaultRemark="Пароль повинен місити 8 символів та обов’язкові знаки"
            />
            <div className={styles['one-line']}>
              <div className={styles['checkbox-container']}>
                <Check state={CheckState.DEFAULT} />
                <p className="body-primary">Запам’ятати дані</p>
              </div>
              <CustomLink text="Забув пароль?" href={'#'} />
            </div>
            <Button
              text="Увійти"
              isDisabled={true}
              size={ButtonSize.LARGE}
              type={ButtonType.PRIMARY_RED}
            />
            <div className={styles['placeholder']}></div>
            <Button
              icon={<ArrowLeftIcon className="icon" />}
              iconPosition={ButtonIconPosition.LEFT}
              text="Повернутись до головної"
              isDisabled={false}
              size={ButtonSize.MEDIUM}
              type={ButtonType.TERTIARY}
            />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default LoginPage;
