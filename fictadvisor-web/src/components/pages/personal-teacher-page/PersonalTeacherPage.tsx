'use client';
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import PersonalTeacherCard from '@/components/common/ui/cards/personal-teacher-card';
import Progress from '@/components/common/ui/progress';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import {
  PersonalTeacherPageProps,
  TeachersPageTabs,
} from '@/components/pages/personal-teacher-page/utils';
import useAuthentication from '@/hooks/use-authentication';
import useTabState from '@/hooks/use-tab-state';
import useToast from '@/hooks/use-toast';
import TeacherService from '@/lib/services/teacher/TeacherService';
import { TeacherPageInfo } from '@/lib/services/teacher/types';
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

const PersonalTeacherPage: FC<PersonalTeacherPageProps> = ({
  isLoading,
  isError,
  teacher,
  teacherId,
}) => {
  const query = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();

  const { user } = useAuthentication();
  const [data, setData] = useState<TeacherPageInfo>();
  const getData = async () => {
    return await TeacherService.getTeacherPageInfo(teacherId, user?.id);
  };
  useEffect(() => {
    getData().then(res => {
      setData(res);
    });
  }, []);

  const { push } = router;
  const toast = useToast();
  const [floatingCardShowed, setFloatingCardShowed] = useState(false);

  const tab = query.get('tab') as string;

  const [index, setIndex] = useState<TeachersPageTabs>(
    TeachersPageTabs.GENERAL,
  );

  const handleChange = useTabState({ tab, router, setIndex, query });

  useEffect(() => {
    if (isError) {
      toast.error('Куди ти лізеш, цієї людини не існує');
      void push('/teachers');
    }
  }, [isError, push]);

  if (!data) return null;
  if (!teacher) {
    router.push('/teachers');
    return null;
  }
  return (
    <teacherContext.Provider
      value={{
        floatingCardShowed,
        setFloatingCardShowed,
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
                ]}
              />
              <div className={styles['card-wrapper']}>
                <PersonalTeacherCard {...teacher} />
              </div>
              <div className={styles['tabs']}>
                <PersonalTeacherTabs
                  data={data}
                  tabIndex={index}
                  handleChange={handleChange}
                  teacher={teacher}
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
