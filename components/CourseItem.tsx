import Link from "next/link";
import { mergeClassName } from "../lib/component";
import pluralize from "../lib/pluralize";

import Button from "./ui/Button";

export type CourseItemProperties = {
  title: string;
  rating: number;
  reviewCount: number;
  recommended: boolean;
  link: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CourseItem = ({ link, title, rating, reviewCount, recommended, className, ...props }: CourseItemProperties) => {
  const noReviews = !rating || !reviewCount;

  return (
    <Link href={`/courses/${link}`}>
      <a className="simple">
        <div className={mergeClassName("block course", className)} {...props}>
          <div className="info">
            <span className="font-medium">{title}</span>
            <p className="secondary">
              {
                noReviews 
                  ? <><span className="secondary">На жаль, відгуки про цей курс відсутні</span></>
                  : <>
                      Написано <span className="primary">{reviewCount}</span> {pluralize(reviewCount, 'відгук', 'відгуки', 'відгуків')} про цей курс, 
                      має середню оцінку <span className="primary">{rating}</span>
                    </>
              }
            </p>
            {
              recommended &&
              <p className="golden">Рекомендовано редакцією</p>
            }
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CourseItem;
