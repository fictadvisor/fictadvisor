import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import StatisticsEntry, { StatisticsEntryProperties } from '../StatisticsEntry';

export type StatisticsBlockProperties = {
  entries: StatisticsEntryProperties[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StatisticsBlock = ({ entries, ...props }: StatisticsBlockProperties) => {
  return (
    <div {...props}>
      <Disclaimer>
        Використовується статистика, яка була зібрана командою <a className="font-bold">ФИВТ им. Веры Петровны</a> у 2020 році
      </Disclaimer>
      <div className="statistics-field-group block" style={{ borderRadius: '8px 8px 0 0' }}>
        {
          entries.map((e, i) => <StatisticsEntry key={i} {...e} />)
        }
      </div>
      <a href="https://t.me/analyticsFICT" target="_blank">
        <Button className="accent attached">Хочу дізнатись більше</Button>
      </a>
    </div>
  );
};

export default StatisticsBlock;

