export enum TabContentPosition {
    CENTRE = 'centre',
    LEFT = 'left',
}

export interface TabProps {
    className: string,
    text: string,
    position: TabContentPosition,
    icon?: string,
    isDisabled?: boolean,
    count?: number,
}

export function Tab(props: TabProps) {
    return (
        <div>
            <button className={props.className + " " + props.position} disabled={props.isDisabled}>
                {props.icon ? <img className="icon" src={`/assets/icons/${props.icon}`}></img> : ""}
                <text className="text">{props.text}</text>
                {props.count ? <div className="count"><text className="count-text">{props.count}</text></div> : ""}
            </button>
        </div>
    )
}

export default Tab;