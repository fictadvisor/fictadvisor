import { DropdownOption, BaseDropdown } from './BaseDropdown';

export const LargeDropdown: React.FC<{ options: DropdownOption[]}> = ({ options }) => <BaseDropdown options={options} size={'large'} />;
