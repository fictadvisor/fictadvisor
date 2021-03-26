import { mergeClassName } from "../lib/component";

export type StatisticsEntryProperties = {
  name: string;
  rating: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StatisticsEntry = ({ name, rating, className, ...props }: StatisticsEntryProperties) => {
  return (
    <div className={mergeClassName('statistics-field', className)} {...props}>
      <div className="statistics-label">
        <span className="font-medium">{name}</span>
        <span style={{ float: 'right' }}>{rating}</span>
      </div>
      <div className="statistics-progress"><div style={{ width: `${Math.round(rating / 5 * 100)}%` }}></div></div>
    </div>
  );
};

export default StatisticsEntry;
