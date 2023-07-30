import type { Meta, StoryObj } from '@storybook/react';

import Switch from '@/components/common/ui/form/switch';

const meta = {
  title: 'Ui Kit/Components/Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'Switch',
  },
};
