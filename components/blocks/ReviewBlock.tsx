import { useState } from "react";
import { mergeClassName } from "../../lib/component";

import Review, { ReviewProperties } from "../Review";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import SearchInput from "../ui/SearchInput";

export type ReviewBlockProperties = {
  reviews: ReviewProperties[];
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ReviewBlock = ({ reviews, className, ...props }: ReviewBlockProperties) => {
  const [sortType, setSortType] = useState(0);

  return (
    <div>
      <div className={mergeClassName('flex', className)} style={{ marginBottom: '10px' }} {...props}>
        <SearchInput style={{ flex: 1, marginRight: '10px' }} placeholder="Пошук відгуків" />
        <Dropdown 
          text="Сортування за:" 
          active={sortType} 
          onChange={i => setSortType(i)} options={[{ text: 'Рейтингом' }, { text: 'Датою' }, { text: 'Змістом' }]} 
        />
      </div>
      <div className="review-group">
        {
          reviews.map((r, i) => <Review key={i} {...r} /> )
        }
      </div>
      <Button className="full-width">Завантажити ще</Button>
    </div>
  );
};

export default ReviewBlock;
