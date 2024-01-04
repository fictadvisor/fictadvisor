import type { Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { Formik } from 'formik';

import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';

const options = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
];

const meta: Meta = {
  title: 'Ui Kit/Components/Form/Formik/Dropdown',
  component: FormikDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  render: args => (
    <Formik initialValues={{ text: '' }} onSubmit={() => {}}>
      {() => (
        <FormikDropdown name={args.name} options={args.options} {...args} />
      )}
    </Formik>
  ),
  args: {
    name: 'text',
    options: options,
  },
};
