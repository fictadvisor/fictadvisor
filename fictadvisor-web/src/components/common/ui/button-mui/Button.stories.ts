import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/ui/button-mui/Button';

const meta = {
  title: 'Ui Kit/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    text: 'Button Test',
  },
};
