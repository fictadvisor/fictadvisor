import { mergeClassName } from "../../../lib/v1/component";
import SearchIcon from "./icons/SearchIcon";

export type SearchInputProperties = {
	active?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ style, active, className, ...props }: SearchInputProperties) => {
	return (
		<div style={style} className={mergeClassName(`input ${active ? 'active' : ''}`, className)}>
			<SearchIcon />
			<input {...props} type="text" />
		</div>
	);
};

export default SearchInput;
