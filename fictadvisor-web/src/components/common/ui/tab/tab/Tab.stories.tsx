import { AcademicCapIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';

import Tab from '@/components/common/ui/tab/tab/Tab';

const meta = {
  title: 'Ui Kit/Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    label: 'Безпека',
    icon: <AcademicCapIcon />,
  },
};
