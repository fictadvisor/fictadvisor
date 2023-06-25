import React, { FC, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';

import { FloatingCard } from '@/components/common/composite/cards/floating-card';
import Comment from '@/components/common/ui/comment';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { Dropdown } from '@/components/common/ui/form/dropdown/Dropdown';
import { TeacherContext } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { TeacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';

import * as styles from './CommentTab.styles';

export interface TeacherTabProps {
  teacherId: string;
  subjectId?: string;
}

const CommentTab: FC<TeacherTabProps> = ({
  teacherId,
  subjectId = undefined,
}) => {
  const teacherCont = useContext(TeacherContext);
  const teacherSubjectCont = useContext(TeacherSubjectContext);
  const { floatingCardShowed, teacher } = teacherCont
    ? teacherCont
    : teacherSubjectCont;
  const [sort, setSort] = useState('newest');
  const { refetch, data: lol } = useQuery(
    ['teacherInfo', teacherId, subjectId],
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

  const sortInfo = [
    {
      label: 'Спочатку нові',
      value: 'newest',
    },
    {
      label: 'Спочатку від дідів',
      value: 'oldest',
    },
  ];

  const onChange = options => {
    setSort(options.dropdown);
    void refetch();
  };
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.commentsWrapper}>
        <Formik
          validateOnMount
          initialValues={{ dropdown: 'newest' }}
          onSubmit={values => {
            onChange(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form style={styles.dropdown}>
              <Dropdown
                placeholder="Сортувати відгуки"
                size={FieldSize.MEDIUM}
                options={sortInfo}
                name="dropdown"
                label=""
                showRemark={false}
                onChange={handleSubmit}
              />
            </Form>
          )}
        </Formik>

        {lol?.questions?.map(question =>
          question?.comments?.map((comment, index) => (
            <Comment
              key={index}
              text={comment.comment}
              semester={comment.semester}
              year={comment.year}
            />
          )),
        )}
      </Box>
      {teacher && floatingCardShowed && (
        <FloatingCard {...teacher} subjectName={teacher.subject?.name} />
      )}
    </Box>
  );
};

export default CommentTab;
