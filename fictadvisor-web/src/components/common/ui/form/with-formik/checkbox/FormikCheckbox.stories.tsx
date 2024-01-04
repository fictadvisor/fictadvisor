import type { Meta, StoryObj } from '@storybook/react';

import FormikCheckbox from '@/components/common/ui/form/checkbox/Checkbox';

const meta = {
  title: 'Ui Kit/Components/Form/Formik/Checkbox',
  component: FormikCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormikCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    label: 'FormikCheckbox test',
  },
};
