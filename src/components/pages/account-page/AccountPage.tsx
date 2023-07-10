import { SyntheticEvent, useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  FireIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Tab from '@/components/common/ui/tab-mui/tab';
import { TabTextPosition } from '@/components/common/ui/tab-mui/tab/types';
import TabContext from '@/components/common/ui/tab-mui/tab-context';
import TabList from '@/components/common/ui/tab-mui/tab-list';
import TabPanel from '@/components/common/ui/tab-mui/tab-panel';
import GeneralTab from '@/components/pages/account-page/components/general-tab';
import GroupTab from '@/components/pages/account-page/components/group-tab';
import SecurityTab from '@/components/pages/account-page/components/security-tab';
import SelectiveTab from '@/components/pages/account-page/components/selective-tab';
import useAuthentication from '@/hooks/use-authentication';

import * as stylesMui from './AccountPage.styles';

import styles from './AccountPage.module.scss';

enum AccountPageTab {
  GENERAL = 'general',
  SECURITY = 'security',
  GROUP = 'group',
  SELECTIVE = 'selective',
}

const AccountPagesMapper = {
  group: 'Група',
  security: 'Безпека',
  general: 'Загальне',
  selective: 'Мої вибіркові',
};

const AccountPage = () => {
  const { replace, query, isReady } = useRouter();

  const { tab } = query;
  const [index, setIndex] = useState<AccountPageTab>(AccountPageTab.GENERAL);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (Object.values(AccountPageTab).includes(tab as AccountPageTab)) {
      setIndex(tab as AccountPageTab);
    } else {
      void replace(
        { query: { ...query, tab: AccountPageTab.GENERAL } },
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [tab, isReady, query, replace]);

  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn) {
      void replace('/login?~account');
    }
  }, [isLoggedIn, replace]);

  const handleChange = async (event: SyntheticEvent, value: AccountPageTab) => {
    await replace({ query: { ...query, tab: value } }, undefined, {
      shallow: true,
    });
    setIndex(value);
  };

  return (
    <>
      <div className={styles['breadcrumb']}>
        <Breadcrumbs
          items={[
            {
              label: 'Головна',
              href: '/',
            },
            {
              label: AccountPagesMapper[index],
              href: '/account?tab=' + index,
            },
          ]}
        />
      </div>
      <Box sx={stylesMui.tabContext}>
        <TabContext value={index}>
          <TabList onChange={handleChange} sx={stylesMui.tabList}>
            <Tab
              label="Загальне"
              value={AccountPageTab.GENERAL}
              icon={<AcademicCapIcon />}
              textPosition={TabTextPosition.LEFT}
            />
            <Tab
              label="Безпека"
              value={AccountPageTab.SECURITY}
              icon={<LockClosedIcon />}
              textPosition={TabTextPosition.LEFT}
            />
            <Tab
              label="Група"
              value={AccountPageTab.GROUP}
              icon={<UsersIcon />}
              textPosition={TabTextPosition.LEFT}
            />
            <Tab
              label="Мої вибіркові"
              value={AccountPageTab.SELECTIVE}
              icon={<FireIcon />}
              textPosition={TabTextPosition.LEFT}
            />
          </TabList>
          {isLoggedIn && (
            <Box sx={stylesMui.tabPanelsList}>
              <TabPanel sx={stylesMui.tabPanel} value={AccountPageTab.GENERAL}>
                <GeneralTab />
              </TabPanel>
              <TabPanel sx={stylesMui.tabPanel} value={AccountPageTab.SECURITY}>
                <SecurityTab />
              </TabPanel>
              <TabPanel sx={stylesMui.tabPanel} value={AccountPageTab.GROUP}>
                <GroupTab />
              </TabPanel>
              <TabPanel
                sx={stylesMui.tabPanel}
                value={AccountPageTab.SELECTIVE}
              >
                <SelectiveTab />
              </TabPanel>
            </Box>
          )}
        </TabContext>
      </Box>
    </>
  );
};

export default AccountPage;
