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

export type ArticlePreview = {
  link: string;
  metadata: ArticleMetadata;
}

const path = (link: string): string => `${process.env.ARTICLES_PATH}/${link}.html`;

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

const getAllLinks = (): string[] => fs.readdirSync(process.env.ARTICLES_PATH)
  .filter(filename => filename.endsWith('.html'))
  .map(filename => filename.substring(0, filename.length - '.html'.length))

const getAll = async (links: string[] = []): Promise<ArticlePreview[]> => {
  if (links?.length == 0) links = getAllLinks();

  const articles: ArticlePreview[] = [];

  for (const link of links) {
    const article = await get(link);
    articles.push({
      link: `/articles/${link}`,
      metadata: article.metadata,
    });
  }

  const hidden = getHiddenLinks();
  console.log({ hidden, articles });
  return articles.filter(a => !hidden.includes(a.link));
};

const getChosen = async (): Promise<ArticlePreview[]> => getAll(getChosenLinks())

const getChosenLinks = (): string[] => {
  try {
    return fs.readFileSync(`${process.env.ARTICLES_PATH}/__CHOSEN__`)
      .toString()
      .split('\n')
      .map(path => path.trim())
      .filter(path => path.length > 0)
  } catch (e) {
    console.error(e);
    return [];
  }
}

const getHiddenLinks = (): string[] => {
  try {
    return fs.readFileSync(`${process.env.ARTICLES_PATH}/__HIDDEN__`)
      .toString()
      .split('\n')
      .map(path => `/articles/${path.trim()}`)
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default {
  get,
  getAll,
  getAllLinks,
  getChosen,
};
