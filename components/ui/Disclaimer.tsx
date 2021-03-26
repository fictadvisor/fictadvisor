import { mergeClassName } from "../../lib/component";

export type DisclaimerProperties = {} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Disclaimer = ({ className, ...props }: DisclaimerProperties) => {
  return (
    <div className={mergeClassName('disclaimer', className)} {...props}/>
  );
};

export default Disclaimer;
