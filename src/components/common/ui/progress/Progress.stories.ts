import type { Meta, StoryObj } from '@storybook/react';

import Progress from '@/components/common/ui/progress/Progress';

const meta = {
  title: 'Ui Kit/Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {};
