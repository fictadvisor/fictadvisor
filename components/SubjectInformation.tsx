import { mergeClassName } from "../lib/component";
import Divider from "./ui/Divider";

export type SubjectInformationProperties = {
  name: string;
  description?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const SubjectInformation = ({ name, description, className, ...props }: SubjectInformationProperties) => {
  return (
    <div className={mergeClassName('block', className)} {...props}>
      <div className="font-medium align-center" style={{ fontSize: '18px' }}>{name}</div>
      {
        description &&
        <>
          <Divider />
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </>
      }
    </div>
  );
};

export default SubjectInformation;
