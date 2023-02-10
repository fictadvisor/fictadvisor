import React from "react";
import styles from "./Divider.module.scss";
export interface DividerProps {
    text: string,
    className?: string
}

export function Divider(props: DividerProps) {
    return (
        <div className={styles["divider"] + (props.className ? " " + styles[props.className] : "")}>
            <hr/>
            <div>
                <p> {props.text} </p>
            </div>
        </div>
    );
}

export default Divider;
