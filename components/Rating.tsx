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

const Rating = ({ rating, children, style, className, ...props }: RatingProperties) => {
  const hasRating = rating == null || rating === 0;

  return (
    <div 
      className={mergeClassName('rating', className)}
      style={{ ...style, visibility: !hasRating ? 'visible' : 'hidden' }}
      {...props}
    >
      {getStars(rating)}
    </div>
  );
};

export default Rating;
