import React, { useState } from 'react';

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
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <div className={styles['karusel']}>
          <TabList className={styles['tab-list']} onChange={setIndex}>
            <TabItem
              size={TabItemContentSize.NORMAL}
              className="tab-item"
              text="Загальне"
              position={TabItemContentPosition.LEFT}
              value={'1'}
            ></TabItem>
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
              count={-15}
              value={'3'}
            ></TabItem>
            <TabItem
              size={TabItemContentSize.SMAll}
              className="tab-item"
              text="Семестри"
              position={TabItemContentPosition.LEFT}
              value={'4'}
            ></TabItem>
          </TabList>
        </div>
        <TabPanelsList className="tab-panels-list" currentValue={index}>
          <TabPanel className="tab-panel" value={'1'}>
            Apple
          </TabPanel>
          <TabPanel className="tab-panel" value={'2'}>
            Computer
          </TabPanel>
          <TabPanel className="tab-panel" value={'3'}>
            Iphone
          </TabPanel>
        </TabPanelsList>
      </div>
    </div>
  );
};

export default TabsPage;
