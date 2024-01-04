import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';

import Dropdown from '@/components/common/ui/form/dropdown/Dropdown';

const options = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
];

const meta: Meta = {
  title: 'Ui Kit/Components/Form/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type DropdownProps = React.ComponentProps<typeof Dropdown>;

const DropdownTemplate: Story<DropdownProps> = args => {
  const [value, setValue] = useState('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <Dropdown
      {...args}
      onChange={handleChange}
      value={value}
      options={options}
    />
  );
};

export const Base = DropdownTemplate.bind({});
Base.args = {};
