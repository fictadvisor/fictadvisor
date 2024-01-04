import { useState } from 'react';
import { TabPanel } from '@mui/lab';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import { Dropdown } from '@/components/common/ui/form';
import Tab from '@/components/common/ui/tab/tab';
import TabContext from '@/components/common/ui/tab/tab-context';
import TabList from '@/components/common/ui/tab/tab-list/TabList';
import useTabState from '@/hooks/use-tab-state';

import * as styles from './TabSection.styles';

export enum CalendarPageTabs {
  STUDENT = 'student',
  SESSION = 'session',
  EDUCATOR = 'educator',
}

export const TabSection = () => {
  const router = useRouter();
  const { query } = router;
  const { tab } = query;

  const [index, setIndex] = useState(CalendarPageTabs.STUDENT);
  const handleChange = useTabState({
    tab,
    router,
    setIndex,
  });

  return (
    <Box sx={styles.tabBox}>
      <TabContext value={index}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          scrollButtons={false}
          sx={styles.tabList}
        >
          <Tab label="Студент" value={CalendarPageTabs.STUDENT} />
          <Tab label="Сесія" value={CalendarPageTabs.SESSION} />
          <Tab label="Викладач" value={CalendarPageTabs.EDUCATOR} />
        </TabList>
        <TabPanel value={CalendarPageTabs.STUDENT}>
          <Dropdown
            value={''}
            onChange={() => {}}
            width={'calc(280px - 16px)'}
            placeholder="NO LABEL MFCKRS"
            options={[{ label: 'l1', id: 'id1' }]}
            label="Група"
            showRemark={false}
          />
        </TabPanel>
        <TabPanel value={CalendarPageTabs.SESSION}>
          <Dropdown
            value={''}
            onChange={() => {}}
            width={'calc(280px - 16px)'}
            placeholder="NO LABEL MFCKRS"
            options={[{ label: 'l1', id: 'id1' }]}
            label="Група"
            showRemark={false}
          />
        </TabPanel>
        <TabPanel value={CalendarPageTabs.EDUCATOR}>
          <Dropdown
            value={''}
            onChange={() => {}}
            width={'calc(280px - 16px)'}
            placeholder="NO LABEL MFCKRS"
            options={[{ label: 'l1', id: 'id1' }]}
            label="Викладач"
            showRemark={false}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
