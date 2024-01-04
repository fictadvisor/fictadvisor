import { PopperProps } from '@mui/base';

export const popperProps: Partial<PopperProps> = {
  placement: 'bottom-start',
  modifiers: [
    { name: 'flip', enabled: false },
    {
      name: 'preventOverflow',
      options: {
        mainAxis: false,
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
};
