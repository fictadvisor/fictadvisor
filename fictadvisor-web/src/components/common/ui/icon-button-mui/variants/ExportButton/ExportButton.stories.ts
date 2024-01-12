import type { Meta, StoryObj } from '@storybook/react';

import ExportButton from './ExportButton';

const meta = {
  title: 'Ui Kit/Components/IconButton',
  component: ExportButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExportButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Export: Story = {};
