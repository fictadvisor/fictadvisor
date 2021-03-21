import { InputHTMLAttributes } from "react";
import SearchIcon from "./icons/SearchIcon";

type SearchInputProperties = {
	placeholder?: string;
	active?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ style, active, ...props }: SearchInputProperties) {
	return (
		<div style={style} className={`search-input ${active ? 'active' : ''}`}>
			<SearchIcon />
			<input {...props} type="text" />
		</div>
	);
};