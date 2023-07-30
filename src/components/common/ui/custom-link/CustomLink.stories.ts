import type { Meta, StoryObj } from '@storybook/react';

import CustomLink from '@/components/common/ui/custom-link/CustomLink';

const meta = {
  title: 'Ui Kit/Components/CustomLink',
  component: CustomLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomLink>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    href: '#',
    text: 'Lorem Ipsum is simply',
  },
};
