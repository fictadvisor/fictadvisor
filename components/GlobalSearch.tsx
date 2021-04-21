import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import api from "../lib/api";
import { getFullName } from "../lib/text";
import Divider from "./ui/Divider";
import AssignmentIcon from "./ui/icons/AssignmentIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import ExploreIcon from "./ui/icons/ExploreIcon";
import SchoolIcon from "./ui/icons/SchoolIcon";
import SearchInput from "./ui/SearchInput";
import { MENU } from './layout/PageHeader';
import pluralize from "../lib/pluralize";

type SearchItemType = 'teacher' | 'subject' | 'navigation' | 'other';

const searchMenu = (text: string): SearchItemProperties[] => {
  return MENU.navigation
    .filter(v => v.text.toLowerCase().indexOf(text.toLowerCase()) != -1)
    .map(v => ({ href: v.href, text: v.text }));
};

const searchItemTypes = {
  teacher: {
    icon: () => <SchoolIcon style={{ width: '18px', height: '18px', margin: '0 12px -4px 0' }} />,
  },
  subject: {
    icon: () => <AssignmentIcon style={{ width: '18px', height: '18px', margin: '0 12px -4px 0' }} />,
  },
  navigation: {
    icon: () => <ExploreIcon style={{ width: '18px', height: '18px', margin: '0 12px -4px 0' }} />,
  },
  other: {
    icon: () => <BookmarkIcon style={{ width: '18px', height: '18px', margin: '0 12px -4px 0' }} />,
  },
};

type SearchItemProperties = {
  text: string;
  href: string;
  type?: SearchItemType;
};

const SearchItem = (props: SearchItemProperties) => {
  const type = searchItemTypes[props.type ?? 'other'];
  const Icon = type.icon;

  return (
    <Link href={props.href}>
      <a className="search-item">
        {Icon && <Icon />}
        {props.text}
      </a>
    </Link>
  )
};

type SearchCategoryProperties = {
  last: boolean;
  type: SearchItemType;
  items: SearchItemProperties[];
};

const SearchCategory = ({ items, type, last }: SearchCategoryProperties) => {
  return (
    <>
      {items.map(i => <SearchItem type={type} {...i} />)}
      {
        !last &&
        <Divider />
      }
    </>
  );
};

const GlobalSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);

  const searchActive = searchText.length > 0;
  const shouldFetch = searchActive && focused;

  const { data, error } = useQuery(
    ['global-search', searchText], 
    () => api.search.getAll({ search: searchText }), 
    { keepPreviousData: true, enabled: shouldFetch },
  );

  const categories: SearchCategoryProperties[] = [];

  if (!error && data && shouldFetch) {
    const navigation = searchMenu(searchText);

    if (navigation.length > 0) {
      categories.push({ 
        last: false, 
        type: 'navigation', 
        items: navigation,
      });
    }

    if (data.teachers.length > 0) {
      categories.push({ 
        last: false, 
        type: 'teacher', 
        items: data.teachers.map(
          t => ({ href: `/teachers/${t.link}`, text: getFullName(t.last_name, t.first_name, t.middle_name) })
        ),
      });
    }
    
    if (data.subjects.length > 0) {
      categories.push({ 
        last: false, 
        type: 'subject', 
        items: data.subjects.map(
          s => ({ href: `/subjects/${s.link}`, text: s.name })
        ),
      });
    }
  }

  const collapsed = categories.length > 0;

  if (collapsed) {
    categories[categories.length - 1].last = true;
  }

  return (
    <div className="global-search">
      <div className="global-search-container">
        <SearchInput 
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(true)}
          active={searchActive} 
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Пошук викладачів, предметів та іншої інформації" 
          style={{ width: '100%' }}
          className={collapsed ? 'collapsed' : ''}
        />
        {
          collapsed &&
          <div className="global-search-content">
            {
              categories.map(c => <SearchCategory {...c} />)
            }
          </div>
        }
      </div>
    </div>
  )
};

export default GlobalSearch;
