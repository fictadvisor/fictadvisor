import type { Meta, StoryObj } from '@storybook/react';

import Comment from '@/components/common/ui/comment/Comment';

const meta = {
  title: 'Ui Kit/Components/Comment',
  component: Comment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Comment>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
      'when an unknown printer took a galley of type and scrambled it to make a type specimen book. ' +
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ' +
      'It was popularised in the 1960s with the release of Letraset sheets containing ' +
      'Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    semester: 1,
    year: 2023,
  },
};
