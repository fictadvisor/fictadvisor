import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className={styles['frog-image']}>
        <Image src="/icons/404-page/404-frog.svg" alt="Це 404" fill />
      </div>
      <div className={styles['button']}>
        <Link href={'/'}>
          <Button
            text={'Повернутися на головну'}
            size={ButtonSize.LARGE}
            color={ButtonColor.SECONDARY}
            startIcon={<ChevronLeftIcon className={'icon'} />}
          />
        </Link>
        <Link href={'https://t.me/fict_robot'}>
          <Button
            text={"Зв'язатися з адміністратором"}
            size={ButtonSize.LARGE}
          />
        </Link>
      </div>
    </div>
  </PageLayout>
);

export default NotFoundPage;
