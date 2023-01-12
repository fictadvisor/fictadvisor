import articles from "../../lib/v1/articles";
import Article from "../../components/Article";

export default function Post({ article }) {
  return <Article article={article} />;
}

export async function getStaticProps({ params }) {
  const article = await articles.get(params.link);

  return {
    props: {
      article,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const articleList = await articles.getAllLinks();

  return {
    paths: articleList.map((link) => {
      return {
        params: { link },
      };
    }),
    fallback: "blocking",
  };
}
