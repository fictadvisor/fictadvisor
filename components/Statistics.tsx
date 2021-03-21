import Button from "./ui/Button";
import Disclaimer from "./ui/Disclaimer";

function StatisticsField({ name, rating }) {
  return (
    <div className="statistics-field">
      <div className="statistics-label">
        <span className="font-medium">{name}</span>
        <span style={{ float: 'right' }}>{rating}</span>
      </div>
      <div className="statistics-progress"><div style={{ width: `${Math.round(rating / 5 * 100)}%` }}></div></div>
    </div>
  );
}

export function StatisticsBlock() {
  return (
    <div>
      <Disclaimer>
        Використовується статистика, яка була зібрана командою <a className="font-bold">ФИВТ им. Веры Петровны</a> у 2020 році
      </Disclaimer>
      <div className="statistics-field-group block" style={{ marginTop: '10px', borderRadius: '8px 8px 0 0' }}>
        <StatisticsField name="Ввічливість" rating={2.5} />
        <StatisticsField name="Пунктуальність" rating={4} />
        <StatisticsField name="Об'єктивність" rating={5} />
        <StatisticsField name="Загалом" rating={3.8} />
      </div>
      <a href="https://t.me/analyticsFICT" target="_blank">
        <Button className="accent attached">Хочу дізнатись більше</Button>
      </a>
    </div>
  );
};
