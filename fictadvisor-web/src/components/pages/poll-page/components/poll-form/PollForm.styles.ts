import { SxProps, Theme } from '@mui/material/styles';

export const wrapper: SxProps<Theme> = {
  display: {
    mobile: 'block',
    desktop: 'flex',
  },
  width: {
    mobile: '100vw',
    desktop: '100%',
  },
  padding: {
    mobile: '0',
    desktop: '36px 25px 80px 60px',
  },
};
export const successWrapper: SxProps<Theme> = {
  margin: '0',
  width: '100%',
  minHeight: 'calc(100vh)',
};

export const wrapperBox = (
  isMobile: boolean,
  isQuestionsListOpened: boolean,
) => ({
  display: !isMobile || isQuestionsListOpened ? 'block' : 'none',
});
