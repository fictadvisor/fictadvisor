import CourseItem, { CourseItemProperties } from '../CourseItem';
import Button from '../ui/Button';

export type CourseBlockProperties = {
  courses: CourseItemProperties[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CourseBlock = ({ courses, ...props }: CourseBlockProperties) => {
  return (
    <div {...props}>
      <div className="subject-group">
        {
          courses.map((c, i) => <CourseItem key={i} {...c} />)
        }
      </div>
      <Button className="full-width">Завантажити ще</Button>
    </div>
  );
};

export default CourseBlock;
