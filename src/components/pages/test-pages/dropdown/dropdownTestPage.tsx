import React from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { FieldSize } from '@/components/common/ui/form/common/types';
import { Dropdown } from '@/components/common/ui/form/dropdown/Dropdown';

import * as styles from './dropdownTest.styles';

const options = [
  { label: 'Option 1', value: 'o1' },
  { label: 'Option 12', value: 'o2' },
  { label: 'Option 123', value: 'o3' },
  { label: 'Option 1234', value: 'o4' },
  { label: 'Option 12345', value: 'o5' },
  { label: 'Option 123456', value: 'o6' },
  { label: 'Option 123сіфсфісфісіфсфісфісіфсісфісфсфсфсфі4567', value: 'o7' },
  { label: 'Option 12345678', value: 'o8' },
  { label: 'Option 9', value: 'o9' },
];

const scheme = yup.object({
  teacherId1: yup.string().required(`Обов'язкове поле`),
  teacherId2: yup.string().required(`Обов'язкове поле`),
  teacherId3: yup.string().required(`Обов'язкове поле`),
  teacherId4: yup.string().required(`Обов'язкове поле`),
  teacherId5: yup.string().required(`Обов'язкове поле`),
  teacherId6: yup.string().required(`Обов'язкове поле`),
});

const TagTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <Formik
        validateOnMount
        validateOnChange
        validationSchema={scheme}
        initialValues={{}}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form
          style={{
            width: '60%',
          }}
        >
          <Dropdown
            placeholder="NO LABEL MFCKRS"
            defaultRemark="Some defualt text"
            size={FieldSize.SMALL}
            options={options}
            name="teacherId1"
            showRemark
            label=""
          />
          <Dropdown
            placeholder="NO LABEL MFCKRS"
            defaultRemark="Some defualt text"
            size={FieldSize.MEDIUM}
            options={options}
            name="teacherId2"
            showRemark
            label=""
          />
          <Dropdown
            placeholder="NO LABEL MFCKRS"
            defaultRemark="Some defualt text"
            size={FieldSize.LARGE}
            options={options}
            name="teacherId3"
            showRemark
            label=""
          />

          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.SMALL}
            options={options}
            name="teacherId4"
            showRemark
            isSuccessOnDefault
          />
          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.MEDIUM}
            options={options}
            name="teacherId5"
            showRemark
            isSuccessOnDefault
          />

          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.LARGE}
            options={options}
            name="teacherId6"
            showRemark
            isSuccessOnDefault
          />

          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.SMALL}
            options={[
              {
                text: 'Лекція',
                value: 'lection',
                color: 'info',
                size: 'small',
              },
              {
                text: 'Практика',
                value: 'practice',
                color: 'orange',
                size: 'small',
              },
              {
                text: 'Лабораторна',
                value: 'laboratory',
                color: 'mint',
                size: 'small',
              },
              {
                text: 'Інша подія',
                value: 'otherOccasion',
                color: 'violet',
                size: 'small',
              },
            ]}
            name="teacherId7"
          />
          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.MEDIUM}
            options={[
              {
                text: 'Лекція',
                value: 'lection',
                color: 'info',
                size: 'small',
              },
              {
                text: 'Практика',
                value: 'practice',
                color: 'orange',
                size: 'small',
              },
              {
                text: 'Лабораторна',
                value: 'laboratory',
                color: 'mint',
                size: 'small',
              },
              {
                text: 'Інша подія',
                value: 'otherOccasion',
                color: 'violet',
                size: 'small',
              },
            ]}
            name="teacherId8"
          />
          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.LARGE}
            options={[
              {
                text: 'Лекція',
                value: 'lection',
                color: 'info',
                size: 'small',
              },
              {
                text: 'Практика',
                value: 'practice',
                color: 'orange',
                size: 'small',
              },
              {
                text: 'Лабораторна',
                value: 'laboratory',
                color: 'mint',
                size: 'small',
              },
              {
                text: 'Інша подія',
                value: 'otherOccasion',
                color: 'violet',
                size: 'small',
              },
            ]}
            name="teacherId9"
          />
          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.SMALL}
            options={options}
            name="teacherId124"
            showRemark
            isSuccessOnDefault
            isDisabled
          />
          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.MEDIUM}
            options={options}
            name="teacherId125"
            showRemark
            isSuccessOnDefault
            isDisabled
          />

          <Dropdown
            defaultRemark="Some defualt text"
            size={FieldSize.LARGE}
            options={options}
            name="teacherId126"
            showRemark
            isSuccessOnDefault
            isDisabled
          />
          <button type="submit">submit</button>
        </Form>
      </Formik>
    </Box>
  );
};

export default TagTestPage;
