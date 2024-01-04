import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import Button from '@/components/common/ui/button-mui';
import FormikInput from '@/components/common/ui/form/with-formik/input';

const meta = {
  title: 'Ui Kit/Components/Form/Formik/Input',
  component: FormikInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof FormikInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => (
    <Formik
      initialValues={{ t5: '' }}
      validationSchema={yup.object().shape({
        t5: yup.string().required(args.error),
      })}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ handleSubmit }) => (
        <Form>
          <FormikInput {...args} />
          <Button onClick={() => handleSubmit()} text="submit" />
        </Form>
      )}
    </Formik>
  ),
  args: {
    name: 't5',
  },
};
