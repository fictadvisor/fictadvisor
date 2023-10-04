import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';

type RadioGroupStoryType = {
  name: string;
  options: { label: string; value: string }[];
};

const RadioGroupStory: React.FC<RadioGroupStoryType> = (
  args: RadioGroupStoryType,
) => {
  return (
    <Box sx={{ padding: '20px', backgroundColor: 'backgroundDark.300' }}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <FormikRadioGroup {...args}></FormikRadioGroup>
        </Form>
      </Formik>
    </Box>
  );
};

const meta = {
  title: 'Ui Kit/Components/form/Formik/radio/FormikRadioGroup',
  component: RadioGroupStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: 'Оберіть спеціальність',
    options: [
      {
        label: '121 Інженерія програмного забезпечення',
        value: '121',
      },
      {
        label: "123 Комп'ютерна інженерія",
        value: '123',
      },
      {
        label: '126 Інформаційні системи та технології',
        value: '126',
      },
    ],
    sx: {
      display: 'flex',
      justifyContent: 'column',
      gap: '36px',
    },
  },
};
