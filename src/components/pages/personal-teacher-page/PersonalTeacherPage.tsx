import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import PersonalTeacherCard from '@/components/common/ui/cards/personal-teacher-card';
import Progress from '@/components/common/ui/progress';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import {
  PersonalTeacherPageProps,
  TeachersPageTabs,
} from '@/components/pages/personal-teacher-page/utils';
import useTabState from '@/hooks/use-tab-state';
import useToast from '@/hooks/use-toast';
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
  data,
  teacher,
  query,
  teacherId,
}) => {
  const router = useRouter();
  const { push } = router;
  const toast = useToast();
  const [floatingCardShowed, setFloatingCardShowed] = useState(false);

  const { tab } = query;

  const [index, setIndex] = useState<TeachersPageTabs>(
    TeachersPageTabs.GENERAL,
  );

  const handleChange = useTabState({ tab, router, setIndex });

  useEffect(() => {
    if (isError) {
      toast.error('Куди ти лізеш, цієї людини не існує');
      void push('/teachers');
    }
  }, [isError, push, toast]);

  if (!data) return null;
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
