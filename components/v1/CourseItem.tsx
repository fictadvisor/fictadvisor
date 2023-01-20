import Link from "next/link";
import { mergeClassName } from "../../lib/component";
import pluralize from "../../lib/pluralize";

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
            <span className="f-medium">{title}</span>
            <p className="c-secondary">
              {
                noReviews 
                  ? <><span className="c-secondary">На жаль, відгуки про цей курс відсутні</span></>
                  : <>
                      Написано <span className="c-primary">{reviewCount}</span> {pluralize(reviewCount, 'відгук', 'відгуки', 'відгуків')} про цей курс, 
                      має середню оцінку <span className="c-primary">{+rating.toFixed(2)}</span>
                    </>
              }
            </p>
            {
              recommended &&
              <p className="c-recommended">Рекомендовано редакцією</p>
            }
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CourseItem;
