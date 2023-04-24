import { TagColorType } from '@/components/common/ui/tag-mui/Tag';

const ColorMap: Record<TagColorType, string[]> = {
  primary: ['primary.300', 'primary.200', 'primary.300'],
  success: ['success.400', 'success.300', 'success.700'],
  error: ['error.400', 'error.300', 'error.500'],
  warning: ['warning.400', 'warning.200', 'warning.400'],
  info: ['info.300', 'info.50', 'info.300'],
  secondary: ['grey.200', 'backgroundDark.200', 'grey.300'],
  violet: ['violet.600', 'violet.500', 'violet.700'],
  mint: ['mint.400', 'mint.500', 'mint.500'],
  orange: ['orange.600', 'orange.500', 'orange.700'],
};

const VariantIndexMap = {
  fill: 0,
  darker: 1,
  outline: 2,
};
const colorInfo = (color, variant) => {
  const index = VariantIndexMap[variant];
  return ColorMap[color][index];
};
export default colorInfo;
