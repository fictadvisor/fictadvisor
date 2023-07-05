import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Loader from '@/components/common/ui/loader';
import PersonalTeacherCard from '@/components/pages/personal-teacher-page/personal-teacher-card';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import useAuthentication from '@/hooks/use-authentication';
import useTabState from '@/hooks/use-tab-state';
import useToast from '@/hooks/use-toast';
import TeacherService from '@/lib/services/teacher';
import { Teacher } from '@/types/teacher';

// TODO: move context to separate folder, move types to separate folder
export interface TeacherContext {
  floatingCardShowed: boolean;
  setFloatingCardShowed: Dispatch<SetStateAction<boolean>>;
  teacher: Teacher;
}

export const teacherContext = createContext<TeacherContext>({
  floatingCardShowed: false,
  setFloatingCardShowed: () => {},
  teacher: {} as Teacher,
});

export enum TeachersPageTabs {
  GENERAL = 'general',
  SUBJECTS = 'subjects',
  COMMENTS = 'reviews',
}

const PersonalTeacherPage = () => {
  const router = useRouter();
  const { query, push } = router;
  const teacherId = query.teacherId as string;
  const { user } = useAuthentication();
  const { isLoading, isError, data } = useQuery(
    ['teacher', teacherId],
    () => TeacherService.getTeacherPageInfo(teacherId, user?.id),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
  const toast = useToast();
  const [floatingCardShowed, setFloatingCardShowed] = useState(false);

  const { tab } = query;
  const [index, setIndex] = useState<TeachersPageTabs>(
    TeachersPageTabs.GENERAL,
  );

  const handleChange = useTabState<TeachersPageTabs>({ tab, router, setIndex });

  useEffect(() => {
    if (isError) {
      toast.error('Куди ти лізеш, цієї людини не існує');
      void push('/teachers');
    }
  }, [isError, push, toast]);

  if (!data) return null;

  const teacher = data?.info;

  return (
    <teacherContext.Provider
      value={{ floatingCardShowed, setFloatingCardShowed, teacher }}
    >
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
                ]}
              />
              <div className={styles['card-wrapper']}>
                <PersonalTeacherCard {...data.info} />
              </div>
              <div className={styles['tabs']}>
                <PersonalTeacherTabs
                  data={data}
                  tabIndex={index}
                  handleChange={handleChange}
                />
              </div>
            </div>
          )
        )}
      </div>
    </teacherContext.Provider>
  );
};
export default PersonalTeacherPage;
