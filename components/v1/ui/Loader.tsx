// Source: https://loading.io/css/

import { mergeClassName } from "../../../lib/v1/component";
import ErrorMessage from "./ErrorMessage";

type LoaderProperties = {
  secondary?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Loader = ({ secondary, className, ...props }: LoaderProperties) => {
  return (
    <div className={mergeClassName(`loader ${secondary ? 'c-secondary' : ''}`, className)} {...props}>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

Loader.Catchable = ({ error, ...props }: LoaderProperties & { error: any }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <Loader {...props} />
};

export default Loader;