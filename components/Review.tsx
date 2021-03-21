import { useState } from "react";
import { toDateTimeString } from "../lib/date";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import StarIcon from "./ui/icons/StarIcon";
import { SearchInput } from "./ui/SearchInput";

const getStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    let type = 'empty' as any;

    if (rating >= i) {
      type = 'full';
    } else if (rating >= i - 0.5) {
      type = 'half';
    }

    stars.push(<StarIcon key={i} type={type} />);
  }

  return stars;
};

function Review({ subject = null, date = null, rating, content }) {
  return (
    <div className="block review">
      <div className="top">
        <div>{getStars(rating)}</div>
        <div className="subject">
          <span className="font-medium">
            {
              subject 
               ? <>{subject}</>
               : <>{toDateTimeString(date)}</>
            }
          </span>
        </div>
      </div>
      <div className="main">
        <p>{content}</p>
      </div>
    </div>
  );
}

export function ReviewBlock() {
  const [sortType, setSortType] = useState(0);

  return (
    <div>
      <div className="flex" style={{ marginBottom: '10px' }}>
        <SearchInput style={{ flex: 1, marginRight: '10px' }} placeholder="Пошук відгуків" />
        <Dropdown active={sortType} onChange={i => setSortType(i)} options={[{ text: 'Рейтингу' }, { text: 'Даті' }, { text: 'Змісту' }]} />
      </div>
      <div className="review-group">
        <Review rating={3.5} date={new Date()} subject="Системне програмування" content="Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль приносять якесь і чималу насолоду. Якщо скористатися найпростішим прикладом, то хто з нас став би займатися якими б то не було тяжкими фізичними вправами, якщо б це не приносило з собою якоїсь користі? І хто міг би по справедливості дорікнути прагнення до насолоди, яке не несло б з собою ніяких неприємностей, або того, хто уникав би такого страждання, яке не приносило б з собою ніякої насолоди?"/>
        <Review rating={4} date={new Date()} subject="Системне програмування - 2" content="І хто міг би по справедливості дорікнути прагнення до насолоди, яке не несло б з собою ніяких неприємностей, або того, хто уникав би такого страждання, яке не приносило б з собою ніякої насолоди?"/>
      </div>
      <Button className="full-width">Завантажити ще</Button>
    </div>
  );
};