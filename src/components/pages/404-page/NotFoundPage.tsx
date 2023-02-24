import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button';
import Button, { ButtonSize } from '@/components/common/ui/button';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <PageLayout description={'Сторінку не знайдено'}>
    <div className={styles['page-layout']}>
      <nav className={styles['navbar']}></nav>
      <div className={styles['page-content']}>
        <h5 className={styles['not-found-text']}>
          Упс! Сторінку не знайдено. Жабка з’їла твою сторінку
        </h5>
        <img
          src="/assets/404-page/404_and_frog.svg"
          className={styles['frog-image']}
          alt="Це 404"
        />
        <div className={styles['button-desktop']}>
          <Button
            text={'Повернутися на голову'}
            size={ButtonSize.LARGE}
            startIcon={<ChevronLeftIcon className={'icon'} />}
          />
        </div>
        <div className={styles['button-mobile']}>
          <Button
            text={'Повернутися на голову'}
            size={ButtonSize.SMALL}
            startIcon={<ChevronLeftIcon className={'icon'} />}
          />
        </div>
      </div>
      <div className={styles['alert-button']}>
        <AlertButton
          text={"Звя'жіться з адміністратором"}
          variant={AlertButtonVariant.ERROR_FILLED}
          startIcon={<ExclamationTriangleIcon className={'icon'} />}
        />
      </div>
    </div>
  </PageLayout>
);

export default NotFoundPage;
