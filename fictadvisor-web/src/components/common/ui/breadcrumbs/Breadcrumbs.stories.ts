import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '@/components/common/ui/breadcrumbs/Breadcrumbs';

const meta = {
  title: 'Ui Kit/Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    items: [
      {
        label: 'Головна',
        href: '/',
      },
      {
        label: 'Не головна',
        href: '/',
      },
      {
        label: 'John Doe',
        href: '/',
      },
      {
        label: 'Головна тестова сторінка де багато тексту',
        href: '/',
      },
    ],
  },
};
