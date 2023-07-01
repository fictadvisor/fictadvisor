import { SxProps, Theme } from '@mui/material/styles';

const mergeSx = (...sxProps: SxProps<Theme>[]): SxProps<Theme> => {
  return sxProps
    .filter(value => value)
    .reduce((prev, currentValue) => {
      return [
        ...(Array.isArray(prev) ? prev : [prev]),
        ...(Array.isArray(currentValue) ? currentValue : [currentValue]),
      ];
    }, [] as SxProps<Theme>);
};

export default mergeSx;
