import React, {useState} from "react";
import {toInteger} from "../../lib/v1/number";
import {useQuery} from "react-query";
import api from "../../lib/v1/api";
import {useAuthentication} from "../../lib/v1/context/AuthenticationContext";
import {useQueryParams} from "../../lib/v1/query";
import AddSubjectForm from "../../components/v1/forms/AddSubjectForm";
import PageLayout from "../../components/v1/layout/PageLayout";
import Button from "../../components/v1/ui/Button";
import SearchInput from "../../components/v1/ui/SearchInput";
import Dropdown from "../../components/v1/ui/Dropdown";
import Loader from "../../components/v1/ui/Loader";
import SubjectItem from "../../components/v1/SubjectItem";

const PROPERTIES = {
  pageSize: 10,
  sortBy: [
    {
      text: 'Популярністю',
      data: 'rating' as const
    },
    {
      text: 'Назвою',
      data: 'name' as const
    }
  ],
};

const SubjectsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [sortType, _setSortType] = useState(0);
  const [page, _setPage] = useState(0);
  const [formMode, setFormMode] = useState(false);
  const authentication = useAuthentication();

  const { queryReady, withQueryParam } = useQueryParams((query) => {
    _setSortType(toInteger(query.sb, sortType));
    _setPage(toInteger(query.p, page));
  });

  const setSortType = withQueryParam('sb', _setSortType);
  const setPage =  withQueryParam('p', _setPage);

  const { data, isLoading, isFetching, error } = useQuery(
    ['subjects-search', page, searchText, sortType], 
    () => api.subjects.getAll({ page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true, enabled: queryReady }
  );

  const searchActive = searchText.length > 0;

  return (
    <PageLayout
      meta={{ title: 'Предмети' }}
      title="Предмети"
    >
      {
        formMode 
          ? <AddSubjectForm authentication={authentication} onBack={() => setFormMode(false)} />
          : <Button 
              className="w-full" 
              onClick={() => {
                if (!authentication.user) {
                  authentication.login();
                  return;
                }

                setFormMode(true);
              }}
            >
              Додати предмет
            </Button>
      }
      <div className="adaptive-input-container d-flex m-b m-t">
        <SearchInput active={searchActive} className="d-flex-grow" placeholder="Пошук предметів" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Dropdown text="Сортування за:" active={sortType} onChange={i => setSortType(i)} options={PROPERTIES.sortBy} />
      </div>
      <div className="teacher-list">
        {
          isLoading || error || !data
            ? <Loader.Catchable error={error} />
            : data.items.map(s => 
                <SubjectItem 
                  key={s.id}
                  link={s.link} 
                  name={s.name}
                  teacherCount={s.teacher_count}
                />
            )
        }
      </div>
      {
        (data && !error && data.count > (page + 1) * PROPERTIES.pageSize) &&
        <Button loading={isLoading || isFetching} className="w-full" onClick={() => setPage(page + 1)}>Завантажити ще</Button>
      }
    </PageLayout>
  );
};

export default SubjectsPage;