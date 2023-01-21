import { DropdownOption, BaseDropdown } from './BaseDropdown';

export const MediumDropdown: React.FC<{ options: DropdownOption[]}> = ({ options }) => <BaseDropdown options={options} size={'medium'} />;
