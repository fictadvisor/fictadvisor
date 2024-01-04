import type { Meta, StoryObj } from '@storybook/react';

import { FieldState } from '@/components/common/ui/form/common/types';
import Radio from '@/components/common/ui/form/radio/radio-button';

const meta = {
  title: 'Ui Kit/Components/form/radio/radio-button',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    value: 'month',
    label: 'Щомісячно',
    textType: 'body1',
    sx: { margin: '0px' },
    state: FieldState.DEFAULT,
    disabled: true,
    selectedValue: 'month',
    name: 'someName',
  },
};
