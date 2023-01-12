import { mergeClassName } from "../../lib/v1/component";

export type TagProperties = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Tag = ({ className, ...props }: TagProperties) => {
  return <span className={mergeClassName("tag", className)} {...props} />;
};

export default Tag;
