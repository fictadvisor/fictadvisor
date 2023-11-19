import { Box, Drawer, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as styles from './AdminPanel.styles';
import { adminPanelTabs } from './constants';

const AdminPanel = () => {
  const router = useRouter();

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
            <Link href={tab.link}>
              <Box sx={styles.tab(index, tab.link, router.pathname)}>
                <Box sx={styles.tabIcon}>{tab.icon}</Box>
                <Typography sx={styles.tabText}>{tab.text}</Typography>
              </Box>
            </Link>
          ) : (
            <Typography sx={styles.pollPartHeader}>{tab}</Typography>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default AdminPanel;
