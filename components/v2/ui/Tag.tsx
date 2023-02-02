import React, { ReactNode } from "react";
import styles from "styles/v2/local/elements/Tag.module.scss";
import mergeClassNames from 'merge-class-names'

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

    const tagClassName = mergeClassNames(styles["tag"], styles[props.state + "-tag"],
        styles[props.className ? props.className + "-bgc" : ""]);
    return (
        <div className={tagClassName}>
            {props.icon}
            <p className={styles[props.state + "-tag-body"]}>{props.text}</p>
        </div>
    )

}

export default Tag;