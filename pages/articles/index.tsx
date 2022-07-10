import articles from "../../lib/articles";
import PageLayout from "../../components/layout/PageLayout";
import Link from "next/link";

const ArticlesPage = ({ articles }) => <PageLayout meta={{ title: 'Статті' }}>
  {
    articles.map(article => <div>
      <h1 key={article.link}>
        <Link href={article.link}>
          <a>{article.metadata.title}</a>
        </Link>
      </h1>
      { article.metadata.author && <h3>{article.metadata.author}</h3> }
    </div>)
  }
</PageLayout>

export default ArticlesPage;

export async function getServerSideProps() {
  return {
    props: {
      articles: await articles.getAll(),
    },
  };
}
