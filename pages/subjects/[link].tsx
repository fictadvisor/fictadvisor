import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import AddCourseForm from "../../components/forms/AddCourseForm";
import CourseItem from "../../components/CourseItem";
import PageLayout from "../../components/layout/PageLayout";
import SubjectInformation from "../../components/SubjectInformation";
import Button from "../../components/ui/Button";
import Disclaimer from "../../components/ui/Disclaimer";
import Dropdown from "../../components/ui/Dropdown";
import Loader from "../../components/ui/Loader";
import SearchInput from "../../components/ui/SearchInput";
import api from "../../lib/api";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import { toInteger } from "../../lib/number";
import { useQueryParams } from "../../lib/query";
import { getFullName } from "../../lib/text";

const PROPERTIES = {
  pageSize: 6,
  sortBy: [
    {
      text: 'Рейтингом',
      data: 'rating' as const
    },
    {
      text: 'Назвою',
      data: 'name' as const
    }
  ],
};

const CoursesList = ({ data, isFetching, setPage, page }) => {
  if (data.count === 0) {
    return (
      <Disclaimer>
        На жаль, у нас немає інформації про курси цього предмету
      </Disclaimer>
    );
  }

  return (
    <>
      <div className="block-container">
        {
          data.items.map(c => 
            <CourseItem 
              key={c.id}
              link={c.link} 
              title={getFullName(c.teacher.last_name, c.teacher.first_name, c.teacher.middle_name)}
              rating={c.rating}
              reviewCount={c.review_count}
              recommended={c.recommended}
            />
          )
        }
      </div>
      {
        data.count > (page + 1) * PROPERTIES.pageSize &&
        <Button 
          loading={isFetching}
          className="full-width"
          onClick={() => setPage(page + 1)}
        >
          Завантажити ще
        </Button>
      }
    </>
  );
};

const SubjectPage = ({ subject }) => {
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
    ['subject-courses-search', subject.link, page, searchText, sortType], 
    () => api.subjects.getCourses(subject.link, { page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true, enabled: queryReady }
  );

  const searchActive = searchText.length > 0;

  return (
    <PageLayout
      meta={{ title: subject.name }}
      title="Сторінка предмету"
    >
      <SubjectInformation name={subject.name} description={subject.description} className="space-b" />
      {
        formMode 
          ? <AddCourseForm authentication={authentication} subject={subject.id} onBack={() => setFormMode(false)} />
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
      {
        isLoading || error || !data
          ? <Loader.Catchable error={error} />
          : <CoursesList data={data} isFetching={isFetching} page={page} setPage={setPage} />
      }
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { link } = context.query;

  try {
    const data = await api.subjects.get(typeof(link) === 'object' ? link[0] : link);

    return {
      props: {
        subject: data,
      },
    };
  } catch (e) {
    const error = e as AxiosError;

    if (error.response.status === 404) {
      return { notFound: true };
    }

    throw e;
  }
};

export default SubjectPage;

