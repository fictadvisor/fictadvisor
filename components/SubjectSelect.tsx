import { useState } from "react";
import { useQuery } from "react-query";
import api from "../lib/api";
import SearchInput from "./ui/SearchInput";

export type SubjectSearchProperties = {
  onSelect: (props: Omit<SearchItemProperties, 'onSelect'>) => any;
};

type SearchItemProperties = {
  text: string;
  data: any;
  onSelect: (props: Omit<SearchItemProperties, 'onSelect'>) => any;
};

const SearchItem = ({ onSelect, ...props }: SearchItemProperties) => {
  return (
    <a className="search-item clickable" onClick={() => onSelect(props)}>
      {props.text}
    </a>
  );
};

const SubjectSelect = ({ onSelect: _onSelect }: SubjectSearchProperties) => {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);

  const searchActive = searchText.length > 0;

  const { data, error } = useQuery(
    ['subject-search', searchText], 
    () => api.subjects.getAll({ search: searchText, sort: 'name', page: 0, page_size: 15, all: true }), 
    { keepPreviousData: true, enabled: searchActive },
  );

  let items: SearchItemProperties[] = [];

  if (!error && data && focused && searchActive) {
    if (data.items.length > 0) {
      items = data.items.map(
        s => ({ data: s, text: s.name })
      );
    }
  }

  const collapsed = items.length > 0;

  const onSelect = (props) => {
    _onSelect(props);
    setSearchText('');
    setFocused(false);
  };

  return (
    <div className="global-search">
      <div className="global-search-container">
        <SearchInput 
          onFocus={() => setFocused(true)}
          active={searchActive} 
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Обери предмет..." 
          style={{ width: '100%' }}
          className={collapsed ? 'collapsed' : ''}
        />
        {
          collapsed &&
          <div className="global-search-content">
            {
              items.map(c => <SearchItem key={c.data.id} {...c} onSelect={onSelect} />)
            }
          </div>
        }
      </div>
    </div>
  )
};

export default SubjectSelect;
