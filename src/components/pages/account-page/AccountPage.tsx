import React, { useEffect, useState } from 'react';
import { isError, useQuery } from 'react-query';
import {
  AcademicCapIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
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
import MobileStudentTab from '@/components/pages/account-page/components/mobile-student-tab';
import SecurityTab from '@/components/pages/account-page/components/security-tab';
import StudentTab from '@/components/pages/account-page/components/student-tab';
import useAuthentication from '@/hooks/use-authentication';
import useIsMobile from '@/hooks/use-is-mobile/UseIsMobile';
import { GroupAPI } from '@/lib/api/group/GroupAPI';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import styles from './AccountPage.module.scss';

const getStudentTab = (isMobile, requests, students) => {
  if (isMobile) {
    return <MobileStudentTab requests={requests} students={students} />;
  } else {
    return <StudentTab requests={requests} students={students} />;
  }
};

enum AccountPageTabs {
  GENERAL = 'general',
  SECURITY = 'security',
  GROUP = 'group',
  GROUPTEST = 'grouptest',
}

const AccountPage = () => {
  const { push, query, isReady } = useRouter();

  const { tab } = query;
  const [index, setIndex] = useState<AccountPageTabs>(AccountPageTabs.GENERAL);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    (tab as string) in AccountPageTabs && setIndex(tab as AccountPageTabs);
  }, [tab, isReady]);

  const { user, isLoggedIn, isAuthenticationFetching } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn && !isAuthenticationFetching) {
      void push('/login');
    }
  }, [isAuthenticationFetching, isLoggedIn, push]);

  const {
    isSuccess: isSuccessStudents,
    isError: isErrorStudents,
    data: groupStudents,
    isLoading: isLoadingGroupStudents,
  } = useQuery(['students'], () => GroupAPI.getGroupStudents(user?.group.id), {
    retry: false,
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
  });

  const {
    isSuccess: isSuccessRequests,
    isError: isErrorRequests,
    isLoading: isLoadingRequestStudents,
    data: requestStudents,
  } = useQuery(
    ['requests'],
    () => GroupAPI.getRequestStudents(user?.group.id),
    { retry: false, enabled: Boolean(user), refetchOnWindowFocus: false },
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(isAuthenticationFetching);
  }, [isAuthenticationFetching]);

  useEffect(() => {
    setIsSuccess(
      isLoggedIn && !isLoading && !isAuthenticationFetching && !!user,
    );
  }, [isLoggedIn, isLoading, isAuthenticationFetching, user]);

  return (
    <PageLayout hasFooter={true}>
      <div className={styles['content']}>
        <div className={styles['breadcrumb']}></div>
      </div>
      <div className={styles['tabs-content']}>
        <TabList className={styles['tab-list']} onChange={setIndex}>
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
          <TabItem
            size={TabItemContentSize.NORMAL}
            text="Група"
            position={TabItemContentPosition.LEFT}
            icon={<UsersIcon className="icon" />}
            value={AccountPageTabs.GROUPTEST}
          />
        </TabList>
        <TabPanelsList
          className={styles['tab-panels-list']}
          currentValue={index}
        >
          {isLoading && <Loader size={LoaderSize.SMALL} />}
          {isError && <AlertPopup title="Помилка" color={AlertColor.ERROR} />}
          {isSuccess && (
            <>
              <TabPanel
                className={styles['tab-panel']}
                value={AccountPageTabs.GENERAL}
              >
                <GeneralTab user={user} />
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
                <GroupTab2 />
              </TabPanel>
              <TabPanel
                className={styles['tab-panel']}
                value={AccountPageTabs.GROUPTEST}
              >
                <GroupTab />
              </TabPanel>
            </>
          )}
        </TabPanelsList>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
