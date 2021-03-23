type ErrorMessage = {
  error: any;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ErrorMessage = ({ error, ...props }) => {
  return <div {...props}>Ooopsie... something happened: {error.toString()}</div>
};

export default ErrorMessage;
