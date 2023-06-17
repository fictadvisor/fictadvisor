import React from 'react';
import { Box } from '@mui/material';

import { Captain } from '@/components/common/icons/Captain';
import Tab from '@/components/common/ui/tab-mui/tab';
import TabContext from '@/components/common/ui/tab-mui/tab-context';
import TabList from '@/components/common/ui/tab-mui/tab-list';

import * as styles from './MUITabPage.styles';
const TabsPage = () => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Box sx={{ mt: '20px' }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={styles.normalButton} label="Tab" value="1" />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                value="2"
                disabled={true}
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                textPosition="left"
                value="3"
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                textPosition="left"
                value="4"
                disabled={true}
              />
              <Tab sx={styles.smallButton} label="Tab" value="5" />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                value="6"
                disabled={true}
              />
              <Tab
                textPosition="left"
                sx={styles.smallButton}
                label="Tab"
                value="7"
              />
              <Tab
                sx={styles.smallButton}
                textPosition="left"
                label="Tab"
                value="8"
                disabled={true}
              />
            </TabList>
          </TabContext>
        </Box>
        <Box sx={{ mt: '20px' }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={styles.normalButton}
                icon={<Captain />}
                label="Tab"
                value="1"
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                icon={<Captain />}
                value="2"
                disabled={true}
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                icon={<Captain />}
                textPosition="left"
                value="3"
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                icon={<Captain />}
                textPosition="left"
                value="4"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<Captain />}
                value="5"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<Captain />}
                value="6"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<Captain />}
                textPosition="left"
                value="7"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<Captain />}
                textPosition="left"
                value="8"
                disabled={true}
              />
            </TabList>
          </TabContext>
        </Box>
        <Box sx={{ mt: '20px' }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={styles.normalButton} label="Tab" count={1} value="1" />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                count={1}
                value="2"
                disabled={true}
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                count={1}
                textPosition="left"
                value="3"
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                count={1}
                textPosition="left"
                value="4"
                disabled={true}
              />
              <Tab sx={styles.smallButton} label="Tab" count={1} value="5" />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                value="6"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                textPosition="left"
                value="7"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                textPosition="left"
                value="8"
                disabled={true}
              />
            </TabList>
          </TabContext>
        </Box>
        <Box sx={{ mt: '20px' }}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={styles.normalButton}
                icon={<Captain />}
                label="Tab"
                count={1}
                value="1"
              />
              <Tab
                sx={styles.normalButton}
                icon={<Captain />}
                label="Tab"
                count={1}
                value="2"
                disabled={true}
              />
              <Tab
                sx={styles.normalButton}
                icon={<Captain />}
                label="Tab"
                count={1}
                textPosition="left"
                value="3"
              />
              <Tab
                sx={styles.normalButton}
                icon={<Captain />}
                label="Tab"
                count={1}
                textPosition="left"
                value="4"
                disabled={true}
              />
              <Tab
                icon={<Captain />}
                sx={styles.smallButton}
                label="Tab"
                count={1}
                value="5"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                icon={<Captain />}
                value="6"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                icon={<Captain />}
                textPosition="left"
                value="7"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                icon={<Captain />}
                textPosition="left"
                value="8"
                disabled={true}
              />
            </TabList>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default TabsPage;
