import Link from "next/link";

import Rating from "./Rating";
import {mergeClassName} from "../../lib/v1/component";
import {toDateTimeString} from "../../lib/v1/date";

export type ReviewProperties = {
  course?: { name: string; link: string; };
  date?: Date;
  rating: number;
  content: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Review = ({ course, date, rating, content, className, ...props }: ReviewProperties) => {
  return (
    <div className={mergeClassName('block review', className)} {...props}>
      <div className="top">
        <Rating rating={rating} />
        <div className="subject">
          <span className="f-medium">
            {
              course 
               ? <><Link href={`/courses/${course.link}`} className="simple" legacyBehavior>{course.name}</Link></>
               : 
                date &&
                <>{toDateTimeString(new Date(date))}</>
            }
          </span>
        </div>
      </div>
      <div className="main">
        {
          content.split('\n').map((text, i) => <p key={i}>{text}</p>)
        }
      </div>
    </div>
  );
};

export default Review;
