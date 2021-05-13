import { useState } from "react";
import { useQuery } from "react-query";
import api from "../../lib/api";
import { mergeClassName } from "../../lib/component";

import Review from "../Review";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import Dropdown from "../ui/Dropdown";
import Loader from "../ui/Loader";
import SearchInput from "../ui/SearchInput";

export type ReviewBlockProperties = {
  link: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const PROPERTIES = {
  pageSize: 6,
  sortBy: [
    { text: 'Датою', data: 'date' as const },
    { text: 'Рейтингом', data: 'rating' as const }, 
  ]
};

const ReviewList = ({ data, isLoading, isFetching, page, setPage }) => {
  if (data.count === 0) {
    return (
      <Disclaimer>
        На жаль, у нас немає відгуків про цього викладача
      </Disclaimer>
    );
  }

  return (
    <>
      <div className="review-group">
        {
          data.items.map((r, i) => <Review key={i} course={r.course} rating={r.rating} content={r.content} /> )
        }
      </div>
      {
        data.count > (page + 1) * PROPERTIES.pageSize &&
        <Button 
          loading={isLoading || isFetching} 
          className="w-full"
          onClick={() => setPage(page + 1)}
        >
          Завантажити ще
        </Button>
      }
    </>
  )
};

const ReviewBlock = ({ link, className, ...props }: ReviewBlockProperties) => {
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState(0);
  const { data, isLoading, isFetching, error } = useQuery(
    ['teacher-reviews', link, page, searchText, sortType], 
    () => api.teachers.getReviews(link, { page: 0, page_size: PROPERTIES.pageSize * (page + 1), search: searchText, sort: PROPERTIES.sortBy[sortType].data }), 
    { keepPreviousData: true }
  );

  return (
    <div>
      <div className={mergeClassName('d-flex adaptive-input-container', className)} style={{ marginBottom: '10px' }} {...props}>
        <SearchInput className="d-flex-grow" placeholder="Пошук відгуків за предметом" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <Dropdown 
          text="Сортування за:" 
          active={sortType} 
          onChange={i => setSortType(i)} options={PROPERTIES.sortBy} 
        />
      </div>
      {
        isLoading || error
          ? <Loader.Catchable error={error} />
          : <ReviewList data={data} isFetching={isFetching} isLoading={isLoading} page={page} setPage={setPage} />
      }
    </div>
  );
};

export default ReviewBlock;
