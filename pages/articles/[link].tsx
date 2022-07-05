import articles from "../../lib/articles";
import Article from "../../components/Article";

export default function Post({ article }) {
  return <Article title={article.title} content={article.content}/>;
}

export async function getStaticProps({ params }) {
  const article = await articles.get(params.link);

  return {
    props: {
      article: {
        title: params.link,
        content: article,
      }
    },
  };
}

export async function getStaticPaths() {
  const articleList = await articles.getAll();

  return {
    paths: articleList.map((link) => {
      return {
        params: { link },
      }
    }),
    fallback: false,
  }
}
