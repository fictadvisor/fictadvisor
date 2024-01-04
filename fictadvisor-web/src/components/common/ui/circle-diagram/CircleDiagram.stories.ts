import type { Meta, StoryObj } from '@storybook/react';

import CircleDiagram from '@/components/common/ui/circle-diagram/CircleDiagram';

const meta = {
  title: 'Ui Kit/Components/CircleDiagram',
  component: CircleDiagram,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CircleDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    value: 80,
  },
};
