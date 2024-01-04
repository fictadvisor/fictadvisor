import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Input from '@/components/common/ui/form/input-mui';

const meta: Meta = {
  title: 'Ui Kit/Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const InputTemplate: Story = args => {
  const [value, setValue] = useState('');
  return <Input {...args} onChange={setValue} value={value} />;
};

export const Base = InputTemplate.bind({});
Base.args = {};
