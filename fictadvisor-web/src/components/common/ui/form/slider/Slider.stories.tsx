import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import Slider from '@/components/common/ui/form/slider/Slider';

const meta = {
  title: 'Ui Kit/Components/Form/Slider',
  component: Slider,
  decorators: [
    Story => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0 50px',
        }}
      >
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Base: Story = {
  args: {},
};
