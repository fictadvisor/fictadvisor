import React, { FC, useState } from 'react';
import Link from 'next/link';

import { SimpleCard } from '@/components/common/composite/cards';
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

import styles1 from '../../search-pages/SearchPage.module.scss';
import styles from './PersonalTeacherTabs.module.scss';
export type PersonalTeacherTabsProps = {
  id: string;
  subjects: {
    id: string;
    name: string;
  }[];
};

const TabsPage: FC<PersonalTeacherTabsProps> = props => {
  const [index, setIndex] = useState<string>('1');
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
            text="Предмети"
            position={TabItemContentPosition.LEFT}
            value={'2'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.NORMAL}
            className="tab-item"
            text="Відгуки"
            position={TabItemContentPosition.LEFT}
            count={0}
            value={'3'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.NORMAL}
            className="tab-item"
            text="Семестри"
            position={TabItemContentPosition.LEFT}
            value={'4'}
          />
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
          />
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Предмети"
            position={TabItemContentPosition.LEFT}
            value={'2'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Відгуки"
            position={TabItemContentPosition.LEFT}
            count={0}
            value={'3'}
          />
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Семестри"
            position={TabItemContentPosition.LEFT}
            value={'4'}
          />
        </TabList>
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
        <TabPanel className={styles['tab-panel']} value={'2'}>
          <div className={styles['my-tab-panel-subjects']}>
            <ul className={styles1['subject-search-list']}>
              {props.subjects &&
                props.subjects.map(subject => (
                  <li key={subject.id}>
                    <Link
                      href={`/discipline?teacherId=${props.id}&subjectId=${subject.id}`}
                    >
                      <SimpleCard name={`${subject.name}`} />
                    </Link>
                  </li>
                ))}
            </ul>
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
