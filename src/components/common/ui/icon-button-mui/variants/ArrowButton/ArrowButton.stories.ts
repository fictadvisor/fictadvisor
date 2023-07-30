import type { Meta, StoryObj } from '@storybook/react';

import ArrowButton from './ArrowButton';

const meta = {
  title: 'Ui Kit/Components/IconButton',
  component: ArrowButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Arrow: Story = {};
