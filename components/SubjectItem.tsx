import Link from "next/link";
import { mergeClassName } from "../lib/component";
import pluralize from "../lib/pluralize";

export type SubjectItemProperties = {
  link: string;
  name: string;
  teacherCount: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;;

const SubjectItem = ({ link, name, teacherCount, className, ...props }: SubjectItemProperties) => {
  return (
    <Link href={`/subjects/${link}`}>
      <a className="simple">
        <div className={mergeClassName('block d-flex', className)} {...props}>
          <div className="m-auto f-medium">
            {name}
          </div>
          <div className="d-flex-grow a-r c-secondary">
            {
              teacherCount > 0 &&
              `${teacherCount} ${pluralize(teacherCount, 'викладач', 'викладача', 'викладачів')}`
            }
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SubjectItem;
