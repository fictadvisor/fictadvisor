import { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import TextArea from '@/components/common/ui/form/text-area-mui/TextArea';
import { TextAreaSize } from '@/components/common/ui/form/text-area-mui/types';

const meta = {
  title: 'Ui Kit/Components/Form/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => (
    <Formik initialValues={{ text: '' }} onSubmit={() => {}}>
      {() => (
        <Form>
          <TextArea {...args} />
        </Form>
      )}
    </Formik>
  ),
  args: {
    name: 'text',
    size: TextAreaSize.MEDIUM,
    label: 'TextArea',
    placeholder: 'Enter some text',
  },
};
