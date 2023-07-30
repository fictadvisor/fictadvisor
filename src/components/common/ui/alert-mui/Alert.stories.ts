import type { Meta, StoryObj } from '@storybook/react';

import Alert from '@/components/common/ui/alert-mui/Alert';

const meta = {
  title: 'Ui Kit/Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    title: 'Alert Test',
  },
};
