import React, { ReactNode } from "react";

export enum TagState {
    BIG = 'big',
    SMALL = 'small',
}

export interface TagProps {
    className?: string,
    text?: string,
    icon?: ReactNode;
    state: TagState,
}

export function Tag(props: TagProps) {
    return (
        <div className={"tag"
            + (" " + props.state + "-tag")
            + (props.className ? " " + props.className + "-bgc" : "")}>
            {props.icon}
            <p className={props.state + "-tag-body"}>{props.text}</p>
        </div>
    )

}