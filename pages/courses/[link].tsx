import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import CourseItem from "../../components/CourseItem";
import PageLayout from "../../components/layout/PageLayout";
import RatingSelect from "../../components/RatingSelect";
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
import { toInteger } from "../../lib/number";
import pluralize from "../../lib/pluralize";
import { useQueryParams } from "../../lib/query";
import { getFullName } from "../../lib/text";

const PROPERTIES = {
  sortBy: [
    { text: 'Рейтингом', data: 'rating' }, 
    { text: 'Датою', data: 'date' }
  ]
};

const CoursePage = ({ course }) => {
  const [searchText, setSearchText] = useState('');
  const [reviewMode, setReviewMode] = useState(false);
  const [sortType, _setSortType] = useState(0);
  const [page, _setPage] = useState(0);

  const { queryReady, withQueryParam } = useQueryParams((query) => {
    _setSortType(toInteger(query.sb, sortType));
    _setPage(toInteger(query.p, page));
  });

  const setSortType = withQueryParam('sb', _setSortType);
  const setPage =  withQueryParam('p', _setPage);
  const fullName = getFullName(course.teacher.last_name, course.teacher.first_name, course.teacher.middle_name);

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
        !reviewMode &&
        <Button className="full-width" onClick={() => setReviewMode(true)}>Додати відгук</Button>
      }
      {
        reviewMode &&
        <ReviewEditor onBack={() => setReviewMode(false)} link={course.link} />
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
