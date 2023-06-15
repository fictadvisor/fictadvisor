import { SxProps, Theme } from '@mui/material/styles';

export const background = (isMobile): SxProps<Theme> => {
  const containerWidth = isMobile ? '100%' : '1000px';

  // Calculate the canvas width based on the first width (containerWidth)
  const canvasWidth = `calc(0.76 * ${containerWidth} + 59.2px)`;

  return {
    width: containerWidth,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    canvas: {
      marginLeft: '3px',
      marginBottom: '3px',
      position: 'relative',
      zIndex: '1',
      width: `${canvasWidth} !important`,
      height: `${canvasWidth} !important`,
      maxWidth: isMobile ? '455px' : '510px',
      maxHeight: isMobile ? '455px' : '510px',
      boxSizing: 'border-box',
    },

    svg: {
      position: 'absolute',
      right: 0,
      width: '100%',
    },
  };
};
