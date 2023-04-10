import { TagColorType } from '@/components/common/ui/tag-mui/Tag';

const ColorMap: Record<TagColorType, string[]> = {
  primary: ['primary.25', 'primary.10', 'primary.25'],
  success: ['success.100', 'success.50', 'success.400'],
  error: ['error.100', 'error.50', 'error.200'],
  warning: ['warning.100', 'warning.25', 'warning.100'],
  info: ['info.50', 'info.0', 'info.50'],
  secondary: ['gray.100', 'backgroundDark.10', 'gray.100'],
  violet: ['violet.300', 'violet.200', 'violet.400'],
  mint: ['mint.300', 'mint.200', 'mint.400'],
  orange: ['orange.300', 'orange.200', 'orange.400'],
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
