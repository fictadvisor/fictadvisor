import Button from "./ui/Button";
import {mergeClassName} from "../../lib/v1/component";

export type StudentResourceItemProperties = {
  href: string;
  name: string;
  image: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StudentResourceItem = ({ href, image, name, className, ...props }: StudentResourceItemProperties) => {
  return (
    <div className={mergeClassName('student-resource-item', className)} {...props}>
      <a href={href} target="_blank" className="simple">
        <Button>
          <img src={image}  alt="image"/>
          <span>{name}</span>
        </Button>
      </a>
    </div>
  );
};

export default StudentResourceItem;