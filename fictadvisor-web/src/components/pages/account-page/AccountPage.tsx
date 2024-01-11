'use client';

import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  FireIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

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
import createQueryString from '@/utils/createQueryString';

import * as stylesMui from './AccountPage.styles';

const AccountPage = () => {
  const { replace, push } = useRouter();
  const pathname = usePathname() as string;
  const { isLoggedIn } = useAuthentication();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const tab = searchParams.get('tab') as string;
  const [index, setIndex] = useState<AccountPageTab>(AccountPageTab.GENERAL);
  useEffect(() => {
    if (!Object.values(AccountPageTab).includes(tab as AccountPageTab)) {
      push(
        pathname +
          createQueryString('tab', AccountPageTab.GENERAL, searchParams),
      );
    } else {
      setIndex(tab as AccountPageTab);
    }
  }, [tab, searchParams, replace]);

  useEffect(() => {
    if (!isLoggedIn) void replace('/login?~account');
  }, [isLoggedIn, replace]);

  const handleChange = async (event: SyntheticEvent, value: AccountPageTab) => {
    push(pathname + createQueryString('tab', value, searchParams));

    setIndex(value);
  };

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
