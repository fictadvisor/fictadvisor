import { FC, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import FloatingCard from '@/components/common/ui/cards/floating-card';
import Comment from '@/components/common/ui/comment';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { teacherContext } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { teacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

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
  const [sort, setSort] = useState('newest');
  const { data } = useQuery(
    ['teacherInfo', teacherId, subjectId, sort],
    () =>
      TeacherAPI.getTeacherComments(
        teacherId,
        subjectId,
        undefined,
        undefined,
        sort,
      ),
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
    setSort(sort);
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
            value={sort}
            label=""
          />
        </Box>

        {data?.questions?.map(
          question =>
            question?.comments?.map((comment, index) => (
              <Comment key={index} {...comment} />
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
