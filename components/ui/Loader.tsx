// Source: https://loading.io/css/

import ErrorMessage from "./ErrorMessage";

type LoaderProperties = {
  secondary?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Loader = (props: LoaderProperties) => {
  return (
    <div className={`loader ${props.secondary ? 'secondary' : ''}`}>
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