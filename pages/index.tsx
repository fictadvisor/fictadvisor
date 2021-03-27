import api from "../lib/api";

import { useState } from "react";
import { useQuery } from "react-query";
import { GetServerSideProps } from "next";

import PageLayout from "../components/layout/PageLayout";
import Link from "next/link";
import TeacherItem from "../components/TeacherItem";
import Button from "../components/ui/Button";
import StudentResourceItem from "../components/StudentResourceItem";
import SubjectItem from "../components/SubjectItem";

const PROPERTIES = {
  studentResources: {
    initialPage: 0,
    initialPageSize: 7,
    pageSize: 6,
  },
};

const IndexPage = ({ popularTeachers, popularSubjects, studentResources: serverResources }) => {
  const [page, setPage] = useState(PROPERTIES.studentResources.initialPage);

  const { data, isLoading, isFetching } = useQuery(
    ['student-resources', page], 
    () => api.fetchStudentResources({ page: 0, page_size: PROPERTIES.studentResources.initialPageSize + PROPERTIES.studentResources.pageSize * page }), 
    { keepPreviousData: true, enabled: page > PROPERTIES.studentResources.initialPage }
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
          Зміст сайту модерується та керується командою студентів із студради, яка не залежить від адміністрації.
        </p>
        <p>
          Зараз ми знаходимося у стадії нашого першого робочого релізу, працюємо над покращенням існуючого функціоналу та розробкою нового.
          У нас дуже великі амбіції, але досить обмежені ресурси на їх реалізацію, тому може доведеться трохи зачекати.
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
      <p className="title">Популярні предмети</p>
      <div className="teacher-list">
        {
          popularSubjects.items.map(s => 
            <SubjectItem 
              key={s.id}
              link={s.link} 
              name={s.name}
              teacherCount={s.teacher_count}
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
    const [popularTeachers, popularSubjects, studentResources] = await Promise.all(
      [
        api.fetchTeachers({ page: 0, page_size: 3, sort: 'rating' }),
        api.fetchSubjects({ page: 0, page_size: 3, sort: 'rating' }),
        api.fetchStudentResources({ page: PROPERTIES.studentResources.initialPage, page_size: PROPERTIES.studentResources.initialPageSize }),
      ]
    );

    return {
      props: {
        popularTeachers,
        popularSubjects,
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