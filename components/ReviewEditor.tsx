import { useState } from "react";
import pluralize from "../lib/pluralize";
import RatingSelect from "./RatingSelect";
import Button from "./ui/Button";
import Disclaimer from "./ui/Disclaimer";
import TextArea from "./ui/TextArea";

export type ReviewEditorProperties = {
  link: string;
  onBack?: () => any;
};

const ReviewEditor = ({ link, onBack }: ReviewEditorProperties) => {
  const [rating, setRating] = useState(2.5);
  const [review, setReview] = useState('');

  return (
    <div>
      <Disclaimer>Будь ласка, утримайся від образ та ненормативної лексики</Disclaimer>
      <div className="block space-t">
        <RatingSelect value={rating} onChange={(value) => setRating(value)}/>
        <div style={{ position: 'relative' }}>
          <TextArea 
            className="space-b space-t"
            style={{ paddingBottom: review.length > 0 ? '24px' : '14px' }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={
              `Опиши свій досвід, розкажи про те, як цей курс викладається, відношення викладача до студентів, корисність інформації тощо. ` +
              `Усі відгуки публікуються анонімно.\n\n` +
              `Намагайся утриматись від образ та ненормативної лексики. Ми залишаємо за собою право відхилити публікацію подібних відгуків.\n\n` +
              `Мінімальна довжина відгуку - 100 символів, а максимальна - 4096 символів.`
            }
          />
          { 
            review.length > 0 &&
            <>
              <div className="secondary" style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                {review.length} {pluralize(review.length, 'символ', 'символа', 'символів')}, оцінка: {rating}
              </div>
            </>
          }
        </div>
        <div style={{ display: 'flex' }}>
          {
            onBack &&
            <Button onClick={() => onBack()}>Назад</Button>
          }
          <Button className="flex-grow" style={{ marginLeft: '10px' }}>Відправити</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewEditor;
