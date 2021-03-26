import Link from "next/link";
import Rating from "./Rating";

type TeacherItemProperties = {
  link: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  rating?: number;
};

const TeacherItem = ({ link, lastName, firstName, middleName, rating }: TeacherItemProperties) => {
  return (
    <Link href={`/teachers/${link}`}>
      <a className="simple">
        <div className="block flex">
          <div className="margin-auto">
            <span className="font-medium">{lastName} </span>
            {firstName} {middleName}
          </div>
          <div className="flex-grow align-right">
            <Rating rating={rating} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default TeacherItem;

