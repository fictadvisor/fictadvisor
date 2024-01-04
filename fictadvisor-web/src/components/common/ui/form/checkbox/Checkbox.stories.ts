import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/components/common/ui/form/checkbox/Checkbox';

const meta = {
  title: 'Ui Kit/Components/Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    label: 'Checkbox test',
  },
};
