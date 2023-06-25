import { FC } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

import { PollTeacherCard } from '@/components/common/ui/cards/poll-teacher-card';
import useAuthentication from '@/hooks/use-authentication';
import { PollTeachersDTO } from '@/lib/api/poll/dto/PollTeachersDTO';
import theme from '@/styles/theme';

import * as stylesMUI from './PollTeacherSearchList.styles';

import styles from './PollTeacherSearchList.module.scss';

interface PollTeacherSearchListProps {
  data: PollTeachersDTO;
  className: string;
}

const PollTeacherSearchList: FC<PollTeacherSearchListProps> = ({
  data,
  className,
}) => {
  const { user } = useAuthentication();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const isCompleted = data.teachers?.length === 0;
  const groupName = user?.group.code;
  return (
    <>
      <Typography sx={stylesMUI.headText}>
        Викладачі предметів групи {groupName}
      </Typography>
      {isCompleted && (
        <Box sx={stylesMUI.wrapper}>
          <Box sx={stylesMUI.content}>
            <Image
              src="/gifs/frog-complete.gif"
              alt="Frogs complete the poll"
              width={isMobile ? 300 : 480}
              height={isMobile ? 125 : 200}
              quality={100}
            />
            <Typography sx={stylesMUI.headText}>На цей семестр всьо</Typography>
            <Typography variant="body2">
              Ти вже пройшов опитування за всіх викладачів, що викладали в тебе
              в цьому семестрі, дочекайся наступного семестру, аби знов залишити
              відгук. Сподіваємось ти добре закрив сесію!
            </Typography>
          </Box>
        </Box>
      )}
      <ul className={styles[`${className}-search-list`]}>
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
            />
          ))}
      </ul>
    </>
  );
};

export default PollTeacherSearchList;
