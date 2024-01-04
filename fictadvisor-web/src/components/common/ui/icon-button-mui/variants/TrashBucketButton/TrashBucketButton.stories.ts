import type { Meta, StoryObj } from '@storybook/react';

import TrashBucketButton from './TrashBucketButton';

const meta = {
  title: 'Ui Kit/Components/IconButton',
  component: TrashBucketButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TrashBucketButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const TrashBucket: Story = {};
