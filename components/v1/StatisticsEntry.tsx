import { mergeClassName } from "../../lib/component";

export type StatisticsEntryProperties = {
  name: string;
  value: number | string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StatisticsEntry = ({ name, value, className, ...props }: StatisticsEntryProperties) => {
  const numericValue = typeof(value) === 'string' ? parseFloat(value) : value;

  return (
    <div className={mergeClassName('statistics-field', className)} {...props}>
      <div className="statistics-label">
        <span className="f-medium">{name}</span>
        <span style={{ float: 'right' }}>{value}</span>
      </div>
      <div className="statistics-progress"><div style={{ width: `${Math.round(numericValue / 5 * 100)}%` }}></div></div>
    </div>
  );
};

export default StatisticsEntry;
