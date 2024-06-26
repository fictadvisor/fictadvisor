'use client';

import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { TeacherWithContactsResponse } from '@fictadvisor/utils/responses';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import PersonalTeacherCard from '@/components/common/ui/cards/personal-teacher-card';
import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import useTabState from '@/hooks/use-tab-state';
import useToast from '@/hooks/use-toast';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import TeacherService from '@/lib/services/teacher/TeacherService';
import { TeacherPageInfo } from '@/lib/services/teacher/types';

import PersonalTeacherTabs from './personal-teacher-tabs';
import { teacherContext, TeachersPageTabs } from './utils';

import styles from './PersonalTeacherPage.module.scss';

interface PersonalTeacherProps {
  params: {
    teacherId: string;
  };
}

// TODO: move context to separate folder, move types to separate folder
export interface TeacherContext {
  floatingCardShowed: boolean;
  setFloatingCardShowed: Dispatch<SetStateAction<boolean>>;
  teacher: TeacherWithContactsResponse;
}

const PersonalTeacher: FC<PersonalTeacherProps> = ({ params }) => {
  const teacherId = params.teacherId;
  const teacher = useQuery(['teacher'], () => TeacherAPI.get(teacherId)).data;
  const isLoading = undefined;
  const isError = undefined;

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
  }, [isError, push, toast]);

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

export default PersonalTeacher;
