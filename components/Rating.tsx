import StarIcon from "./ui/icons/StarIcon";

const getStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    let type = 'empty' as any;

    if (rating == null || rating >= i) {
      type = 'full';
    } else if (rating >= i - 0.5) {
      type = 'half';
    }

    stars.push(<StarIcon key={i} type={type} />);
  }

  return stars;
};

type RatingProperties = {
  rating: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Rating = ({ className, rating, ...props }: RatingProperties) => {
  return <div className={`${rating == null ? 'secondary' : ''} ${className ?? ''}`} {...props}>{getStars(rating)}</div>
};
