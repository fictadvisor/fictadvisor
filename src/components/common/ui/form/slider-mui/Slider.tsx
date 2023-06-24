import { FC } from 'react';
import { Slider as SliderMUI } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { marks } from '@/components/common/ui/form/slider-mui/const/marks';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { slider } from './Slider.styles';

export interface SliderProps {
  defaultValue?: number;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  onChange?: (event: Event, value: number | number[]) => void;
  value?: number;
}

const Slider: FC<SliderProps> = ({
  defaultValue = 1,
  size = 'medium',
  sx,
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
