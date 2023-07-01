import { FC, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';

import FloatingCard from '@/components/common/ui/cards/floating-card';
import Comment from '@/components/common/ui/comment';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { teacherContext } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';
import { teacherSubjectContext } from '@/components/pages/personal-teacher-subject-page/PersonalTeacherSubjectPage';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import * as styles from './CommentTab.styles';

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
    floatingCardShowed: teacherSubjectFloatingShowed,
  } = useContext(teacherSubjectContext);
  const [sort, setSort] = useState('newest');
  const { refetch, data } = useQuery(
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

  const onChange = (options: { dropdown: string }) => {
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
                disableClearable
                placeholder="Сортувати відгуки"
                size={FieldSize.MEDIUM}
                options={sortInfo}
                name="dropdown"
                showRemark
                onChange={handleSubmit}
                label=""
              />
            </Form>
          )}
        </Formik>

        {data?.questions?.map(question =>
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
