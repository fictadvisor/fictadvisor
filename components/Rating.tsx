import { mergeClassName } from "../lib/component";

import StarIcon from "./ui/icons/StarIcon";

const getStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    let type = 'empty' as any;

    if (rating == null || rating === 0 || rating >= i) {
      type = 'full';
    } else if (rating >= i - 0.5) {
      type = 'half';
    }

    stars.push(<StarIcon key={i} type={type} />);
  }

  return stars;
};

export type RatingProperties = {
  rating: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Rating = ({ className, rating, children, ...props }: RatingProperties) => {
  return (
    <div 
      className={mergeClassName(rating == null || rating === 0 ? 'secondary' : '', className)} 
      {...props}
    >
      {getStars(rating)}
    </div>
  );
};

export default Rating;
