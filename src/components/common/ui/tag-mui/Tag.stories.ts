import type { Meta, StoryObj } from '@storybook/react';

import Tag from '@/components/common/ui/tag-mui/Tag';

const meta = {
  title: 'Ui Kit/Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    text: 'Tag',
  },
};
