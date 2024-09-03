'use client';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { TeachersPageTabs } from 'src/app/(main)/(search-pages)/teachers/[teacherId]/utils';
import PersonalSubjectTeacherTabs from 'src/app/(main)/discipline/personal-subject-teacher-tabs';

import styles from '@/app/(main)/discipline/PersonalTeacherSubjectPage.module.scss';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import PersonalTeacherCard from '@/components/common/ui/cards/personal-teacher-card';
import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import useTabState from '@/hooks/use-tab-state';
import useToast from '@/hooks/use-toast';
import TeacherService from '@/lib/services/teacher/TeacherService';

import teacherSubjectContext from './utils/teacherSubjectContext';

const PersonalTeacherSubjectPage = () => {
  const router = useRouter();
  const { push } = router;
  const query = useSearchParams();
  const teacherId = query.get('teacherId');
  const subjectId = query.get('subjectId');
  const { user } = useAuthentication();
  const [subjectFloatingCardShowed, setSubjectFloatingCardShowed] =
    useState(false);

  const {
    isLoading,
    isError,
    data: teacherInfo,
  } = useQuery({
    queryKey: ['teacher', teacherId, subjectId],

    queryFn: () =>
      TeacherService.getTeacherSubjectPageInfo(
        teacherId ?? '',
        subjectId ?? '',
        user?.id,
      ),

    enabled: !!teacherId && !!subjectId && !!user?.id,
    refetchOnWindowFocus: false,
    retry: false
  });
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast.error('Не лізь не в свою справу!');
      void push('/teachers');
    }
  }, [isError]);

  const tab = query.get('tab');
  const [index, setIndex] = useState<TeachersPageTabs>(
    TeachersPageTabs.GENERAL,
  );

  const handleChange = useTabState({
    tab: tab ?? '',
    router,
    setIndex,
    query,
  });

  if (!teacherInfo) return null;

  const teacher = teacherInfo.info;

  return (
    <teacherSubjectContext.Provider
      value={{
        subjectFloatingCardShowed,
        setSubjectFloatingCardShowed,
        teacher,
      }}
    >
      <div className={styles['personal-teacher-page']}>
        {isLoading ? (
          <div className={styles['personal-teacher-page-content']}>
            <div className={styles['loader']}>
              <Progress />
            </div>
          </div>
        ) : (
          !isError && (
            <div className={styles['personal-teacher-page-content']}>
              <Breadcrumbs
                sx={{ margin: '16px 0px 16px 0px' }} //TODO move inline styles when refactor
                items={[
                  {
                    label: 'Головна',
                    href: '/',
                  },
                  { label: 'Викладачі', href: '/teachers' },
                  {
                    label: `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`,
                    href: `/teachers/${teacherId}`,
                  },
                  {
                    label: `${teacher.subject.name}`,
                    href: `/discipline?teacherId=${teacherId}&subjectId=${subjectId}`,
                  },
                ]}
              />
              <div className={styles['card-wrapper']}>
                <PersonalTeacherCard {...teacher} isSubjectCard={true} />
              </div>
              <div className={styles['tabs']}>
                <PersonalSubjectTeacherTabs
                  data={teacherInfo}
                  tabIndex={index}
                  handleChange={handleChange}
                />
              </div>
            </div>
          )
        )}
      </div>
    </teacherSubjectContext.Provider>
  );
};

export default PersonalTeacherSubjectPage;
