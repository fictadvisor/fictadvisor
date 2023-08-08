import type { Meta, StoryObj } from '@storybook/react';

import Toast from '@/components/common/ui/toast-mui/Toast';

import { AlertType } from '../alert-mui/types';

const meta = {
  title: 'Ui Kit/Components/Toast',
  component: Toast,
  decorators: [
    Story => (
      <div
        style={{
          transform: 'scale(1)',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    title: 'Toast',
    type: AlertType.INFO,
    description: 'This is a toast',
    open: true,
  },
};
