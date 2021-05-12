import Link from "next/link";
import { mergeClassName } from "../lib/component";
import Rating from "./Rating";

export type TeacherItemProperties = {
  link: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  rating?: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const TeacherItem = ({ className, link, lastName, firstName, middleName, rating, ...props }: TeacherItemProperties) => {
  return (
    <Link href={`/teachers/${link}`}>
      <a className="simple">
        <div className={mergeClassName('block flex', className)} {...props}>
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

