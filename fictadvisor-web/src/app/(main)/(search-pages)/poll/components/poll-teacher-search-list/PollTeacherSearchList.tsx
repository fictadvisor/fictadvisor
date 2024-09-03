import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { QueryAllDisciplineTeacherForPollDTO } from '@fictadvisor/utils/requests';
import { PollDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { Box, Typography, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import Image from 'next/image';

import { SearchFormProps } from '@/app/(main)/(search-pages)/search-form/SearchForm';
import { PollTeacherCard } from '@/components/common/ui/cards/poll-teacher-card';
import useAuthentication from '@/hooks/use-authentication';
import theme from '@/styles/theme';

import PollSearchForm from '../poll-search-form';

import * as styles from './PollTeacherSearchList.styles';

import style from './PollTeacherSearchList.module.scss';

interface PollTeacherSearchListProps {
  data: PollDisciplineTeachersResponse;
  className: string;
  setQueryObj: Dispatch<SetStateAction<QueryAllDisciplineTeacherForPollDTO>>;
  initialValues: QueryAllDisciplineTeacherForPollDTO;
  localStorageName: string;
  setCurPage: Dispatch<SetStateAction<number>>;
}

const PollTeacherSearchList: FC<PollTeacherSearchListProps> = ({
  data,
  setQueryObj,
  initialValues,
  localStorageName,
  setCurPage,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setQueryObj(
      prev => (({
        ...prev,
        ...query
      }) as QueryAllDisciplineTeacherForPollDTO),
    );
    setCurPage(0);
  }, []);
  const { user } = useAuthentication();

  const isCompleted = data.teachers?.length === 0;
  const groupName = user?.group?.code;
  return (
    <>
      <Typography sx={styles.headText}>
        Викладачі предметів групи {groupName}
      </Typography>
      <PollSearchForm
        searchPlaceholder="Обери викладача"
        onSubmit={submitHandler}
        initialValues={initialValues}
        localStorageName={localStorageName}
      />
      {isCompleted ? (
        <Box sx={styles.wrapper}>
          <Box sx={styles.content}>
            <Image
              src="/gifs/frog-complete.gif"
              alt="Frogs complete the poll"
              width={isMobile ? 300 : 480}
              height={isMobile ? 125 : 200}
              quality={100}
            />
            <Typography sx={styles.headText}>На цей семестр всьо</Typography>
            <Typography variant="body2">
              Ти вже пройшов опитування за всіх викладачів, що викладали в тебе
              в цьому семестрі, дочекайся наступного семестру, аби знов залишити
              відгук. Сподіваємось ти добре закрив сесію!
            </Typography>
          </Box>
        </Box>
      ) : (
        <List sx={styles.searchList} style={style}>
          {data &&
            data.teachers?.map(teacher => (
              <PollTeacherCard
                key={teacher.disciplineTeacherId}
                description={teacher.subject.name}
                avatar={teacher.avatar}
                name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
                roles={teacher.roles}
                href={`/poll/${teacher.disciplineTeacherId}`}
                id={teacher.disciplineTeacherId}
                cathedras={teacher.cathedras}
              />
            ))}
        </List>
      )}
    </>
  );
};

export default PollTeacherSearchList;
