import React from "react";

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
      <div className={`${props.type}-container`}>
        {props.textPosition === "left" && <span className={`${props.type}-switch-text`}>{props.text}</span>}
        <label className={`${props.type}-switch`}>
          <input type="checkbox" className={`${props.type}-switch-input`} />
          <span className={`${props.type}-switch-slider`}></span>
        </label>
        {props.textPosition === "right" && <span className={`${props.type}-switch-text`}>{props.text}</span>}
      </div>
    </div>
  );
}

export default Switch;
