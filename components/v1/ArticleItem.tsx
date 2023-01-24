import Button from "./ui/Button";
import Link from "next/link";
import {mergeClassName} from "../../lib/v1/component";

export type ArticleItemProperties = {
  href: string;
  name: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ArticleItem = ({ href, name, className, ...props }: ArticleItemProperties) => {
  return (
    <div className={mergeClassName('article-item', className)} {...props}>
      <Link href={href} legacyBehavior>
          <Button>
            <span>{name}</span>
          </Button>
      </Link>
    </div>
  );
};

export default ArticleItem;
