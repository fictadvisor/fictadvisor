import * as fs from "fs";

const path = (link: string) => `${process.env.ARTICLES_PATH}/${link}.html`;

const get = async (link: string) => fs.readFileSync(path(link)).toString();

const getAll = async () => {
  return (fs.readdirSync(process.env.ARTICLES_PATH))
    .filter(filename => filename.endsWith('.html'))
    .map(filename => filename.substring(0, filename.length - '.html'.length));
};

export default {
  get,
  getAll,
};
