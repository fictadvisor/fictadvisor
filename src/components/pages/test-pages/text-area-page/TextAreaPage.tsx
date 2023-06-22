import { FC } from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import Button from '@/components/common/ui/button-mui';
import TextArea, {
  TextAreaSize,
} from '@/components/common/ui/form/text-area-mui';

import * as styles from './TextAreaPage.styles';

const TextAreaPage: FC = () => {
  return (
    <Box sx={styles.wrapper}>
      <Formik
        initialValues={{ t1: '', t2: '', t3: '', t4: '', t5: '', t6: '' }}
        validationSchema={yup.object().shape({
          t5: yup.string().required('Cannot be empty!'),
        })}
        onSubmit={data => console.log(data)}
      >
        {({ handleSubmit }) => (
          <Form style={styles.form}>
            <TextArea
              name="t1"
              label="Medium text area "
              placeholder="Medium placeholder"
            />
            <TextArea name="t2" placeholder="medium no label placeholder" />
            <TextArea
              name="t3"
              label="small label no placeholder"
              size={TextAreaSize.SMALL}
            />
            <TextArea
              name="t4"
              placeholder="small no label"
              size={TextAreaSize.SMALL}
            />
            <TextArea
              name="t5"
              label="error if empty"
              placeholder="error placeholder"
              showRemark={true}
            />
            <TextArea
              name="t6"
              label="Disabled text area label"
              placeholder="Disabled placeholder"
              disabled
            />
            <Button onClick={() => handleSubmit()} text="submit" />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TextAreaPage;
