import PageLayout from "./layout/PageLayout";
import { mergeClassName } from "../lib/component";

export type ArticleProperties = {
  title: string;
  content: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Article = ({ title, content, className, ...props } : ArticleProperties) => {
  return <PageLayout
    meta={{ title }}
    title={title}>

    <div
      className={mergeClassName('article', className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}/>

  </PageLayout>;
}

export default Article;
