import { AlertType, AlertVariant } from '../types';

const ColorMap: Record<AlertType, string[]> = {
  [AlertType.INFO]: ['info.300', 'info.50', 'info.400'],
  [AlertType.WARNING]: ['warning.400', 'warning.100', 'warning.500'],
  [AlertType.ERROR]: ['error.300', 'error.100', 'error.400'],
  [AlertType.SUCCESS]: ['success.300', 'success.100', 'success.400'],
};

const VariantIndexMap: Record<AlertVariant, number> = {
  [AlertVariant.FILLED]: 0,
  [AlertVariant.DARKER]: 1,
  [AlertVariant.BORDER_LEFT]: 1,
  [AlertVariant.BORDER_TOP]: 1,
  [AlertVariant.OUTLINED]: 2,
};
const getColor = (color: AlertType, variant: AlertVariant) => {
  const index = VariantIndexMap[variant];
  return ColorMap[color][index];
};
export default getColor;
