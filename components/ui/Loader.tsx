// Source: https://loading.io/css/

type LoaderProperties = {
  secondary?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Loader(props: LoaderProperties) {
  return (
    <div className={`loader ${props.secondary ? 'secondary' : ''}`}>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};