import { mergeClassName } from "../../lib/v1/component";

export type DisclaimerProperties = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Disclaimer = ({ className, ...props }: DisclaimerProperties) => {
  return <div className={mergeClassName("disclaimer", className)} {...props} />;
};

export default Disclaimer;
