import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import StatisticsEntry from '../StatisticsEntry';
import { useQuery } from "react-query";
import api from "../../lib/api";
import Loader from "../ui/Loader";
import config from "../../config";

export type StatisticsBlockProperties = {
  link: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const EntryList = ({ data }) => {
  if (data.items.length === 0) {
    return (
      <Disclaimer>
        На жаль, у нас немає статистики цього викладача
      </Disclaimer>
    );
  }

  const average = +(data.items.reduce((p, c) => p + c.value, 0) / data.items.length).toFixed(2);

  return (
    <>
      <Disclaimer className="m-b">
        Використовується статистика, яка була зібрана командою <a className="f-bold">{config.contacts.sovaChannelName}</a> у 2020 році
      </Disclaimer>
      <div className="statistics-field-group block" style={{ borderRadius: '8px 8px 0 0' }}>
        {
          data.items.map((e, i) => <StatisticsEntry key={i} name={e.name} value={e.value} />)
        }
        <StatisticsEntry key="average" name="Загалом" value={average} />
      </div>
      <a href={`https://t.me/${config.contacts.sovaChannel}`} target="_blank">
        <Button className="accent attached">Хочу дізнатись більше</Button>
      </a>
    </>
  );
};

const StatisticsBlock = ({ link, ...props }: StatisticsBlockProperties) => {
  const { data, isLoading, isFetching, error } = useQuery(
    ['teacher-stats', link], 
    () => api.teachers.getStats(link), 
    { keepPreviousData: true }
  );

  return (
    <div {...props}>
      {
        isLoading || error
          ? <Loader.Catchable error={error} />
          : <EntryList data={data} />
      }
    </div>
  );
};

export default StatisticsBlock;

