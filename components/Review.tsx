import Link from "next/link";
import { mergeClassName } from "../lib/component";
import { toDateTimeString } from "../lib/date";

import Rating from "./Rating";

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
          <span className="font-medium">
            {
              course 
               ? <><Link href={`/courses/${course.link}`}><a className="simple">{course.name}</a></Link></>
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
