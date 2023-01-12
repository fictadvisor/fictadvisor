import articles from "../../lib/v1/articles";
import PageLayout from "../../components/layout/PageLayout";
import Link from "next/link";

const ArticlesPage = ({ articles }) => (
  <PageLayout meta={{ title: "Статті" }}>
    <div className="article-group">
      {articles.chosen.length > 0 && (
        <>
          <h1>Обрані статті</h1>
        </>
      )}
      {articles.chosen.map((article) => (
        <div className="article-item-long" key={article.link}>
          <Link href={article.link}>
            <a className="simple">
              <div className={"block d-flex"}>
                <div className="m-auto d-flex-grow">
                  <span className="f-medium">{article.metadata.title}</span>
                  <p className="c-secondary">{article.metadata.author}</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}

      {articles.chosen.length > 0 && articles.general.length > 0 && (
        <>
          <h1>Інші статті</h1>
        </>
      )}
      {articles.general.map((article) => (
        <div className="article-item-long" key={article.link}>
          <Link href={article.link}>
            <a className="simple">
              <div className={"block d-flex"}>
                <div className="m-auto d-flex-grow">
                  <span className="f-medium">{article.metadata.title}</span>
                  <p className="c-secondary">{article.metadata.author}</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  </PageLayout>
);

export default ArticlesPage;

export async function getServerSideProps() {
  return {
    props: {
      articles: await articles.getArticlesList(),
    },
  };
}
