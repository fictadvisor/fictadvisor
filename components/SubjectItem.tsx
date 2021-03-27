import Link from "next/link";
import pluralize from "../lib/pluralize";

export type SubjectItemProperties = {
  link: string;
  name: string;
  teacherCount: number;
};

const SubjectItem = ({ link, name, teacherCount }: SubjectItemProperties) => {
  return (
    <Link href={`/subjects/${link}`}>
      <a className="simple">
        <div className="block flex">
          <div className="margin-auto font-medium">
            {name}
          </div>
          <div className="flex-grow align-right secondary">
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
