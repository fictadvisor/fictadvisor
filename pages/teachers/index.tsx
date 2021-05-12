import api from "../../lib/api";

import { useState } from "react";
import { useQuery } from "react-query";
import { toInteger } from "../../lib/number";
import { useQueryParams } from "../../lib/query";

import PageLayout from "../../components/layout/PageLayout";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import Loader from "../../components/ui/Loader";

import TeacherItem from "../../components/TeacherItem";
import SearchInput from "../../components/ui/SearchInput";
import AddTeacherForm from "../../components/forms/AddTeacherForm";
import { useAuthentication } from "../../lib/context/AuthenticationContext";

const PROPERTIES = {
  pageSize: 10,
  sortBy: [
    {
      text: 'Рейтингом',
      data: 'rating' as const
    },
    {
      text: 'Ім\'ям',
      data: 'lastName' as const
    }
  ],
};

const TeachersPage = () => {
  const [searchText, _setSearchText] = useState('');
  const [sortType, _setSortType] = useState(0);
  const [page, _setPage] = useState(0);
  const [formMode, setFormMode] = useState(false);
  const authentication = useAuthentication();

  const { queryReady, withQueryParam } = useQueryParams((query) => {
    _setSortType(toInteger(query.sb, sortType));
    _setPage(toInteger(query.p, page));
    _setSearchText(query.s ?? '');
  });

  const setSortType = withQueryParam('sb', _setSortType);
  const setPage =  withQueryParam('p', _setPage);
  const setSearchText = withQueryParam('s', _setSearchText);

  const { data, isLoading, isFetching, error } = useQuery(
    ['teachers-search', page, searchText, sortType], 
    () => api.teachers.getAll({ page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true, enabled: queryReady }
  );

  const searchActive = searchText.length > 0;

  return (
    <PageLayout
      meta={{ title: 'Викладачі' }}
      title="Викладачі"
    >
      {
        formMode 
          ? <AddTeacherForm authentication={authentication} onBack={() => setFormMode(false)} />
          : <Button 
              className="full-width" 
              onClick={() => {
                if (!authentication.user) {
                  window.location.href = authentication.loginUrl;
                  return;
                }

                setFormMode(true);
              }}
            >
              Додати викладача
            </Button>
      }
      <div className="adaptive-input-container flex space-b space-t">
        <SearchInput active={searchActive} style={{ flex: 1 }} placeholder="Пошук викладачів" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Dropdown text="Сортування за:" active={sortType} onChange={i => setSortType(i)} options={PROPERTIES.sortBy} />
      </div>
      <div className="teacher-list">
        {
          isLoading || error || !data
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
        (data && !error && data.count > (page + 1) * PROPERTIES.pageSize) &&
        <Button loading={isLoading || isFetching} className="full-width" onClick={() => setPage(page + 1)}>Завантажити ще</Button>
      }
    </PageLayout>
  );
};

export default TeachersPage;