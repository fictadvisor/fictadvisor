import React, { useCallback, useEffect } from 'react';

import { BuildImage } from '../../../../public/assets/main-page/BuildImage';
import PageLayout from '../../common/layout/page-layout/PageLayout';
import Button from '../../common/ui/button';
import { ButtonColor, ButtonSize, ButtonVariant } from '../../common/ui/button';

import ResourceCard from './components/ResourceCard';

import styles from './MainPage.module.scss';

const MainPage = () => {
  // let studentResources = [];
  // const loadData = useCallback(async () => {
  //   studentResources = StudentResourcesApi.getAll();
  // }, []);

  // useEffect(() => {
  //   void loadData();
  // }, [loadData]);

  return (
    <PageLayout description={'Головна сторінка'}>
      <div className={styles['main-page']}>
        <div className={styles['nav']}>navbar</div>
        <div className={styles['main-page-content']}>
          <div className={styles['header']}>
            <div className={styles['header-info']}>
              <h2>Твій студентський портал</h2>
              <p>
                Мега текст що розповість про проект, що на ньому буде і тд і ще
                текст і ще текст і ще текст і ще текст і ще текст і ще текст і
                ще текст і ще текст і ще текст і ще текст
              </p>
              <div className={styles['buttons']}>
                <div className={styles['buttons-desk']}>
                  <Button
                    text="Доєднатись"
                    disabled={false}
                    color={ButtonColor.PRIMARY}
                    variant={ButtonVariant.FILLED}
                    size={ButtonSize.LARGE}
                  />
                  <hr className={styles['button-divider']} />
                  <Button
                    text={'Пройти Опитування 2022'}
                    disabled={false}
                    variant={ButtonVariant.OUTLINE}
                    size={ButtonSize.LARGE}
                  />
                </div>
                <div className={styles['buttons-tabl']}>
                  <Button
                    text="Доєднатись"
                    disabled={false}
                    color={ButtonColor.PRIMARY}
                    variant={ButtonVariant.FILLED}
                    size={ButtonSize.MEDIUM}
                  />
                  <hr className={styles['button-divider']} />
                  <Button
                    text={'Пройти Опитування 2022'}
                    disabled={false}
                    variant={ButtonVariant.OUTLINE}
                    size={ButtonSize.MEDIUM}
                  />
                </div>
                <div className={styles['buttons-mob']}>
                  <Button
                    text="Доєднатись"
                    disabled={false}
                    color={ButtonColor.PRIMARY}
                    variant={ButtonVariant.FILLED}
                    size={ButtonSize.SMALL}
                  />
                  <hr className={styles['button-divider']} />
                  <Button
                    text={'Опитування 2022'}
                    disabled={false}
                    variant={ButtonVariant.OUTLINE}
                    size={ButtonSize.SMALL}
                  />
                </div>
              </div>
            </div>
            <div className={styles['build-image']}>
              <BuildImage />
            </div>
          </div>
          <div className={styles['resources']}>
            <h3>Студентські ресурси</h3>
            <div className={styles['resources-cards']}>
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
              <ResourceCard text={'FICT Time'} image={'/assets/resource.png'} />
            </div>
          </div>
        </div>
        <div className={styles['footer']}>footer</div>
      </div>
    </PageLayout>
  );
};

export default MainPage;
