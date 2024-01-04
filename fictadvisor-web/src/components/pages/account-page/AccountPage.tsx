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
import Tab from '@/components/common/ui/tab/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import TabContext from '@/components/common/ui/tab/tab-context';
import TabList from '@/components/common/ui/tab/tab-list';
import TabPanel from '@/components/common/ui/tab/tab-panel';
import GeneralTab from '@/components/pages/account-page/components/general-tab';
import GroupTab from '@/components/pages/account-page/components/group-tab';
import SecurityTab from '@/components/pages/account-page/components/security-tab';
import SelectiveTab from '@/components/pages/account-page/components/selective-tab';
import {
  AccountPagesMapper,
  AccountPageTab,
} from '@/components/pages/account-page/types';
import useAuthentication from '@/hooks/use-authentication';

import * as stylesMui from './AccountPage.styles';

const AccountPage = () => {
  const { replace, query, isReady } = useRouter();
  const { isLoggedIn } = useAuthentication();
  const { tab } = query;
  const [index, setIndex] = useState<AccountPageTab>(AccountPageTab.GENERAL);

  useEffect(() => {
    if (!isReady) return;

    if (!Object.values(AccountPageTab).includes(tab as AccountPageTab)) {
      void replace(
        { query: { ...query, tab: AccountPageTab.GENERAL } },
        undefined,
        {
          shallow: true,
        },
      );
    } else {
      setIndex(tab as AccountPageTab);
    }
  }, [tab, isReady, query, replace]);

  useEffect(() => {
    if (!isLoggedIn) void replace('/login?~account');
  }, [isLoggedIn, replace]);

  const handleChange = async (event: SyntheticEvent, value: AccountPageTab) => {
    await replace({ query: { ...query, tab: value } }, undefined, {
      shallow: true,
    });
    console.log(value);
    setIndex(value);
  };
  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <>
      <Box sx={stylesMui.breadcrumb}>
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
      </Box>
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
