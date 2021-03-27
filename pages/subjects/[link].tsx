import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import CourseItem from "../../components/CourseItem";
import PageLayout from "../../components/layout/PageLayout";
import SubjectInformation from "../../components/SubjectInformation";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import Loader from "../../components/ui/Loader";
import SearchInput from "../../components/ui/SearchInput";
import api from "../../lib/api";
import { toInteger } from "../../lib/number";
import { useQueryParams } from "../../lib/query";
import { getFullName } from "../../lib/text";

const PROPERTIES = {
  pageSize: 6,
  sortBy: [
    {
      text: 'Рейтингом',
      data: 'rating'
    },
    {
      text: 'Назвою',
      data: 'lastName'
    }
  ],
};

const SubjectPage = ({ subject }) => {
  const [searchText, setSearchText] = useState('');
  const [sortType, _setSortType] = useState(0);
  const [page, _setPage] = useState(0);

  const { queryReady, withQueryParam } = useQueryParams((query) => {
    _setSortType(toInteger(query.sb, sortType));
    _setPage(toInteger(query.p, page));
  });

  const setSortType = withQueryParam('sb', _setSortType);
  const setPage =  withQueryParam('p', _setPage);

  const { data, isLoading, isFetching, error } = useQuery(
    ['subject-courses-search', page, searchText, sortType], 
    () => api.fetchCoursesBySubject(subject.link, { page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true, enabled: queryReady }
  );

  const searchActive = searchText.length > 0;

  return (
    <PageLayout
      meta={{ title: subject.name }}
      title="Сторінка предмету"
    >
      <SubjectInformation name={subject.name} description={subject.description} />
      <div className="flex" style={{ margin: '10px 0' }}>
        <SearchInput active={searchActive} style={{ flex: 1, marginRight: '10px' }} placeholder="Пошук викладачів" onChange={e => setSearchText(e.target.value)} />
        <Dropdown text="Сортування за:" active={sortType} onChange={i => setSortType(i)} options={PROPERTIES.sortBy} />
      </div>
      <div className="course-group">
        {
          isLoading || error || !data
            ? <Loader.Catchable error={error} />
            : data.items.map(c => 
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
      <Button 
        className="full-width"
        onClick={() => setPage(page + 1)}
      >
        Завантажити ще
      </Button>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { link } = context.query;

  try {
    const data = await api.fetchSubject(typeof(link) === 'object' ? link[0] : link);

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

