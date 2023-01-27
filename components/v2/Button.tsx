import {ReactNode} from "react";

interface ButtonProps {
    text: string,
    onClick: Function,
    isDisabled: boolean,
    iconPath?: string,
    size: ButtonSize,
}

export enum ButtonSize {
    LARGE = "large-button", MEDIUM = "medium-button", SMALL = "small-button"
}

function Button(props: ButtonProps) {
    return (
        <button disabled={props.isDisabled} className={props.size} onClick={() => {props.onClick}}>
            {props.iconPath &&
                <img src={props.iconPath} alt="button icon"/>
            }
            {props.text}
        </button>
    );
}

export default Button;




