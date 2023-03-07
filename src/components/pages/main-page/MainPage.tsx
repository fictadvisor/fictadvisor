import React from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import BannerImage from 'public/assets/main-page/BannerImage';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import Loader from '@/components/common/ui/loader';
import { StudentResourcesAPI } from '@/lib/api/student-resources/StudentResourcesAPI';

import ResourceCard from './components/ResourceCard';

import styles from './MainPage.module.scss';
const MainPage = () => {
  const { isLoading, data } = useQuery(
    ['resources'],
    StudentResourcesAPI.getAll,
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <PageLayout description={'Головна сторінка'} hasFooter={true}>
      <div className={styles['main-page']}>
        <div className={styles['main-page-content']}>
          <div className={styles['header']}>
            <div className={styles['header-info']}>
              <div className={styles['header-info-content']}>
                <h2>Твій студентський портал</h2>
                <p>
                  Мега текст що розповість про проект, що на ньому буде і тд і
                  ще текст і ще текст і ще текст і ще текст і ще текст і ще
                  текст і ще текст і ще текст і ще текст і ще текст
                </p>
                <div className={styles['buttons']}>
                  <div className={styles['buttons-desk']}>
                    <Link href={'/register'}>
                      <Button
                        text="Доєднатись"
                        disabled={false}
                        color={ButtonColor.PRIMARY}
                        variant={ButtonVariant.FILLED}
                        size={ButtonSize.LARGE}
                      />
                    </Link>
                    <hr className={styles['button-divider']} />
                    <Link href={'/poll'}>
                      <Button
                        text={'Пройти Опитування 2022'}
                        disabled={false}
                        variant={ButtonVariant.OUTLINE}
                        size={ButtonSize.LARGE}
                      />
                    </Link>
                  </div>
                  <div className={styles['buttons-tabl']}>
                    <Link href={'/register'}>
                      <Button
                        text="Доєднатись"
                        disabled={false}
                        color={ButtonColor.PRIMARY}
                        variant={ButtonVariant.FILLED}
                        size={ButtonSize.MEDIUM}
                      />
                    </Link>
                    <hr className={styles['button-divider']} />
                    <Link href={'/poll'}>
                      <Button
                        text={'Пройти Опитування 2022'}
                        disabled={false}
                        variant={ButtonVariant.OUTLINE}
                        size={ButtonSize.MEDIUM}
                      />
                    </Link>
                  </div>
                  <div className={styles['buttons-mob']}>
                    <Link href={'/register'}>
                      <Button
                        text="Доєднатись"
                        disabled={false}
                        color={ButtonColor.PRIMARY}
                        variant={ButtonVariant.FILLED}
                        size={ButtonSize.SMALL}
                      />
                    </Link>
                    <Link href={'/poll'}>
                      <Button
                        text={'Опитування 2022'}
                        disabled={false}
                        variant={ButtonVariant.OUTLINE}
                        size={ButtonSize.SMALL}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['build-image']}>
              <BannerImage />
            </div>
          </div>
          <div className={styles['resources']}>
            <h3>Студентські ресурси</h3>
            <div className={styles['resource-card-container']}>
              <div className={styles['resources-cards']}>
                {isLoading ? (
                  <Loader />
                ) : (
                  data?.studentResources.map(({ name, id, icon, link }) => (
                    <div className={styles['card-holder']} key={id}>
                      <ResourceCard text={name} image={icon} href={link} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MainPage;
