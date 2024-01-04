import type { Meta, StoryObj } from '@storybook/react';

import SortButton from './SortButton';

const meta = {
  title: 'Ui Kit/Components/IconButton',
  component: SortButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SortButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Sort: Story = {};
