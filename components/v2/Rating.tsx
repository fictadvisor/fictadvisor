//rating - number beetween 0 and 5
type RatingProps = {
  rating: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Rating: React.FC<RatingProps> = ({ rating, className, ...rest }) => {
  return (
    <div className={`rating-conatainer ${className}`} {...rest}>
      <div className="ratings">
        <div className="empty-stars"></div>
        <div
          className="full-stars"
          style={{
            width: `${(rating / 5) * 100}%`,
          }}
        ></div>
      </div>
      <span>{rating}</span>
    </div>
  );
};

export default Rating;
