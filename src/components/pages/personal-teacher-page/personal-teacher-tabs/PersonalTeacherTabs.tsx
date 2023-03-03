import React, { useState } from 'react';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import {
  TabItem,
  TabItemContentPosition,
  TabItemContentSize,
} from '@/components/common/ui/tab/tab-item/TabItem';
import { TabList } from '@/components/common/ui/tab/tab-list/TabList';
import { TabPanel } from '@/components/common/ui/tab/tab-panel/TabPanel';
import { TabPanelsList } from '@/components/common/ui/tab/tab-panels-list/TabPanelsList';

import styles from './PersonalTeacherTabs.module.scss';

const TabsPage = () => {
  const [index, setIndex] = useState<string>('1');
  return (
    <div className={styles['tabs']}>
      <div className={styles['karusel']}>
        <div className={styles['test-tab-list']}>
          <TabList className={styles['tab-list']} onChange={setIndex}>
            <TabItem
              size={TabItemContentSize.NORMAL}
              className="tab-item"
              text="Загальне"
              position={TabItemContentPosition.LEFT}
              value={'1'}
            ></TabItem>
            <TabItem
              size={TabItemContentSize.NORMAL}
              className="tab-item"
              text="Предмети"
              position={TabItemContentPosition.LEFT}
              value={'2'}
            ></TabItem>
            <TabItem
              size={TabItemContentSize.NORMAL}
              className="tab-item"
              text="Відгуки"
              position={TabItemContentPosition.LEFT}
              count={-15}
              value={'3'}
            ></TabItem>
            <TabItem
              size={TabItemContentSize.NORMAL}
              className="tab-item"
              text="Семестри"
              position={TabItemContentPosition.LEFT}
              value={'4'}
            ></TabItem>
          </TabList>
        </div>
      </div>

      <TabPanelsList className={styles['tab-panels-list']} currentValue={index}>
        <TabPanel className="tab-panel" value={'1'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитувнання буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel className="tab-panel" value={'2'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитувнання буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel className="tab-panel" value={'3'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитувнання буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel className="tab-panel" value={'4'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитувнання буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
              />
            </div>
          </div>
        </TabPanel>
      </TabPanelsList>
    </div>
  );
};

export default TabsPage;
