import { useState } from "react";
import { useQuery } from "react-query";
import api from "../../lib/v1/api";
import { useAuthentication } from "../../lib/v1/context/AuthenticationContext";
import CourseItem from "../CourseItem";
import AddTeacherCourseForm from "../forms/AddTeacherCourseForm";
import Button from "../ui/Button";
import Disclaimer from "../ui/Disclaimer";
import Dropdown from "../ui/Dropdown";
import Loader from "../ui/Loader";
import SearchInput from "../ui/SearchInput";

const PROPERTIES = {
  pageSize: 6,
  sortBy: [
    { text: "Рейтингом", data: "rating" as const },
    { text: "Назвою", data: "name" as const },
  ],
};

export type CourseBlockProperties = {
  id: string;
  link: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const CourseList = ({ data, isLoading, isFetching, page, setPage }) => {
  if (data.count === 0) {
    return (
      <Disclaimer>
        На жаль, у нас немає інформації про курси цього викладача
      </Disclaimer>
    );
  }

  return (
    <>
      <div className="block-container">
        {data.items.map((c, i) => (
          <CourseItem
            key={i}
            title={c.name}
            reviewCount={c.review_count}
            rating={c.rating}
            recommended={c.recommended}
            link={c.link}
          />
        ))}
      </div>
      {data.count > (page + 1) * PROPERTIES.pageSize && (
        <Button
          loading={isLoading || isFetching}
          className="w-full"
          onClick={() => setPage(page + 1)}
        >
          Завантажити ще
        </Button>
      )}
    </>
  );
};

const CourseBlock = ({ id, link, ...props }: CourseBlockProperties) => {
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState(0);
  const { data, isLoading, isFetching, error } = useQuery(
    ["teacher-courses", link, page, searchText, sortType],
    () =>
      api.teachers.getCourses(link, {
        page: 0,
        page_size: PROPERTIES.pageSize * (page + 1),
        search: searchText,
        sort: PROPERTIES.sortBy[sortType].data,
      }),
    { keepPreviousData: true }
  );

  const authentication = useAuthentication();
  const [formMode, setFormMode] = useState(false);

  return (
    <div {...props}>
      {formMode ? (
        <AddTeacherCourseForm
          teacher={id}
          authentication={authentication}
          onBack={() => setFormMode(false)}
        />
      ) : (
        <Button
          className="w-full"
          onClick={() => {
            if (!authentication.user) {
              authentication.login();
              return;
            }

            setFormMode(true);
          }}
        >
          Додати предмет
        </Button>
      )}
      <div className="adaptive-input-container d-flex m-b m-t">
        <SearchInput
          className="d-flex-grow"
          placeholder="Пошук предметів"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Dropdown
          text="Сортування за:"
          active={sortType}
          onChange={(i) => setSortType(i)}
          options={PROPERTIES.sortBy}
        />
      </div>
      {isLoading || error ? (
        <Loader.Catchable error={error} />
      ) : (
        <CourseList
          data={data}
          isFetching={isFetching}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default CourseBlock;
