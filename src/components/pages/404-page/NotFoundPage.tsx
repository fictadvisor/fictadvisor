import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import Button, { ButtonSize } from '@/components/common/ui/button';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <PageLayout description={'Сторінку не знайдено'}>
    <div className={styles['not-found-page']}>
      <nav className={styles['navigation']}></nav>
      <div className={styles['main-info']}>
        <div className={styles['main-content']}>
          <h5 className={styles['not-found-text']}>
            Упс! Сторінку не знайдено. Жабка з’їла твою сторінку
          </h5>
          <img
            src="/assets/404-page/404_and_frog.svg"
            className={styles['not-found-image']}
            alt="Це 404"
          />
          <div className={styles['not-found-button']}>
            <Button
              text={'Повернутися на голову'}
              size={ButtonSize.LARGE}
              startIcon={<ChevronLeftIcon className={'icon'} />}
            />
          </div>
          <div className={styles['not-found-button-mobile']}>
            <Button
              text={'Повернутися на голову'}
              size={ButtonSize.SMALL}
              startIcon={<ChevronLeftIcon className={'icon'} />}
            />
          </div>
        </div>
        <div className={styles['not-found-alert-button']}>
          <AlertButton
            text={"Зв'жіться з адміністратором"}
            variant={AlertButtonVariant.ERROR_FILLED}
            startIcon={<CustomCheck />}
          />
        </div>
      </div>
    </div>
  </PageLayout>
);

export default NotFoundPage;
