import { FC, ReactNode } from 'react';
import { Link as MuiLink, LinkProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { CustomLinkType } from '@/components/common/ui/custom-link/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './CustomLink.styles';

interface CustomLinkProps extends LinkProps {
  href: string;
  text: string | ReactNode;
  sx?: SxProps<Theme>;
  type?: CustomLinkType;
}
const CustomLink: FC<CustomLinkProps> = ({
  href,
  text,
  sx = {},
  type = CustomLinkType.WHITE,
  ...rest
}) => {
  return (
    <MuiLink
      {...rest}
      href={href}
      sx={mergeSx(styles.CustomLinkStyles(type), sx)}
    >
      {text}
    </MuiLink>
  );
};

export default CustomLink;
