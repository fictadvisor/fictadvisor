import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Loader from '@/components/common/ui/loader';
import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import PersonalSubjectTeacherTabs from '@/components/pages/personal-teacher-subject-page/personal-subject-teacher-tabs';
import PersonalTeacherSubjectCard from '@/components/pages/personal-teacher-subject-page/personal-teacher-subject-card';
import styles from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage.module.scss';
import useAuthentication from '@/hooks/use-authentication';
import useTabState from '@/hooks/use-tab-state';
import useToast from '@/hooks/use-toast';
import TeacherService from '@/lib/services/teacher/TeacherService';
import { TeacherWithSubject } from '@/types/teacher';

// TODO: move context and types to separate folders
export interface TeacherSubjectContext {
  floatingCardShowed: boolean;
  setFloatingCardShowed: Dispatch<SetStateAction<boolean>>;
  teacher: TeacherWithSubject;
}

export const teacherSubjectContext = createContext<TeacherSubjectContext>({
  floatingCardShowed: false,
  setFloatingCardShowed: () => {},
  teacher: {} as TeacherWithSubject,
});

const PersonalTeacherSubjectPage = () => {
  const router = useRouter();
  const { query, push } = router;

  const teacherId = router.query.teacherId as string;
  const subjectId = router.query.subjectId as string;
  const { user } = useAuthentication();
  const [floatingCardShowed, setFloatingCardShowed] = useState(false);

  const {
    isLoading,
    isError,
    data: teacherInfo,
  } = useQuery(
    ['teacher', teacherId, subjectId],
    () =>
      TeacherService.getTeacherSubjectPageInfo(teacherId, subjectId, user?.id),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast.error('Не лізь не в свою справу!');
      void push('/teachers');
    }
  }, [isError]);

  const { tab } = query;
  const [index, setIndex] = useState<TeachersPageTabs>(
    TeachersPageTabs.GENERAL,
  );

  const handleChange = useTabState<TeachersPageTabs>({ tab, router, setIndex });

  if (!teacherInfo) return null;

  const teacher = teacherInfo.info;

  return (
    <teacherSubjectContext.Provider
      value={{ floatingCardShowed, setFloatingCardShowed, teacher }}
    >
      <PageLayout description={'Сторінка викладача'}>
        <div className={styles['personal-teacher-page']}>
          {isLoading ? (
            <div className={styles['personal-teacher-page-content']}>
              <div className={styles['loader']}>
                <Loader />
              </div>
            </div>
          ) : (
            !isError && (
              <div className={styles['personal-teacher-page-content']}>
                <Breadcrumbs
                  className={styles['breadcrumbs']}
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
                  <PersonalTeacherSubjectCard {...teacher} />
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
      </PageLayout>
    </teacherSubjectContext.Provider>
  );
};
export default PersonalTeacherSubjectPage;
