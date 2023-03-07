import React, { useState } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

import {
  TabItem,
  TabItemContentPosition,
  TabItemContentSize,
} from '@/components/common/ui/tab/tab-item/TabItem';
import { TabList } from '@/components/common/ui/tab/tab-list/TabList';
import { TabPanel } from '@/components/common/ui/tab/tab-panel/TabPanel';
import { TabPanelsList } from '@/components/common/ui/tab/tab-panels-list/TabPanelsList';

import styles from '../test-pages.module.scss';

const TabsPage = () => {
  const [index, setIndex] = useState<string>('1');
  return (
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <TabList className="tab-list" onChange={setIndex}>
          <TabItem
            size={TabItemContentSize.NORMAL}
            className="tab-item"
            text="Tab"
            position={TabItemContentPosition.CENTER}
            value={'1'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Tab"
            position={TabItemContentPosition.CENTER}
            value={'2'}
          ></TabItem>
          <TabItem
            size={TabItemContentSize.SMAll}
            className="tab-item"
            text="Tab"
            position={TabItemContentPosition.CENTER}
            icon={<AcademicCapIcon />}
            value={'3'}
          ></TabItem>
        </TabList>
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
