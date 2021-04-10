import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import CourseItem from "../../components/CourseItem";
import PageLayout from "../../components/layout/PageLayout";
import RatingSelect from "../../components/RatingSelect";
import Review from "../../components/Review";
import ReviewEditor from "../../components/ReviewEditor";
import SubjectInformation from "../../components/SubjectInformation";
import Button from "../../components/ui/Button";
import Disclaimer from "../../components/ui/Disclaimer";
import Divider from "../../components/ui/Divider";
import Dropdown from "../../components/ui/Dropdown";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import SearchInput from "../../components/ui/SearchInput";
import Slider from "../../components/ui/Slider";
import TextArea from "../../components/ui/TextArea";
import api from "../../lib/api";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import { toInteger } from "../../lib/number";
import pluralize from "../../lib/pluralize";
import { useQueryParams } from "../../lib/query";
import { getFullName } from "../../lib/text";

const PROPERTIES = {
  pageSize: 6,
  sortBy: [
    { text: 'Датою', data: 'date' as const },
    { text: 'Рейтингом', data: 'rating' as const }, 
  ]
};

const ReviewList = ({ data, isFetching, setPage, page }) => {
  if (data.count === 0) {
    return (
      <Disclaimer>
        На жаль, у нас немає відгуків про цей курс
      </Disclaimer>
    );
  }

  return (
    <>
      <div className="review-group">
          {
            data.items.map((r, i) => <Review key={i} rating={r.rating} content={r.content} date={r.date} /> )
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
  )
};

const CoursePage = ({ course }) => {
  const [searchText, _setSearchText] = useState('');
  const [reviewMode, setReviewMode] = useState(false);
  const [sortType, _setSortType] = useState(0);
  const [page, _setPage] = useState(0);

  const { user, getToken, loginUrl } = useAuthentication();

  const { queryReady, withQueryParam } = useQueryParams((query) => {
    _setSortType(toInteger(query.sb, sortType));
    _setPage(toInteger(query.p, page));
    _setSearchText(query.s ?? '');
  });

  const setSearchText = withQueryParam('s', _setSearchText);
  const setSortType = withQueryParam('sb', _setSortType);
  const setPage =  withQueryParam('p', _setPage);

  const searchActive = searchText.length > 0;
  const fullName = getFullName(course.teacher.last_name, course.teacher.first_name, course.teacher.middle_name);

  const { data, isLoading, isFetching, error } = useQuery(
    ['course-reviews-search', course.link, page, searchText, sortType], 
    () => api.courses.getReviews(course.link, { page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true, enabled: queryReady }
  );

  return (
    <PageLayout
      meta={{ title: `${course.name} - ${fullName}` }}
      title="Сторінка курсу"
    >
      <Link href={`/teachers/${course.teacher.link}`}>
        <a className="simple">
          <div className="block space-b" style={{ display: 'flex' }}>
            <div className="flex-grow font-bold" style={{ marginTop: '2px' }}>{fullName}</div>
            <div style={{ margin: '-6px 0 -12px' }}>
              <img className="avatar teacher small" src={course.teacher.image} />
            </div>
          </div>
        </a>
      </Link>
      <SubjectInformation className="space-b" name={course.name} description={course.description} rating={course.rating} />
      {
        reviewMode 
          ? <ReviewEditor token={getToken()} onBack={() => setReviewMode(false)} link={course.link} />
          : <Button 
              className="full-width" 
              onClick={() => {
                if (!user) {
                  window.location.href = loginUrl;
                  return;
                }

                setReviewMode(true);
              }}
            >
              Додати відгук
            </Button>
      }
      <div className="flex" style={{ margin: '10px 0' }}>
        <SearchInput active={searchActive} style={{ flex: 1, marginRight: '10px' }} placeholder="Пошук відгуку за змістом" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Dropdown text="Сортування за:" active={sortType} onChange={i => setSortType(i)} options={PROPERTIES.sortBy} />
      </div>
      {
        isLoading || error || !data
          ? <Loader.Catchable error={error} />
          : <ReviewList data={data} isFetching={isFetching} page={page} setPage={setPage} />
      }
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { link } = context.query;

  try {
    const data = await api.courses.get(typeof(link) === 'object' ? link[0] : link);

    return {
      props: {
        course: data,
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

export default CoursePage;
