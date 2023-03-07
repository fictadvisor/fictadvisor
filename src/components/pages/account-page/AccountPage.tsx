import React, { useEffect, useState } from 'react';
import {
  AcademicCapIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import {
  TabItem,
  TabItemContentPosition,
  TabList,
  TabPanel,
  TabPanelsList,
} from '@/components/common/ui/tab';
import { TabItemContentSize } from '@/components/common/ui/tab/tab-item/TabItem';
import GeneralTab from '@/components/pages/account-page/components/general-tab';
import GroupTab from '@/components/pages/account-page/components/group-tab';
import SecurityTab from '@/components/pages/account-page/components/security-tab';
import useAuthentication from '@/hooks/use-authentication';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './AccountPage.module.scss';

enum AccountPageTabs {
  GENERAL = 'general',
  SECURITY = 'security',
  GROUP = 'group',
}

const AccountPagesMapper = {
  group: 'Група',
  security: 'Безпека',
  general: 'Загальне',
};

const AccountPage = () => {
  const { push, query, isReady } = useRouter();

  const { tab } = query;
  const [index, setIndex] = useState<AccountPageTabs>(AccountPageTabs.GENERAL);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (Object.values(AccountPageTabs).includes(tab as AccountPageTabs)) {
      setIndex(tab as AccountPageTabs);
    } else {
      void push(
        { query: { ...query, tab: AccountPageTabs.GENERAL } },
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [tab, isReady, push, query]);

  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn) {
      void push('/login');
    }
  }, [isLoggedIn, push]);

  return (
    <PageLayout hasFooter={true}>
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
      <div className={styles['tabs-content']}>
        <TabList
          className={styles['tab-list']}
          onChange={async value => {
            await push({ query: { ...query, tab: value } }, undefined, {
              shallow: true,
            });
            setIndex(value as AccountPageTabs);
          }}
          currentValue={index}
        >
          <TabItem
            size={TabItemContentSize.NORMAL}
            text="Загальне"
            position={TabItemContentPosition.LEFT}
            icon={<AcademicCapIcon className="icon" />}
            value={AccountPageTabs.GENERAL}
          />
          <TabItem
            size={TabItemContentSize.NORMAL}
            text="Безпека"
            position={TabItemContentPosition.LEFT}
            icon={<LockClosedIcon className="icon" />}
            value={AccountPageTabs.SECURITY}
          />
          <TabItem
            size={TabItemContentSize.NORMAL}
            text="Група"
            position={TabItemContentPosition.LEFT}
            icon={<UsersIcon className="icon" />}
            value={AccountPageTabs.GROUP}
          />
        </TabList>
        <TabPanelsList
          className={styles['tab-panels-list']}
          currentValue={index}
        >
          <>
            <TabPanel
              className={styles['tab-panel']}
              value={AccountPageTabs.GENERAL}
            >
              <GeneralTab />
            </TabPanel>
            <TabPanel
              className={styles['tab-panel']}
              value={AccountPageTabs.SECURITY}
            >
              <SecurityTab />
            </TabPanel>
            <TabPanel
              className={styles['tab-panel']}
              value={AccountPageTabs.GROUP}
            >
              <GroupTab />
            </TabPanel>
          </>
        </TabPanelsList>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
