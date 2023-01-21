import { DropdownOption, BaseDropdown } from './BaseDropdown';

export const SmallDropdown: React.FC<{ options: DropdownOption[]}> = ({ options }) => <BaseDropdown options={options} size={'small'} />;
