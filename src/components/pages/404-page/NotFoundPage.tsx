import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import Button, { ButtonColor, ButtonSize } from '@/components/common/ui/button';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => (
  <PageLayout
    description={'Сторінку не знайдено'}
    hasFooter={false}
    className={styles['page-layout']}
  >
    <div className={styles['page-content']}>
      <h5 className={styles['not-found-text']}>
        Упс! Сторінку не знайдено. Жабка з’їла твою сторінку
      </h5>
      <img
        src="/assets/404-page/404_and_frog.svg"
        className={styles['frog-image']}
        alt="Це 404"
      />
      <div className={styles['button']}>
        <Button
          text={'Повернутися на головну'}
          size={ButtonSize.LARGE}
          color={ButtonColor.SECONDARY}
          startIcon={<ChevronLeftIcon className={'icon'} />}
        />
        <Button text={"Зв'язатися з адміністратором"} size={ButtonSize.LARGE} />
      </div>
    </div>
  </PageLayout>
);

export default NotFoundPage;
