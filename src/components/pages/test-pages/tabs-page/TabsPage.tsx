import React, { useState } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

import {
  TabItem,
  TabItemContentPosition,
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
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          isDisabled={true}
          position={TabItemContentPosition.CENTER}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          isDisabled={true}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          count={1}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          isDisabled={true}
          count={1}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          count={1}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          isDisabled={true}
          count={1}
          icon={<AcademicCapIcon />}
        ></TabItem>

        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.LEFT}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          isDisabled={true}
          position={TabItemContentPosition.LEFT}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.LEFT}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-normal"
          text="Tab"
          position={TabItemContentPosition.LEFT}
          isDisabled={true}
          icon={<AcademicCapIcon />}
        ></TabItem>

        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          isDisabled={true}
          position={TabItemContentPosition.CENTER}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          isDisabled={true}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          count={1}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          isDisabled={true}
          count={1}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          count={1}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.CENTER}
          isDisabled={true}
          count={1}
          icon={<AcademicCapIcon />}
        ></TabItem>

        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.LEFT}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          isDisabled={true}
          position={TabItemContentPosition.LEFT}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.LEFT}
          icon={<AcademicCapIcon />}
        ></TabItem>
        <TabItem
          className="tab-small"
          text="Tab"
          position={TabItemContentPosition.LEFT}
          isDisabled={true}
          icon={<AcademicCapIcon />}
        ></TabItem>

        {<p>---------------------------------------</p>}

        <TabList className="tab-list" onChange={setIndex}>
          <TabItem
            className="tab-normal"
            text="Tab"
            position={TabItemContentPosition.CENTER}
            value={'1'}
          ></TabItem>
          <TabItem
            className="tab-normal"
            text="Tab"
            position={TabItemContentPosition.CENTER}
            value={'2'}
          ></TabItem>
          <TabItem
            className="tab-normal"
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
