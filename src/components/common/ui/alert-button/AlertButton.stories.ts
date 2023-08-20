import type { Meta, StoryObj } from '@storybook/react';

import AlertButton from '@/components/common/ui/alert-button/AlertButton';

const meta = {
  title: 'Ui Kit/Components/AlertButton',
  component: AlertButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    text: 'Alert Button Test',
  },
};
