import { FieldSize } from '@/components/common/ui/form/common/types';
import { TagProps } from '@/components/common/ui/tag-mui/types';

interface OptionBase {
  // TODO: rename to id
  value: string;
}
interface DropDownTextOption extends OptionBase {
  label: string;
}

interface DropDownTagOption extends OptionBase, TagProps {}

export type DropDownOption = DropDownTagOption | DropDownTextOption;

export interface DropdownProps {
  options: DropDownOption[];
  label?: string;
  name?: string;
  isDisabled?: boolean;
  placeholder?: string;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  size?: FieldSize;
  noOptionsText?: string;
  width?: string;
  onChange?: () => void;
  disableClearable?: boolean;
}
