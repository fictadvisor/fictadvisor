import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import {
  AcademicCapIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

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

const getStudentTab = (isMobile, user, requests, students) => {
  if (isMobile) {
    return (
      <MobileStudentTab user={user} requests={requests} students={students} />
    );
  } else {
    return <StudentTab user={user} requests={requests} students={students} />;
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
  const { user, isLoggedIn, isAuthenticationFetching } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn && !isAuthenticationFetching) {
      void push('/login');
    }
  }, [isAuthenticationFetching, isLoggedIn, push]);

  const { tab } = query;
  const [index, setIndex] = useState<AccountPageTabs>(AccountPageTabs.GENERAL);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    (tab as string) in AccountPageTabs && setIndex(tab as AccountPageTabs);
  }, [tab, isReady]);

  const dispatch = useDispatch();

  const {
    isSuccess: isSuccessStudents,
    data: groupStudents,
    isLoading: isLoadingGroupStudents,
  } = useQuery(['students'], () => GroupAPI.getGroupStudents(user?.group.id), {
    retry: false,
    enabled: Boolean(user),
  });

  const {
    isSuccess: isSuccessRequests,
    isLoading: isLoadingRequestStudents,
    data: requestStudents,
  } = useQuery(
    ['requests'],
    () => GroupAPI.getRequestStudents(user?.group.id),
    { retry: false, enabled: Boolean(user) },
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSuccessStudents) {
      dispatch(setStudents(groupStudents));
    }

    if (isSuccessRequests) {
      dispatch(setRequests({ requests: requestStudents.students }));
    }
  }, [
    dispatch,
    isSuccessRequests,
    isSuccessStudents,
    requestStudents,
    groupStudents,
  ]);

  const isMobile = useIsMobile(1024);

  useEffect(() => {
    setIsLoading(
      isLoadingRequestStudents ||
        isLoadingGroupStudents ||
        isAuthenticationFetching,
    );
  }, [
    isAuthenticationFetching,
    isLoadingGroupStudents,
    isLoadingRequestStudents,
  ]);

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
          {isLoading ? (
            <Loader size={LoaderSize.SMALL} />
          ) : (
            <>
              <TabPanel
                className={styles['tab-panel']}
                value={AccountPageTabs.GENERAL}
              >
                <GeneralTab user={user} update={update} />
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
                {getStudentTab(
                  isMobile,
                  user,
                  requestStudents.students,
                  groupStudents.students,
                )}
              </TabPanel>
              <TabPanel
                className={styles['tab-panel']}
                value={AccountPageTabs.GROUPTEST}
              >
                <GroupTab user={user} />
              </TabPanel>
            </>
          )}
        </TabPanelsList>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
