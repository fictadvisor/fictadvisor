import { useState } from "react";
import { useMutation } from "react-query";
import api from "../lib/api";
import { CreateReviewBody } from "../lib/api/courses";
import pluralize from "../lib/pluralize";
import { validate } from "../lib/validation";
import RatingSelect from "./RatingSelect";
import Button from "./ui/Button";
import Disclaimer from "./ui/Disclaimer";
import ErrorMessage from "./ui/ErrorMessage";
import TextArea from "./ui/TextArea";

export type ReviewEditorProperties = {
  link: string;
  token: string;
  onBack?: () => any;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ReviewEditor = ({ link, token, onBack, ...props }: ReviewEditorProperties) => {
  const [rating, setRating] = useState(2.5);
  const [review, setReview] = useState('');
  const { error, isLoading, mutate, isSuccess } = useMutation((data: CreateReviewBody) => api.courses.createReview(link, token, data));
  const [validationError, setValidationError] = useState(null);

  const onSubmit = () => {
    const error = validate('reviewContent', review);

    if (error) {
      setValidationError(error);
      return;
    } else {
      setValidationError(null);
    }

    mutate({ rating, content: review });
  };

  if (isSuccess) {
    return (
      <div {...props}>
        <Disclaimer>Дякуємо за відгук!</Disclaimer>
         {
            onBack &&
            <Button className="full-width space-t" onClick={() => onBack()}>Назад</Button>
          }
      </div>
    );
  }

  return (
    <div {...props}>
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
            <Button loading={isLoading} onClick={() => onBack()}>Назад</Button>
          }
          <Button loading={isLoading} className="flex-grow" style={{ marginLeft: '10px' }} onClick={() => onSubmit()}>Відправити</Button>
        </div>
        {
          validationError 
            ?
              <Disclaimer className="alert space-t">
                {validationError}
              </Disclaimer>
            :
              (error && !isLoading) &&
              <ErrorMessage className="space-t" error={error} />
        }
      </div>
    </div>
  );
};

export default ReviewEditor;
