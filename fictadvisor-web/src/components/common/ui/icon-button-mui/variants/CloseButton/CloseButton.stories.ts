import type { Meta, StoryObj } from '@storybook/react';

import CloseButton from './CloseButton';

const meta = {
  title: 'Ui Kit/Components/IconButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Close: Story = {};
