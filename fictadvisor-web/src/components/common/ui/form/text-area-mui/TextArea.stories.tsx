import React, { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import TextArea from '@/components/common/ui/form/text-area-mui/TextArea';
import { TextAreaSize } from '@/components/common/ui/form/text-area-mui/types';

const TextAreaStories: FC = args => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.trim() === '') {
      setTouched(true);
    } else setTouched(false);
  };
  return (
    <TextArea value={value} touched={touched} onChange={onChange} {...args} />
  );
};

const meta = {
  title: 'Ui Kit/Components/Form/TextArea',
  component: TextAreaStories,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextAreaStories>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    size: TextAreaSize.MEDIUM,
    label: 'TextArea',
    placeholder: 'Enter some text',
    showRemark: true,
    error: 'Cant be empty!',
    disabled: false,
  },
};
