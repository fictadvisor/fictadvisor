import type { Meta, StoryObj } from '@storybook/react';

import Divider from '@/components/common/ui/divider/Divider';

const meta = {
  title: 'Ui Kit/Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    text: 'Divider',
  },
};
