import Link from "next/link";
import pluralize from "../../lib/v1/pluralize";
import {mergeClassName} from "../../lib/v1/component";

export type SubjectItemProperties = {
  link: string;
  name: string;
  teacherCount: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const SubjectItem = ({ link, name, teacherCount, className, ...props }: SubjectItemProperties) => {
  return (
    <Link href={`/subjects/${link}`} className="simple" legacyBehavior>

        <div className={mergeClassName('block d-flex', className)} {...props}>
          <div className="m-auto f-medium d-flex-grow">
            {name}
          </div>
          <div className="a-r c-secondary a-r-label">
            <span>
              {
                teacherCount > 0 &&
                `${teacherCount} ${pluralize(teacherCount, 'викладач', 'викладача', 'викладачів')}`
              }
            </span>
          </div>
        </div>

      </Link>
  );
};

export default SubjectItem;
