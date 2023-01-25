import * as fs from "fs/promises";
import { parse } from "node-html-parser";

export type ArticleMetadata = {
  author: string;
  title: string;
};

export type Article = {
  metadata: ArticleMetadata;
  content: string;
};

export type ArticlePreview = {
  link: string;
  metadata: ArticleMetadata;
};

export type ArticleList = {
  chosen: ArticlePreview[];
  general: ArticlePreview[];
};

const path = (link: string): string =>
  `${process.env.ARTICLES_PATH}/${link}.html`;

export class ArticlesManager {
  static async get(link: string): Promise<Article> {
    const text = (await fs.readFile(path(link))).toString();
    const html = parse(text);

    const head = html.querySelector("head");
    const title = head.querySelector("title").text;
    const author = head.querySelector("comment").text;
    const content = html.querySelector("body").innerHTML;

    return {
      metadata: { title, author },
      content,
    };
  }

  static async getAllLinks(): Promise<string[]> {
    const dirs = await fs.readdir(process.env.ARTICLES_PATH);

    return dirs
      .filter((filename) => filename.endsWith(".html"))
      .map((filename) =>
        filename.substring(0, filename.length - ".html".length)
      );
  }

  static async getAll(links: string[] = []): Promise<ArticlePreview[]> {
    if (links?.length == 0) links = await ArticlesManager.getAllLinks();

    const articles: ArticlePreview[] = [];

    for (const link of links) {
      const article = await ArticlesManager.get(link);
      articles.push({
        link: `/articles/${link}`,
        metadata: article.metadata,
      });
    }

    const hidden = await ArticlesManager.getHiddenLinks();
    return articles
      .filter((a) => !hidden.includes(a.link))
      .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
  }

  static async getChosen(): Promise<ArticlePreview[]> {
    const links = await ArticlesManager.getChosenLinks();
    return links.length ? ArticlesManager.getAll(links) : [];
  }

  static async getChosenLinks(): Promise<string[]> {
    try {
      return (await fs.readFile(`${process.env.ARTICLES_PATH}/__CHOSEN__`))
        .toString()
        .split("\n")
        .map((path) => path.trim())
        .filter((path) => path.length > 0);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async getHiddenLinks(): Promise<string[]> {
    try {
      return (await fs.readFile(`${process.env.ARTICLES_PATH}/__HIDDEN__`))
        .toString()
        .split("\n")
        .map((path) => `/articles/${path.trim()}`);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async getArticlesList(): Promise<ArticleList> {
    const all = await ArticlesManager.getAllLinks();
    const chosen = await ArticlesManager.getChosenLinks();
    const general = all.filter((link) => !chosen.includes(link));

    return {
      chosen: chosen.length != 0 ? await ArticlesManager.getAll(chosen) : [],
      general: general.length != 0 ? await ArticlesManager.getAll(general) : [],
    };
  }
}
