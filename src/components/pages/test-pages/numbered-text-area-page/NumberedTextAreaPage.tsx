import { FC } from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import Button from '@/components/common/ui/button-mui';
import FormikNumberedTextArea from '@/components/common/ui/form/with-formik/numbered-text-area/FormikNumberedTextArea';

import * as styles from './TextAreaPage.styles';

const NumberedTextAreaPage: FC = () => {
  return (
    <Box sx={styles.wrapper}>
      <Formik
        initialValues={{ t1: '', t2: '', t3: '' }}
        validationSchema={yup.object().shape({
          t2: yup.string().required('Cannot be empty!'),
        })}
        onSubmit={data => console.log(data)}
      >
        {({ handleSubmit }) => (
          <Form style={styles.form}>
            <FormikNumberedTextArea name="t1" />
            <FormikNumberedTextArea
              name="t2"
              placeholder="Placeholder & error on empty"
              showRemark={true}
            />
            <FormikNumberedTextArea name="t3" disabled />
            <Button onClick={() => handleSubmit()} text="submit" />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NumberedTextAreaPage;
