import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '@/components/common/ui/tooltip/Tooltip';

const meta = {
  title: 'Ui Kit/Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { title: 'Tooltip', children: <div>TooltipChildren</div> },
};
