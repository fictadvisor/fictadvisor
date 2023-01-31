import { useRef, useState } from "react";
import { Tooltip } from "./Tooltip";
import {Tag,TagState} from './Tag';

interface HeaderCardProps {
  name: string;
  groupName: string;
  position: string;
  url?: string;
}

interface LecturerHeaderCardProps {
  name: string;
  description: string;
  url?: string;
}

interface PollCardProps{
  name: string;
  description: string;
  roles:string[]
  url?: string;
}

export const HeaderCard: React.FC<HeaderCardProps> = ({
  name,
  groupName,
  position,
  url = "/assets/icons/frog36.png",
}) => {
  return (
    <div className="header-card-container">
      <div className="header-card-info">
        <h4>{name}</h4>
        <div>
          <span className="header-card-postition">{position}</span>
          <span className="header-card-group-name">{groupName}</span>
        </div>
      </div>
      <img src={url} alt="Картинка профілю" />
    </div>
  );
};

export const LecturerHeaderCard: React.FC<LecturerHeaderCardProps> = ({
  name,
  description,
  url = "/assets/icons/lecturer60.png",
}) => {
  let isTruncated;
  let right;
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);

  if(ref.current){
    const props=ref.current.getBoundingClientRect();
    console.log(props);
    right=props.right;
    isTruncated=ref.current.scrollHeight-1>props.height;
  }
  
 
  return (
    <div
      className="header-lecturer-card-container"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <img src={url} alt="картинка вмкладача" />
      <div className="header-lecturer-card-info">
        <h4>{name}</h4>
        <p ref={ref}>{description}</p>
      </div>
      {showToolTip && isTruncated && (
        <Tooltip
          text={description}
          direction="left"
          style={{
            position: "absolute",
            left:right,
            width: "294px",
            fontSize: "11px",
          }}
        />
      )}
    </div>
  );
};

export const PollCard:React.FC<PollCardProps>=({
  name,
  description,
  roles,
  url
})=>{
 return(
 <div>
    <Tag 
    state={TagState.BIG}
    text='TagText'
    className='success-first'
    />
     <Tag 
    state={TagState.BIG}
    text='TagText'
    className='success-first'
    />
     <Tag 
    state={TagState.BIG}
    text='TagText'
    className='warning-first'
    />
  </div>)
}


