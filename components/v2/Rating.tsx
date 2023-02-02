//rating - number beetween 0 and 10
type RatingProps = {
  rating: number,
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;


const Rating: React.FC<RatingProps> = ({ rating, ...rest }) => {
  return (
    <div className="ratings" {...rest}>
      <div className="empty-stars"></div>
      <div
        className="full-stars"
        style={{
          width: `${(rating / 5) * 100}%`,
        }}
        
      ></div>
    </div>
  );
};

export default Rating;
