import PageLayout from "../components/layout/PageLayout";
import api from "../lib/api";
import { GetServerSideProps } from "next";
import { TeacherItem } from "../components/TeacherItem";
import Button from "../components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import StudentResourceItem from "../components/StudentResourceItem";

const INITIAL_SR_PAGE = 0;
const INITIAL_SR_PAGE_SIZE = 7;
const SR_PAGE_SIZE = 6;

const IndexPage = ({ popularTeachers, studentResources: serverResources }) => {
  const [page, setPage] = useState(INITIAL_SR_PAGE);

  const { data, isLoading, isFetching } = useQuery(
    ['student-resources', page, SR_PAGE_SIZE], 
    () => api.fetchStudentResources({ page: 0, page_size: INITIAL_SR_PAGE_SIZE + SR_PAGE_SIZE * page }), 
    { keepPreviousData: true, enabled: page > INITIAL_SR_PAGE }
  );

  const studentResources = data || serverResources;
  const moreCount = studentResources.count - studentResources.items.length;

  return (
    <PageLayout
      meta={{ title: 'Головна' }}
      title="Головна сторінка"
    >
      <div className="information-block">
        <p>
          <span className="font-bold">Вітаємо тебе на ресурсі для студентів та абітурієнтів ФІОТ</span>, на якому можна знайти інформацію та відгуки про викладачів і предмети.
          Зміст сайту модерується та керується командою студентів із студради, яка незалежить від адміністрації.
        </p>
        <p>
          Зараз ми знаходимося у стадії нашого першого робочого релізу, працюємо над покращенням існуючого функціоналу та розробкою нового.
          У нас дуже великі амбіції, але досить обмежені ресурси на реалізацію їх, тому може доведеться трохи почекати.
          За нашими новинами можна слідкувати на каналі студради: <a href="https://t.me/fict_time" target="_blank">@fict_time</a>.
        </p>
        <p>
          Якщо ти хочеш надати відгук або доповнити якусь інформацію, звертайся до нас через бота зворотного зв'язку: <a href="https://t.me/fict_robot" target="_blank">@fict_robot</a>.
        </p>
      </div>
      <p className="title">Студентські ресурси</p>
      <div className="student-resource-list">
        {
          studentResources.items.map(r => 
            <StudentResourceItem
              key={r.url}
              href={r.url}
              name={r.name}
              image={r.image}
            />
          )
        }
        {
          moreCount > 0 &&
          <div className="student-resource-item more">
            <Button disabled={isLoading || isFetching} onClick={() => setPage(page + 1)}>
              <img />
              <span>+{moreCount}</span>
            </Button>
          </div>
        }
      </div>
      <p className="title">Популярні викладачі</p>
      <div className="teacher-list">
        {
          popularTeachers.items.map(t => 
            <TeacherItem 
              key={t.id}
              link={t.link} 
              firstName={t.first_name} 
              lastName={t.last_name} 
              middleName={t.middle_name}
              rating={t.rating} 
            />
          )
        }
      </div>
      <Link href="/teachers">
        <a>
          <Button className="full-width">Завантажити ще</Button>
        </a>
      </Link>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [popularTeachers, studentResources] = await Promise.all(
      [
        api.fetchTeachers({ page: 0, page_size: 5, sort: 'rating' }),
        api.fetchStudentResources({ page: INITIAL_SR_PAGE, page_size: INITIAL_SR_PAGE_SIZE }),
      ]
    );

    return {
      props: {
        popularTeachers,
        studentResources,
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    }
  }
};

export default IndexPage;