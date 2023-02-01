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
  rating: number;
  roles: string[];
  url?: string;
}

const useToolTip = (
  element: HTMLParagraphElement,
  toolTipWidth: number
): any => {
  //to find out if the p element is truncated
  let isTruncated;
  let offsetX;
  let offsetY;

  if (element) {
    const props = element.getBoundingClientRect();
    isTruncated = element.scrollHeight - 1 > props.height;
    offsetY = window.scrollY + props.top;

    if (props.right + toolTipWidth > window.innerWidth) {
      //tooltip is over the screen
      offsetX = window.innerWidth - toolTipWidth;
    } else {
      //tooltip is within the screen
      offsetX = props.right;
    }
  }
  return { offsetX, isTruncated, offsetY };
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
  const { offsetX, offsetY, isTruncated } = useToolTip(ref.current, 300);

  return (
    <div
      className="card header-lecturer-card-container"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <img src={url} alt="картинка вмкладача" />
      <div className="header-lecturer-card-info">
        <h4 className="card-name">{name}</h4>
        <p ref={ref} className="lecturer-description">
          {description}
        </p>
      </div>
      {showToolTip && isTruncated && (
        <Tooltip
          text={description}
          direction="left"
          style={{
            position: "absolute",
            left: offsetX,
            width: "300px",
            fontSize: "11px",
            top: offsetY,
          }}
        />
      )}
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
  const { offsetX, offsetY, isTruncated } = useToolTip(ref.current, 300);

  return (
    <article
      className="card poll-card-container"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <img className="card-avatar" src={url} alt="викладач" />
      <br />
      <CardRoles roles={roles} />
      <h4 className="card-name">{name}</h4>
      <p ref={ref} className="lecturer-description">
        {description}
      </p>

      <Button
        type={ButtonType.SECONDARY_RED}
        size={ButtonSize.SMALL}
        onClick={() => {}}
        text={"Пройти опитування"}
      ></Button>

      {showToolTip && isTruncated && (
        <Tooltip
          text={description}
          direction="left"
          style={{
            position: "absolute",
            left: offsetX,
            width: "300px",
            fontSize: "11px",
            top: offsetY,
          }}
        />
      )}
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
    <article className="card rating-card-container">
      <img className="card-avatar" src={url} alt="викладач" />
      <div className="rating-conatainer">
        <Rating rating={rating} />
        {/* <br /> */}
        <span>{rating}</span>
      </div>
      <CardRoles roles={roles} />
      <h4 className="card-name">{name}</h4>
    </article>
  );
};

export const SimpleCard: React.FC<{ name: string; details: string }> = ({
  name,
  details,
}) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { offsetX, offsetY, isTruncated } = useToolTip(ref.current, 300);

  return (
    <article
      className="card simple-card-container"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <p ref={ref} className="card-name simple-card-name">
        {name}
      </p>
      {showToolTip && isTruncated && (
        <Tooltip
          text={name}
          direction="left"
          style={{
            position: "absolute",
            left: offsetX,
            width: "300px",
            fontSize: "11px",
            top: offsetY,
            // transform: "translateY(100%)",
          }}
        />
      )}
      <p>{details}</p>
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
