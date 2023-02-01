import {ReactNode} from "react";
import styles from "styles/v2/local/elements/Tab.module.scss";
import mergeClassNames from 'merge-class-names'

export enum TabContentPosition {
    CENTRE = 'centre',
    LEFT = 'left',
}

export interface TabProps {
    className: string,
    text: string,
    position: TabContentPosition,
    icon?: ReactNode,
    isDisabled?: boolean,
    count?: number,
}

export function Tab(props: TabProps) {
    const handleClick = () => {
    }
    return (
        <div>
            <button className={mergeClassNames(styles[props.className], styles[props.position])}
                    disabled={props.isDisabled} onClick={handleClick}>
                {props.icon && <div className="icon">{props.icon}</div>}
                <text className="text">{props.text}</text>
                {props.count && <div className={styles["count"]}>
                    <text className={styles["count-text"]}>{props.count}</text>
                </div>}
            </button>
        </div>
    )
}

export default Tab;