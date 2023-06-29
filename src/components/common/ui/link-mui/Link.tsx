import { FC, ReactNode } from 'react';
import { Link as MuiLink } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Link.styles';

enum LinkType {
  WHITE = 'white',
  BLUE = 'blue',
}
interface LinkProps {
  href: string;
  text: string | ReactNode;
  sx?: SxProps<Theme>;
  type?: LinkType;
}
const Link: FC<LinkProps> = ({ href, text, sx, type = LinkType.WHITE }) => {
  return (
    <MuiLink href={href} sx={mergeSx(styles.LinkStyles(type), sx)}>
      {text}
    </MuiLink>
  );
};

export default Link;
