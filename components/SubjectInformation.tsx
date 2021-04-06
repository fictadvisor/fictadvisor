import { mergeClassName } from "../lib/component";
import Rating from "./Rating";
import Divider from "./ui/Divider";

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
      <div className={`font-bold full-width ${!hasRating ? 'align-center' : ''}`} style={{ fontSize: hasRating ? '14px' : '18px', display: 'inline-flex' }}>
        <div className="flex-grow" style={{ margin: 'auto' }}>
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
