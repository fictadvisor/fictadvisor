import type { Meta, StoryObj } from '@storybook/react';

import StarButton from './StarButton';

const meta = {
  title: 'Ui Kit/Components/IconButton',
  component: StarButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StarButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Star: Story = {};
