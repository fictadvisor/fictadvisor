import Link from "next/link";
import { mergeClassName } from "../lib/v1/component";
import Rating from "./Rating";

export type TeacherItemProperties = {
  link: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  rating?: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const TeacherItem = ({
  className,
  link,
  lastName,
  firstName,
  middleName,
  rating,
  ...props
}: TeacherItemProperties) => {
  return (
    <Link href={`/teachers/${link}`}>
      <a className="simple">
        <div className={mergeClassName("block d-flex", className)} {...props}>
          <div className="m-auto d-flex-grow">
            <span className="f-medium">{lastName} </span>
            {firstName} {middleName}
          </div>
          <div className="a-r a-r-label">
            <span>
              <Rating rating={rating} />
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default TeacherItem;
