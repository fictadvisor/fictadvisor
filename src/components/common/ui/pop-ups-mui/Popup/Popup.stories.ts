
import type { Meta, StoryObj } from '@storybook/react';

import Popup from '@/components/common/ui/pop-ups-mui/Popup';
import Button from '@/components/common/ui/button-mui/Button';
import React from "react";
import {ButtonColor, ButtonSize, ButtonVariant} from "@/components/common/ui/button-mui/types";

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
    text: 'Some text',
    title: 'Some title',
    open: false,
    contentLeft: undefined,
    sx: undefined,
    hasCross: false,
    icon: undefined,
    firstButton: React.createElement(Button),
    secondButton: undefined,
    onClose: () => {},
  },
};

