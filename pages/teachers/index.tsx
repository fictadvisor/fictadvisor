import { useState } from "react";
import { useQuery } from "react-query";
import PageLayout from "../../components/layout/PageLayout";
import { TeacherItem } from "../../components/TeacherItem";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import Loader from "../../components/ui/Loader";
import { SearchInput } from "../../components/ui/SearchInput";
import api from "../../lib/api";

const PAGE_SIZE = 1;

const TeachersPage = () => {
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState(0);
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, error } = useQuery(
    ['teachers-search', page, searchText, sortType], 
    () => api.fetchTeachers({ page: 0, page_size: PAGE_SIZE * (page + 1), search: searchText }), 
    { keepPreviousData: true }
  );

  const searchActive = searchText.length > 0;

  return (
    <PageLayout
      meta={{ title: 'Викладачі' }}
      title="Викладачі"
    >
      <div className="flex" style={{ marginBottom: '10px' }}>
        <SearchInput active={searchActive} style={{ flex: 1, marginRight: '10px' }} placeholder="Пошук викладачів" onChange={e => setSearchText(e.target.value)} />
        <Dropdown text="Сортування за:" active={sortType} onChange={i => setSortType(i)} options={[{ text: 'Рейтингом' }, { text: 'Ім\'ям' }]} />
      </div>
      <div className="teacher-list">
        {
          isLoading || error
            ? <Loader.Catchable error={error} />
            : data.items.map(t => 
                <TeacherItem 
                  key={t.id}
                  link={t.link} 
                  firstName={t.first_name} 
                  lastName={t.last_name} 
                  middleName={t.middle_name}
                  rating={t.rating} 
                />
            )
        }
      </div>
      {
        (data && !error && data.count - 1 > page * PAGE_SIZE) &&
        <Button loading={isLoading || isFetching} className="full-width" onClick={() => setPage(page + 1)}>Завантажити ще</Button>
      }
    </PageLayout>
  );
};

export default TeachersPage;