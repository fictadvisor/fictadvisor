import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';

import { DividerTextPosition } from '@/components/common/ui/divider/Divider';

import PageLayout from '../../common/layout/page-layout/PageLayout';
import Button, { ButtonColor, ButtonVariant } from '../../common/ui/button';
import { ButtonSize } from '../../common/ui/button/Button';
import Check from '../../common/ui/checkbox';
import Divider from '../../common/ui/divider';
import Input, { InputSize, InputType } from '../../common/ui/input/Input';
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
                size={ButtonSize.MEDIUM}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className={styles['right-block']}>
          <div className={styles['right-block__content']}>
            <h3 className={styles['register-header']}>З поверненням!</h3>
            <Button
              startIcon={<HeartIcon className="icon" />}
              text="Увійти за допомогою Telegram"
              size={ButtonSize.LARGE}
              variant={ButtonVariant.FILLED}
              color={ButtonColor.PRIMARY}
            />
            <Divider text="або" textPosition={DividerTextPosition.CENTER} />
            <Input
              name={'email'}
              className={styles['login-input']}
              label={'Пошта або юзернейм'}
              placeholder={'placeholder'}
              size={InputSize.LARGE}
              type={InputType.DEFAULT}
            />
            <Input
              label={'Пароль'}
              placeholder={'placeholder'}
              size={InputSize.LARGE}
              type={InputType.PASSWORD}
              name="password"
            />
            <div className={styles['one-line']}>
              <div className={styles['checkbox-container']}>
                <Check />
                <p className="body-primary">Запам’ятати дані</p>
              </div>
              <CustomLink text="Забув пароль?" href={'#'} />
            </div>
            <Button
              text="Увійти"
              size={ButtonSize.LARGE}
              variant={ButtonVariant.FILLED}
              color={ButtonColor.PRIMARY}
            />
            <div className={styles['placeholder']}></div>
            <Button
              startIcon={<ArrowLeftIcon className="icon" />}
              text="Повернутись до головної"
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default LoginPage;
