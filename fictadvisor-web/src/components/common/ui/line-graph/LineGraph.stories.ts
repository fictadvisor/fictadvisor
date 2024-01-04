import type { Meta, StoryObj } from '@storybook/react';

import LineGraph from '@/components/common/ui/line-graph/LineGraph';

const meta = {
  title: 'Ui Kit/Components/LineGraph',
  component: LineGraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LineGraph>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    value: 77,
    label: 'Lorem Ipsum is simply',
  },
};
