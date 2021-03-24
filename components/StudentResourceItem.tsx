import Button from "./ui/Button";

type StudentResourceItemProperties = {
  href: string;
  name: string;
  image: string;
};

const StudentResourceItem = ({ href, image, name }: StudentResourceItemProperties) => {
  return (
    <div className="student-resource-item">
      <a href={href} target="_blank" className="simple">
        <Button>
          <img src={image} />
          <span>{name}</span>
        </Button>
      </a>
    </div>
  );
};

export default StudentResourceItem;