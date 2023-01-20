export type RatingSelectProperties = {
  value: number;
  onChange: (value: number) => any;
};

const RatingSelect = ({ value, onChange }: RatingSelectProperties) => {
  const sections = [];
  const sectionValue = value / 5 * 10;

  for (let i = 1; i < 11; i++) {
    let rate = i / 10 * 5;
    
    if (rate < 1) {
      rate = 1;
    }

    sections.push(
      <div
        key={i}
        title={rate.toString()}
        className={sectionValue >= i ? 'active' : ''}
        onClick={() => onChange(rate)}
      />
    );
  }

  return (
    <div className="rating-select">
      {sections}
    </div>
  );
};

export default RatingSelect;