import React from "react";

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
            <div className="check-container">
                <label className="check-button">
                    <input type="checkbox" className={`${props.state}-check-input`} disabled={props.isDisabled} checked={props.isChecked} />
                    <span className={`${props.state}-check-box`}></span>
                </label>
                <span className={`${props.state}-check-text`}>{props.text}</span>
            </div>
        </div>
    )

}