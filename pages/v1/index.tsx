import api from "../../lib/v1/api";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetServerSideProps } from "next";

import PageLayout from "../../components/v1/layout/PageLayout";
import Link from "next/link";
import TeacherItem from "../../components/v1/TeacherItem";
import Button from "../../components/v1/ui/Button";
import StudentResourceItem from "../../components/v1/StudentResourceItem";
import SubjectItem from "../../components/v1/SubjectItem";
import config from "../../config";
import articles from "../../lib/v1/articles";
import ArticleItem from "../../components/v1/ArticleItem";

const PROPERTIES = {
  studentResources: {
    initialPage: 0,
    initialPageSize: 7,
    pageSize: 6,
  },
  articles: {
    initialPage: 0,
    pageSize: 6,
  },
};

const IndexPage = ({ popularTeachers, popularSubjects, studentResources: serverResources, chosenArticles }) => {
  const [studentResourcesPage, setStudentResourcesPage] = useState(PROPERTIES.studentResources.initialPage);
  const [articlesPage, setArticlesPage] = useState(PROPERTIES.articles.initialPage);
  const [articles, setArticles] = useState([]);

  const { data, isLoading, isFetching } = useQuery(
    ['student-resources', studentResourcesPage],
    () => api.studentResources.getAll({ page: 0, page_size: PROPERTIES.studentResources.initialPageSize + PROPERTIES.studentResources.pageSize * studentResourcesPage }),
    { keepPreviousData: true, enabled: studentResourcesPage > PROPERTIES.studentResources.initialPage }
  );


  const studentResources = data || serverResources;
  const studentResourcesMoreCount = studentResources.count - studentResources.items.length;

  const loadMoreArticles = () => {
    const articlesStart = articlesPage * PROPERTIES.articles.pageSize;
    const articlesEnd = articlesStart + PROPERTIES.articles.pageSize;
    setArticles(articles.concat(...chosenArticles.slice(articlesStart, articlesEnd)));
  };

  useEffect(() => {
    loadMoreArticles();
  }, [articlesPage]);

  const articlesMoreCount = chosenArticles.length - articles.length;

  return (
    <PageLayout
      meta={{ title: config.service, description: `Ресурс для студентів та абітурієнтів ${config.faculty}, на якому можна знайти інформацію та відгуки про викладачів і предмети.` }}
      title="Головна сторінка"
    >
      <div className="information-block">
        <p>
          <span className="f-bold">Вітаємо тебе на ресурсі для студентів та абітурієнтів {config.faculty}</span>, на якому можна знайти інформацію та відгуки про викладачів і предмети.
          Зміст сайту модерується та керується командою студентів зі студради, яка не залежить від адміністрації.
        </p>
        <p>
          Зараз ми знаходимося у стадії нашого першого робочого релізу, працюємо над покращенням існуючого функціоналу та розробкою нового.
          У нас дуже великі амбіції, але досить обмежені ресурси на їх реалізацію, тому може доведеться трохи зачекати.
          За нашими новинами можна слідкувати на каналі студради: <a href={`https://t.me/${config.contacts.scChannel}`} target="_blank">@{config.contacts.scChannel}</a>.
        </p>
        <p>
          Якщо ти хочеш надати відгук або доповнити якусь інформацію, звертайся до нас через бота зворотного зв'язку: <a href={`https://t.me/${config.contacts.feedbackBot}`} target="_blank">@{config.contacts.feedbackBot}</a>.
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
          studentResourcesMoreCount > 0 &&
          <div className="student-resource-item more">
            <Button disabled={isLoading || isFetching} onClick={() => setStudentResourcesPage(studentResourcesPage + 1)}>
              <img alt="blank"/>
              <span>+{studentResourcesMoreCount}</span>
            </Button>
          </div>
        }
      </div>
      <p className="title">Обрані статті</p>
      <div className="article-group">
        {
          articles.map(article =>
            <ArticleItem
              key={article.link}
              href={article.link}
              name={article.metadata.title}
            />
          )
        }
        {
          articlesMoreCount > 0 &&
          <div className="article-item more">
            <Button onClick={() => {
              console.log(articlesPage);
              setArticlesPage(articlesPage + 1)
            }}>
              <span>+{articlesMoreCount}</span>
            </Button>
          </div>
        }
        <div className="article-item more">
          <Link href='/v1/articles' legacyBehavior>
            <Button>
              <span>Усі статті</span>
            </Button>
          </Link>
        </div>
      </div>
      <p className="title" style={{ marginTop: '15px' }}>Популярні викладачі</p>
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
      <Link href="/v1/teachers" legacyBehavior>

        <Button className="w-full">Завантажити ще</Button>

      </Link>
      <p className="title" style={{ marginTop: '25px' }}>Популярні предмети</p>
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
      <Link href="/v1/subjects" legacyBehavior>

        <Button className="w-full">Завантажити ще</Button>

      </Link>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [
      popularTeachers,
      popularSubjects,
      studentResources,
      chosenArticles,
    ] = await Promise.all(
      [
        api.teachers.getAll({ page: 0, page_size: 3, sort: 'rating' }),
        api.subjects.getAll({ page: 0, page_size: 3, sort: 'rating' }),
        api.studentResources.getAll({ page: PROPERTIES.studentResources.initialPage, page_size: PROPERTIES.studentResources.initialPageSize }),
        articles.getChosen(),
      ]
    );

    return {
      props: {
        popularTeachers,
        popularSubjects,
        studentResources,
        chosenArticles,
      },
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        error: true,
      },
    }
  }
};

export default IndexPage;