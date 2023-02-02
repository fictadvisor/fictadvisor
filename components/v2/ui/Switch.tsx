import React from "react";
import styles from "styles/v2/local/elements/Switch.module.scss";
import mergeClassNames from 'merge-class-names'
export enum SwitchTextPosition {
  RIGHT = "right",
  LEFT = "left",
}

export enum SwitchType {
  WEB = "web",
  MOBILE = "mobile",
}

export interface SwitchProps {
  text?: string,
  textPosition?: string,
  type: SwitchType
}

export function Switch(props: SwitchProps) {
  return (
    <div>
      <div className={styles[props.type + "-container"]}>
        {props.textPosition === "left" && <span className={styles[props.type + "-switch-text"]}>{props.text}</span>}
        <label className={styles[`${props.type}-switch`]}>
          <input type="checkbox" className={styles[props.type + "-switch-input"]} />
          <span className={styles[props.type + "-switch-slider"]}></span>
        </label>
        {props.textPosition === "right" && <span className={styles[props.type + "-switch-text"]}>{props.text}</span>}
      </div>
    </div>
  );
}

export default Switch;
