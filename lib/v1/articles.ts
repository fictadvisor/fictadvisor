import * as fs from "fs/promises";
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

export type ArticleList = {
  chosen: ArticlePreview[];
  general: ArticlePreview[];
}

const path = (link: string): string => `${process.env.ARTICLES_PATH}/${link}.html`;

const get = async (link: string): Promise<Article> => {
  const text = (await fs.readFile(path(link))).toString();
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

const getAllLinks = async (): Promise<string[]> => {
  const dirs = await fs.readdir(process.env.ARTICLES_PATH)

  return dirs.filter(filename => filename.endsWith('.html'))
    .map(filename => filename.substring(0, filename.length - '.html'.length))
}

const getAll = async (links: string[] = []): Promise<ArticlePreview[]> => {
  if (links?.length == 0) links = await getAllLinks();

  const articles: ArticlePreview[] = [];

  for (const link of links) {
    const article = await get(link);
    articles.push({
      link: `/articles/${link}`,
      metadata: article.metadata,
    });
  }

  const hidden = await getHiddenLinks();
  return articles
      .filter(a => !hidden.includes(a.link))
      .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
};

const getChosen = async (): Promise<ArticlePreview[]> => {
  const links = await getChosenLinks();
  return links.length ? getAll(links) : [];
}

const getChosenLinks = async (): Promise<string[]> => {
  try {
    return (await fs.readFile(`${process.env.ARTICLES_PATH}/__CHOSEN__`))
      .toString()
      .split('\n')
      .map(path => path.trim())
      .filter(path => path.length > 0);
  } catch (e) {
    console.error(e);
    return [];
  }
}

const getHiddenLinks = async (): Promise<string[]> => {
  try {
    return (await fs.readFile(`${process.env.ARTICLES_PATH}/__HIDDEN__`))
      .toString()
      .split('\n')
      .map(path => `/articles/${path.trim()}`)
  } catch (e) {
    console.error(e);
    return [];
  }
}

const getArticlesList = async (): Promise<ArticleList> => {
  const all = await getAllLinks();
  const chosen = await getChosenLinks();
  const general = all.filter(link => !chosen.includes(link));

  return {
    chosen: chosen.length != 0 ? await getAll(chosen) : [],
    general: general.length != 0 ? await getAll(general) : [],
  };
};

export default {
  get,
  getAll,
  getAllLinks,
  getArticlesList,
  getChosen,
};
