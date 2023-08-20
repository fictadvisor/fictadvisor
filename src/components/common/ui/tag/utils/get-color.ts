import { TagColor, TagVariant } from '../types';

const ColorMap: Record<TagColor, string[]> = {
  [TagColor.PRIMARY]: ['primary.300', 'primary.200', 'primary.300'],
  [TagColor.SUCCESS]: ['success.400', 'success.300', 'success.700'],
  [TagColor.ERROR]: ['error.400', 'error.300', 'error.500'],
  [TagColor.WARNING]: ['warning.400', 'warning.200', 'warning.400'],
  [TagColor.INFO]: ['info.300', 'info.50', 'info.300'],
  [TagColor.SECONDARY]: ['grey.200', 'backgroundDark.200', 'grey.300'],
  [TagColor.VIOLET]: ['violet.600', 'violet.500', 'violet.700'],
  [TagColor.MINT]: ['mint.400', 'mint.500', 'mint.500'],
  [TagColor.ORANGE]: ['orange.600', 'orange.500', 'orange.700'],
  [TagColor.INDIGO]: ['indigo.700', 'indigo.500', 'indigo.700'],
};

const VariantIndexMap: Record<TagVariant, number> = {
  [TagVariant.FILL]: 0,
  [TagVariant.DARKER]: 1,
  [TagVariant.OUTLINE]: 2,
};
const getColor = (color: TagColor, variant: TagVariant) => {
  const index = VariantIndexMap[variant];
  return ColorMap[color][index];
};
export default getColor;
