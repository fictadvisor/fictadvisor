import { useState } from 'react';
import { Box } from '@mui/material';

import Slider from '@/components/common/ui/form/slider-mui';
import { wrapper } from '@/components/pages/test-pages/slider-page/SliderPage.styles';

const SliderPage = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      console.log(newValue);
    }
  };

  return (
    <Box sx={wrapper}>
      <Slider size="medium" />
      <Slider size="small" value={value} onChange={handleChange} />
    </Box>
  );
};

export default SliderPage;
