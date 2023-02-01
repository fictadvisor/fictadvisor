import React from "react";
import mergeClassNames from 'merge-class-names'
import styles from "styles/v2/local/elements/Tooltip.module.scss";

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
      <div className={styles["tooltip-body"]}>
        <span className={mergeClassNames(styles["tooltip-text"], styles[`tooltip-text-${direction}`])}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className={styles["tooltip-body"]}>
      <span>{text}</span>
    </div>
  );
};
