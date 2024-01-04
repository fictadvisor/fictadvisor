import { FC } from 'react';
import { Slider as SliderMUI } from '@mui/material';

import { marks } from '@/components/common/ui/form/slider/const/marks';
import { slider } from '@/components/common/ui/form/slider/Slider.styles';
import {
  SliderProps,
  SliderSize,
} from '@/components/common/ui/form/slider/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

const Slider: FC<SliderProps> = ({
  defaultValue = 1,
  size = SliderSize.MEDIUM,
  sx = {},
  onChange,
  value,
}) => {
  return (
    <SliderMUI
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      min={1}
      max={10}
      step={1}
      sx={mergeSx(slider(size), sx)}
      marks={marks}
    />
  );
};

export default Slider;
