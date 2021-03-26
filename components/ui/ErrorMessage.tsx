export type ErrorMessageProperties = {
  error: any;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ErrorMessage = ({ error, ...props }: ErrorMessageProperties) => {
  return <div {...props}>Ooopsie... something happened: {error.toString()}</div>
};

export default ErrorMessage;
