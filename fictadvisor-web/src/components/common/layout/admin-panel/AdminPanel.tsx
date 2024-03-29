'use client';
import { Box, Drawer, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as styles from './AdminPanel.styles';
import { adminPanelTabs } from './constants';

const AdminPanel = () => {
  const pathname = usePathname() as string;
  return (
    <Drawer anchor="left" variant="permanent" sx={styles.drawer}>
      <Link href="/">
        <Image
          src={'/icons/logo.svg'}
          alt="FA logo"
          width={197}
          height={28}
          style={{
            margin: '16px 21px',
          }}
        />
      </Link>
      <Box sx={styles.tabList}>
        {adminPanelTabs.map((tab, index) => {
          return typeof tab !== 'string' ? (
            <Link href={tab.link} key={index}>
              <Box sx={styles.tab(index, tab.link, pathname)}>
                <Box sx={styles.tabIcon}>{tab.icon}</Box>
                <Typography sx={styles.tabText}>{tab.text}</Typography>
              </Box>
            </Link>
          ) : (
            <Typography sx={styles.pollPartHeader} key={index}>
              {tab}
            </Typography>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default AdminPanel;
