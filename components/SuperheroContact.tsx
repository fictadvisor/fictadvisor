import Tag from "./ui/Tag";

export type SuperheroContactProperties = {
  name: string;
  username: string;
  year: number;
  dorm: boolean;
  image: string;
};

const SuperheroContact = (props: SuperheroContactProperties) => {
  return (
    <a href={`https://t.me/${props.username}`} target="_blank">
      <div className="superhero block">
        <img src={props.image} />
        <div className="superhero-info">
          <span>{props.name}</span>
          <Tag>{props.username}</Tag>
          <span className="secondary">
            {
              `${props.dorm ? 'живе в гуртожитку, ' : ''}${props.year} курс`
            }
          </span>
        </div>
      </div>
    </a>
  );
};

export default SuperheroContact;