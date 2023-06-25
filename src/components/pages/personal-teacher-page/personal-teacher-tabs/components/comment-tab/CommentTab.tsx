import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';

import Comment from '@/components/common/ui/comment';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { Dropdown } from '@/components/common/ui/form/dropdown/Dropdown';
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
  );
};

export default CommentTab;
