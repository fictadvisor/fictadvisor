import type { Meta, StoryObj } from '@storybook/react';

import Rating from '@/components/common/ui/rating/Rating';

const meta = {
  title: 'Ui Kit/Components/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    rating: 80,
  },
};
