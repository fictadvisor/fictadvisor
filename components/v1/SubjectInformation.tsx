import Rating from "./Rating";
import Divider from "./ui/Divider";
import {mergeClassName} from "../../lib/v1/component";

export type SubjectInformationProperties = {
  name: string;
  link?: string;
  description?: string;
  rating?: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const SubjectInformation = ({ name, link, description, rating, className, ...props }: SubjectInformationProperties) => {
  const hasRating = rating != null;

  return (
    <div className={mergeClassName('block', className)} {...props}>
      <div className={`f-bold w-full ${!hasRating ? 'a-c' : ''}`} style={{ fontSize: hasRating ? '14px' : '18px', display: 'inline-flex' }}>
        <div className="d-flex-grow" style={{ margin: 'auto' }}>
          {name}
        </div>
        {
          hasRating &&
          <Rating className="rating-small" rating={rating} />
        }
      </div>
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
