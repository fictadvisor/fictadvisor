import {
  AlertType,
  AlertVariantType,
} from '@/components/common/ui/alert-mui/Alert';

const ColorMap: Record<AlertType, string[]> = {
  info: ['info.300', 'info.50', 'info.400'],
  warning: ['warning.400', 'warning.100', 'warning.500'],
  error: ['error.300', 'error.100', 'error.400'],
  success: ['success.300', 'success.100', 'success.400'],
};

const VariantIndexMap: Record<AlertVariantType, number> = {
  filled: 0,
  darker: 1,
  'border-left': 1,
  'border-top': 1,
  outlined: 2,
};
const getColor = (color, variant) => {
  const index = VariantIndexMap[variant];
  return ColorMap[color][index];
};
export default getColor;
