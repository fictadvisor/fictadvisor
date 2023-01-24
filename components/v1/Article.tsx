import PageLayout from "./layout/PageLayout";
import {mergeClassName} from "../../lib/v1/component";
import {Article} from "../../lib/v1/articles";

export type ArticleProperties = {
  article: Article
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ArticleLayout = ({ article, className, ...props } : ArticleProperties) => {
  return <PageLayout meta={{ title: article.metadata.title }}>
    <h1 className={mergeClassName('articleTitle', className)}>{ article.metadata.title }</h1>
    { article.metadata.author && <p className={mergeClassName('articleAuthors', className)}>{ article.metadata.author }</p> }
    <div
      className={mergeClassName('article', className)}
      dangerouslySetInnerHTML={{ __html: article.content }}
      {...props}/>

  </PageLayout>;
}

export default ArticleLayout;
