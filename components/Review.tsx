import { mergeClassName } from "../lib/component";
import { toDateTimeString } from "../lib/date";

import Rating from "./Rating";

export type ReviewProperties = {
  subject?: string;
  date?: Date;
  rating: number;
  content: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Review = ({ subject, date, rating, content, className, ...props }: ReviewProperties) => {
  return (
    <div className={mergeClassName('block review', className)} {...props}>
      <div className="top">
        <Rating rating={rating} />
        <div className="subject">
          <span className="font-medium">
            {
              subject 
               ? <>{subject}</>
               : <>{toDateTimeString(new Date(date))}</>
            }
          </span>
        </div>
      </div>
      <div className="main">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Review;
