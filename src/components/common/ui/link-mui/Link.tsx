import { FC, ReactNode } from 'react';
import { Link as MuiLink } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { CustomLinkType } from '@/components/common/ui/link-mui/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Link.styles';

interface CustomLinkProps {
  href: string;
  text: string | ReactNode;
  sx?: SxProps<Theme>;
  type?: CustomLinkType;
}
const CustomLink: FC<CustomLinkProps> = ({
  href,
  text,
  type = CustomLinkType.WHITE,
  sx = {},
}) => {
  return (
    <MuiLink href={href} sx={mergeSx(styles.LinkStyles(type), sx)}>
      {text}
    </MuiLink>
  );
};

export default CustomLink;
