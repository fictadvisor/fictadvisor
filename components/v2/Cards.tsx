import { useRef, useState, useCallback } from "react";
import { Tooltip } from "./Tooltip";
import { Tag, TagState } from "./Tag";
import Button, { ButtonType, ButtonSize } from "./Button";
import Rating from "./Rating";

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

interface PollCardProps {
  name: string;
  description: string;
  roles: string[];
  url?: string;
}

interface RatingCardProps {
  name: string;
  rating?: number;
  roles?: string[];
  url?: string;
}

interface SimpleCardProps {
  name: string;
  details?: string;
  rating?:number;
}

const useToolTip = (
  element: HTMLParagraphElement,
  toolTipWidth: number
): any => {
  //to find out if the p element is truncated
  let isTruncated;

  let offsetX, offsetY, toolTipDirection;

  if (element) {
    const props = element.getBoundingClientRect();
    isTruncated = element.scrollHeight - 1 > props.height;
    offsetY = window.scrollY + props.top;

    console.log(props);
    if (props.right + toolTipWidth > window.innerWidth) {
      //tooltip is over the screen

      offsetX = { left: props.left - toolTipWidth };
      toolTipDirection = "right";
    } else {
      //tooltip is within the screen

      console.log("here");
      offsetX = { left: props.right };
      toolTipDirection = "left";
    }
  }
  return { offsetX, isTruncated, offsetY, toolTipDirection };
};

export const HeaderCard: React.FC<HeaderCardProps> = ({
  name,
  groupName,
  position,
  url = "/assets/icons/frog36.png",
}) => {
  return (
    <div className="header-card-container">
      <div className="header-card-info">
        <h4 className="card-name">{name}</h4>
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
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
    ref.current,
    300
  );

  return (
    <div className="card header-lecturer-card-container">
      <img src={url} alt="картинка вмкладача" />
      <div className="header-lecturer-card-info">
        <h4 className="card-name">{name}</h4>
        <p
          ref={ref}
          className="lecturer-description"
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        >
          {description}
          {showToolTip && isTruncated && (
            <Tooltip
              text={description}
              direction={toolTipDirection}
              style={{
                position: "absolute",
                ...offsetX,
                width: "300px",
                fontSize: "11px",
                top: offsetY,
              }}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export const PollCard: React.FC<PollCardProps> = ({
  name,
  description,
  roles,
  url = "/assets/icons/lecturer60.png",
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
    ref.current,
    300
  );

  return (
    <article className="card card-effect poll-card-container">
      <img className="card-avatar" src={url} alt="викладач" />
      <br />
      <CardRoles roles={roles} />
      <h4 className="card-name">{name}</h4>
      <p
        ref={ref}
        className="lecturer-description"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {description}
        {showToolTip && isTruncated && (
          <Tooltip
            text={description}
            direction={toolTipDirection}
            style={{
              position: "absolute",
              ...offsetX,
              width: "300px",
              fontSize: "11px",
              top: offsetY,
            }}
          />
        )}
      </p>

      <Button
        type={ButtonType.SECONDARY_RED}
        size={ButtonSize.SMALL}
        onClick={() => {}}
        text={"Пройти опитування"}
      ></Button>
    </article>
  );
};

export const RatingCard: React.FC<RatingCardProps> = ({
  rating,
  name,
  roles,
  url = "/assets/icons/lecturer60.png",
}) => {
  return (
    <article className="card card-effect rating-card-container">
      <img className="card-avatar" src={url} alt="викладач" />

      {rating && (
        <Rating rating={rating}/>
      )}
      {!rating && <br />}
      {roles && <CardRoles roles={roles} />}
      <h4 className="card-name">{name}</h4>
    </article>
  );
};

export const SimpleCard: React.FC<SimpleCardProps> = ({ name, details, rating }) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated, toolTipDirection } = useToolTip(
    ref.current,
    300
  );

  return (
    <article className="card card-effect simple-card-container">
      <p
        ref={ref}
        className="card-name simple-card-name"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {name}
        {showToolTip && isTruncated && (
          <Tooltip
            text={name}
            direction={toolTipDirection}
            style={{
              position: "absolute",
              ...offsetX,
              width: "300px",
              fontSize: "11px",
              top: offsetY,
            }}
          />
        )}
      </p>

      {details&&<p>{details}</p>}
      {rating&&<Rating rating={rating} style={{justifyContent:'flex-start'}}/>}
    </article>
  );
};

const CardRoles: React.FC<{ roles: string[] }> = ({ roles }) => {
  return (
    <div className="card-roles">
      {roles.map((role) => {
        switch (role) {
          case "лаборант":
            return (
              <Tag
                state={TagState.SMALL}
                text="Лаборант"
                className="mint-first"
                key={Math.random()}
              />
            );
          case "лектор":
            return (
              <Tag
                state={TagState.SMALL}
                text="Лектор"
                className="violet-first"
                key={Math.random()}
              />
            );
          case "практик":
            return (
              <Tag
                state={TagState.SMALL}
                text="Практик"
                className="orange-first"
                key={Math.random()}
              />
            );
        }
      })}
    </div>
  );
};
