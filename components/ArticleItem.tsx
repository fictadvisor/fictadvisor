import { mergeClassName } from "../lib/component";
import Button from "./ui/Button";
import Link from "next/link";

export type ArticleItemProperties = {
  href: string;
  name: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ArticleItem = ({ href, name, className, ...props }: ArticleItemProperties) => {
  return (
    <div className={mergeClassName('article-item', className)} {...props}>
      <Link href={href}>
          <Button>
            <span>{name}</span>
          </Button>
      </Link>
    </div>
  );
};

export default ArticleItem;
