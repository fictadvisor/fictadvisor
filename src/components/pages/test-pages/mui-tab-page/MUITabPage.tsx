import React from 'react';
import { Box } from '@mui/material';

import { CaptainIcon } from '@/components/common/custom-svg/CaptainIcon';
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
                icon={<CaptainIcon />}
                label="Tab"
                value="1"
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                icon={<CaptainIcon />}
                value="2"
                disabled={true}
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                icon={<CaptainIcon />}
                textPosition="left"
                value="3"
              />
              <Tab
                sx={styles.normalButton}
                label="Tab"
                icon={<CaptainIcon />}
                textPosition="left"
                value="4"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<CaptainIcon />}
                value="5"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<CaptainIcon />}
                value="6"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<CaptainIcon />}
                textPosition="left"
                value="7"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                icon={<CaptainIcon />}
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
                icon={<CaptainIcon />}
                label="Tab"
                count={1}
                value="1"
              />
              <Tab
                sx={styles.normalButton}
                icon={<CaptainIcon />}
                label="Tab"
                count={1}
                value="2"
                disabled={true}
              />
              <Tab
                sx={styles.normalButton}
                icon={<CaptainIcon />}
                label="Tab"
                count={1}
                textPosition="left"
                value="3"
              />
              <Tab
                sx={styles.normalButton}
                icon={<CaptainIcon />}
                label="Tab"
                count={1}
                textPosition="left"
                value="4"
                disabled={true}
              />
              <Tab
                icon={<CaptainIcon />}
                sx={styles.smallButton}
                label="Tab"
                count={1}
                value="5"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                icon={<CaptainIcon />}
                value="6"
                disabled={true}
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                icon={<CaptainIcon />}
                textPosition="left"
                value="7"
              />
              <Tab
                sx={styles.smallButton}
                label="Tab"
                count={1}
                icon={<CaptainIcon />}
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
