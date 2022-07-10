import * as fs from "fs";
import { parse } from 'node-html-parser';

export type ArticleMetadata = {
  author: string;
  title: string;
};

export type Article = {
  metadata: ArticleMetadata;
  content: string;
}

const path = (link: string) => `${process.env.ARTICLES_PATH}/${link}.html`;

const get = async (link: string): Promise<Article> => {
  const text = fs.readFileSync(path(link)).toString();
  const html = parse(text);

  const head = html.querySelector('head');
  const title = head.querySelector('title').text;
  const author = head.querySelector('comment').text;
  const content = html.querySelector('body').innerHTML;

  return {
    metadata: { title, author },
    content,
  };
}

const getAllLinks = () => fs.readdirSync(process.env.ARTICLES_PATH)
  .filter(filename => filename.endsWith('.html'))
  .map(filename => filename.substring(0, filename.length - '.html'.length))

const getAll = async () => {
  const links = getAllLinks();
  const articles = [];

  for (const link of links) {
    const article = await get(link);
    articles.push({
      link: `/articles/${link}`,
      metadata: article.metadata,
    });
  }

  return articles;
};

export default {
  get,
  getAll,
  getAllLinks,
};
