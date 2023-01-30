import { WarningIcon } from "./custom-svg-icons/WarningIcon";
import { SuccessIcon } from "./custom-svg-icons/SuccessIcon";
import { InfoIcon } from "./custom-svg-icons/InfoIcon";
import { ExclamationIcon } from "./custom-svg-icons/ExclamationIcon";
import { CrossIcon } from "./custom-svg-icons/CrossIcon";
import React, { useState } from "react";


export interface AlertBlockProps {
  title: string;
  description?: string;
  size?: "small" | "middle" | "large";
  color?: "blue" | "red" | "orange" | "green";
  style?: "outlined" | "secondary" | "primary" | "border-left" | "border-top";
}

export const AlertBlock: React.FC<AlertBlockProps> = ({
  title,
  description,
  size = "large",
  color = "blue",
  style = "primary",
}) => {
  let className;
  switch (style) {
    case "outlined":
      className = `alert-${color}-outlined`;
      break;
    case "secondary":
      className = `alert-${color}-secondary`;
      break;
    case "primary":
      className = `alert-${color}`;
      break;
    default: 
      className = `alert-${color}-secondary ${style}`;
      break;
  }

  let icon=<InfoIcon/>;
  if(color==='red'){
    icon=<WarningIcon/>
  }else if(color==='orange'){
    icon=<ExclamationIcon/>
  }else if(color==='green')
  icon=<SuccessIcon/>;


  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <div className={`alert ${className} alert-${size}`}
    style={{display:isVisible?'grid':'none'}}
    >
      <div className="alert-icon">
        {icon}
      </div>

      <div className="alert-title">{title}</div>

      <div className="alert-icon-x" onClick={()=>setIsVisible(false)}>
        <CrossIcon />
      </div>

      {description && <div className="alert-description">{description}</div>}
    </div>
  );
};
