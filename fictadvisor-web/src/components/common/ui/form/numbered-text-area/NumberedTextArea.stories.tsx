import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import NumberedTextArea from './NumberedTextArea';

const NumberedTextAreaStory: React.FC = args => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.trim() === '') {
      setTouched(true);
    } else setTouched(false);
  };

  return (
    <NumberedTextArea
      value={value}
      touched={touched}
      onChange={onChange}
      {...args}
    />
  );
};

const meta = {
  title: 'Ui Kit/Components/Form/NumberedTextArea',
  component: NumberedTextAreaStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberedTextAreaStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    placeholder: 'This is a placeholder',
    showRemark: true,
    error: 'Cant be empty!',
    disabled: false,
  },
};
