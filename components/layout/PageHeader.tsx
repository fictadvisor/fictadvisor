import { useState } from "react";
import { SearchInput } from "../ui/SearchInput";

export default function PageHeader() {
  const [searchText, setSearchText] = useState('');
  const searchActive = searchText.length > 0;

  return (
    <div className="header">
      <div className="left">
        
      </div>

      <div className="content">
        <SearchInput 
          active={searchActive} 
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Пошук викладачів, предметів та іншої інформації" 
        />
      </div>

      <div className="right">

      </div>
    </div>
  );
};