import type { Meta, StoryObj } from '@storybook/react';

import Popup from '@/components/common/ui/pop-ups-mui/Popup';

const meta = {
    title: 'Ui Kit/Components/Popup',
    component: Popup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        text: "Some text",
        title: "Some title",
        open: false
    }
};
