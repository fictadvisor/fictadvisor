import { mergeClassName } from "../../lib/component";

export type ContactProperties = {
  name: string;
  value: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Contact = ({ name, value, className, ...props }: ContactProperties) => {
  return (
    <div 
      title="Натисни, щоб копіювати" 
      className={mergeClassName('contact', className)} 
      onClick={() => navigator.clipboard.writeText(value)} 
      {...props}
    >
      <div className="contact-name">{name}</div>
      <div>{value}</div>
    </div>
  );
};

export default Contact;