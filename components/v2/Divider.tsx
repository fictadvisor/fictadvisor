import React from "react";

export interface DividerProps {
    text: string,
    className?: string
}

export function Divider(props: DividerProps) {
    return (
        <div className={"divider" + (props.className ? " " + props.className : "")}>
            <hr/>
            <div>
                <p> {props.text} </p>
            </div>
        </div>
    );
}

export default Divider;
