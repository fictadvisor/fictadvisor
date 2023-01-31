import React from "react";

export enum TooltipDirection {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

interface TooltipProps {
  text: string;
  direction?: TooltipDirection;
}

export const Tooltip: React.FC<TooltipProps> = ({ direction, text }) => {
  if (direction) {
    return (
      <div className="tooltip-body">
        <span className="tooltip-text" id={`tooltip-text-${direction}`}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className="tooltip-body">
      <span>{text}</span>
    </div>
  );
};
