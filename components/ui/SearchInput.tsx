import { InputHTMLAttributes } from "react";
import { mergeClassName } from "../../lib/component";
import SearchIcon from "./icons/SearchIcon";

export type SearchInputProperties = {
	placeholder?: string;
	active?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ style, active, className, ...props }: SearchInputProperties) => {
	return (
		<div style={style} className={mergeClassName(`search-input ${active ? 'active' : ''}`, className)}>
			<SearchIcon />
			<input {...props} type="text" />
		</div>
	);
};

export default SearchInput;
