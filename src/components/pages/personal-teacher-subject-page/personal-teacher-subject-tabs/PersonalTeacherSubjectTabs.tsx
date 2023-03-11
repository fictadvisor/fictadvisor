import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
import { GetTeacherSubjectsDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectsDTO';

import styles from './PersonalTeacherSubjectTabs.module.scss';
export type PersonalTeacherTabsProps = GetTeacherSubjectsDTO;

const TabsPage = () => {
  const [index, setIndex] = useState<string>('1');
  const router = useRouter();
  return (
    <div className={styles['tabs']}>
      <div className={styles['karusel']}>
        <TabList
          className={styles['tab-list-desktop']}
          onChange={setIndex}
          currentValue={index}
        >
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
            text="Відгуки"
            position={TabItemContentPosition.LEFT}
            count={0}
            value={'2'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.NORMAL}
            className="tab-item"
            text="Семестри"
            position={TabItemContentPosition.LEFT}
            value={'3'}
          ></TabItem>
        </TabList>
        <TabList
          className={styles['tab-list-mobile']}
          onChange={setIndex}
          currentValue={index}
        >
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Загальне"
            position={TabItemContentPosition.LEFT}
            value={'1'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Відгуки"
            position={TabItemContentPosition.LEFT}
            count={0}
            value={'2'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Семестри"
            position={TabItemContentPosition.LEFT}
            value={'3'}
          ></TabItem>
        </TabList>
      </div>

      <TabPanelsList className={styles['tab-panels-list']} currentValue={index}>
        <TabPanel className="tab-panel" value={'1'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитування буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
                onClick={() => router.push('/poll')}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => router.push('/poll')}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel className="tab-panel" value={'2'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитування буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
                onClick={() => router.push('/poll')}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => router.push('/poll')}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel className="tab-panel" value={'3'}>
          <div className={styles['my-tab-panel']}>
            <div className={styles['text']}>
              <p>
                Статистика викладача ще збирається, як тільки опитування буде
                завершене, результат буде опублікований. Опитування буде
                впродовж 2 тижнів. Ви можете пройти опитування.
              </p>
            </div>
            <div className={styles['button-wrapper-desktop']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.LARGE}
                onClick={() => router.push('/poll')}
              />
            </div>
            <div className={styles['button-wrapper-mobile']}>
              <Button
                text={'Пройти опитування'}
                variant={ButtonVariant.FILLED}
                color={ButtonColor.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => router.push('/poll')}
              />
            </div>
          </div>
        </TabPanel>
      </TabPanelsList>
    </div>
  );
};

export default TabsPage;
