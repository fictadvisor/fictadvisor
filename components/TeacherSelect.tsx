import { useState } from "react";
import { useQuery } from "react-query";
import api from "../lib/v1/api";
import { getFullName } from "../lib/v1/text";
import SearchInput from "./ui/SearchInput";

export type TeacherSearchProperties = {
  onSelect: (props: Omit<SearchItemProperties, "onSelect">) => any;
};

type SearchItemProperties = {
  text: string;
  data: any;
  onSelect: (props: Omit<SearchItemProperties, "onSelect">) => any;
};

const SearchItem = ({ onSelect, ...props }: SearchItemProperties) => {
  return (
    <a className="search-item clickable" onClick={() => onSelect(props)}>
      {props.text}
    </a>
  );
};

const TeacherSelect = ({ onSelect: _onSelect }: TeacherSearchProperties) => {
  const [searchText, setSearchText] = useState("");
  const [focused, setFocused] = useState(false);

  const searchActive = searchText.length > 0;

  const { data, error } = useQuery(
    ["teacher-search", searchText],
    () =>
      api.teachers.getAll({
        search: searchText,
        sort: "lastName",
        page: 0,
        page_size: 15,
        all: true,
      }),
    { keepPreviousData: true, enabled: searchActive }
  );

  let items: SearchItemProperties[] = [];

  if (!error && data && focused && searchActive) {
    if (data.items.length > 0) {
      items = data.items.map((t) => ({
        data: t,
        text: getFullName(t.last_name, t.first_name, t.middle_name),
      }));
    }
  }

  const collapsed = items.length > 0;

  const onSelect = (props) => {
    _onSelect(props);
    setSearchText("");
    setFocused(false);
  };

  return (
    <div className="global-search">
      <div className="global-search-container">
        <SearchInput
          onFocus={() => setFocused(true)}
          active={searchActive}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Обери викладача..."
          style={{ width: "100%" }}
          className={collapsed ? "collapsed" : ""}
        />
        {collapsed && (
          <div className="global-search-content">
            {items.map((c) => (
              <SearchItem key={c.data.id} {...c} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSelect;
