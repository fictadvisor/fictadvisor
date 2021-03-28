import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../lib/api';
import CourseItem, { CourseItemProperties } from '../CourseItem';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

const PROPERTIES = {
  pageSize: 5,
};

export type CourseBlockProperties = {
  link: string;
  courses: CourseItemProperties[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CourseBlock = ({ link, courses, ...props }: CourseBlockProperties) => {
  const [page, _setPage] = useState(0);
  const { data, isLoading, isFetching, error } = useQuery(
    ['teacher-courses', page], 
    () => api.teachers.getCourses(link, { page: 0, page_size: PROPERTIES.pageSize * (page + 1) }), 
    { keepPreviousData: true }
  );

  return (
    <div {...props}>
      <div className="course-group">
        {
          courses
           ? courses.map((c, i) => <CourseItem key={i} {...c} />)
           : <Loader />
        }
      </div>
      <Button className="full-width">Завантажити ще</Button>
    </div>
  );
};

export default CourseBlock;
