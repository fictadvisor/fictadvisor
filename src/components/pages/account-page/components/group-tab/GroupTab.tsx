import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import useAuthentication from '@/hooks/use-authentication';
import useIsMobile from '@/hooks/use-is-mobile';
import { GroupAPI } from '@/lib/api/group/GroupAPI';

export interface GroupTabProps {}

const GroupTab: FC<GroupTabProps> = () => {
  const isMobile = useIsMobile(1024);

  const { user } = useAuthentication();

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

  useEffect(() => {
    setIsError(isErrorStudents || isErrorStudents);
  }, [isErrorStudents, isErrorRequests]);

  useEffect(() => {
    setIsSuccess(
      isSuccessRequests &&
        isSuccessStudents &&
        isLoggedIn &&
        !isLoading &&
        !isAuthenticationFetching &&
        !!user,
    );
  }, [
    isSuccessRequests,
    isSuccessStudents,
    isLoggedIn,
    isLoading,
    isAuthenticationFetching,
    user,
  ]);

  return <div></div>;
};
