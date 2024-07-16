import { FC, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { CommentsSortOrder } from '@fictadvisor/utils/enums';
import { Box } from '@mui/material';

import teacherSubjectContext from '@/app/(main)/discipline/utils/teacherSubjectContext';
import FloatingCard from '@/components/common/ui/cards/floating-card';
import Comment from '@/components/common/ui/comment';
import { CommentProps } from '@/components/common/ui/comment/Comment';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import { teacherContext } from '../../../utils';

import * as styles from './CommentTab.styles';
import { sortInfo } from './constants';

export interface TeacherTabProps {
  teacherId: string;
  subjectId?: string;
}

const CommentTab: FC<TeacherTabProps> = ({ teacherId, subjectId }) => {
  // TODO: refactor this shit
  const {
    teacher: teacherContextTeacher,
    floatingCardShowed: teacherFloatingShowed,
  } = useContext(teacherContext);
  const {
    teacher: teacherSubject,
    subjectFloatingCardShowed: teacherSubjectFloatingShowed,
  } = useContext(teacherSubjectContext);
  const [sortBy, setSortBy] = useState<CommentsSortOrder>(
    CommentsSortOrder.NEWEST,
  );
  const { data } = useQuery(
    ['teacherInfo', teacherId, subjectId, sortBy],
    () =>
      TeacherAPI.getTeacherComments(teacherId, {
        subjectId,
        sortBy,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  const teacher = teacherContextTeacher.id
    ? teacherContextTeacher
    : teacherSubject;
  const floatingCardShowed =
    teacherFloatingShowed || teacherSubjectFloatingShowed;

  const onSortChange = (sort: string) => {
    setSortBy(sort as CommentsSortOrder);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.commentsWrapper}>
        <Box sx={styles.dropdown}>
          <Dropdown
            disableClearable
            placeholder="Сортувати відгуки"
            size={FieldSize.MEDIUM}
            options={sortInfo}
            showRemark={false}
            onChange={onSortChange}
            value={sortBy}
            label=""
          />
        </Box>

        {data?.questions?.map(question =>
          question?.comments?.map((comment, index) => (
            <Comment key={index} {...(comment as CommentProps)} />
          )),
        )}
      </Box>
      {teacherSubject && floatingCardShowed && (
        <FloatingCard {...teacher} subjectName={teacherSubject.subject?.name} />
      )}
    </Box>
  );
};

export default CommentTab;
