import React from "react";
import styles from "styles/v2/local/elements/Check.module.scss";

export enum CheckState {
    DEFAULT = 'default',
    DISABLED = 'disabled',
    ERROR = 'error',
}

export interface CheckProps {
    text?: string,
    state: CheckState,
    isChecked?: boolean,
    isDisabled?: boolean,
}

export function Check(props: CheckProps) {
    return (
        <div>
            <div className={styles["check-container"]}>
                <label className="check-button">
                    <input type="checkbox" className={styles[props.state + "-check-input"]} disabled={props.isDisabled} checked={props.isChecked} />
                    <span className={styles[props.state + "-check-box"]}></span>
                </label>
                <span className={styles[props.state + "-check-text"]}>{props.text}</span>
            </div>
        </div>
    )

}