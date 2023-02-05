import styles from './../../../styles/v2/local/elements/Star.module.scss';

//rating - number beetween 0 and 5
type RatingProps = {
  rating: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Rating: React.FC<RatingProps> = ({ rating, ...rest }) => {
  return (
    <div className={styles[`rating-conatainer`]} {...rest}>
      <div className={styles["ratings"]}>
        <div className={styles["empty-stars"]}></div>
        <div
          className={styles["full-stars"]}
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
