type DisclaimerProperties = {} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Disclaimer({ className, ...props }: DisclaimerProperties) {
  return (
    <div className={`disclaimer ${className ?? ''}`} {...props}/>
  );
};