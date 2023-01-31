import React, {ReactNode} from "react";

export enum AlertButtonType{
    SUCCESS = "success", ERROR_PRIMARY = "error-primary", ERROR_SECONDARY = "error-secondary"
}

export enum AlertButtonIconPosition{
    LEFT, RIGHT
}


interface AlertButtonProps {
    text?: string,
    onClick: Function,
    isDisabled: boolean,
    type: AlertButtonType,
    icon?: ReactNode,
    iconPosition?: AlertButtonIconPosition,
    className?: string;
}

const AlertButton: React.FC<AlertButtonProps> = (props) => {

    const buttonColor = `${props.type}-alert-button-color `
    const buttonStyle = props.text ? `alert${props.icon ? "-icon" : ""}-button`: "unlabeled-alert-button";
    const additionalClass = props.className ? " " + props.className : ""
    const className = buttonColor + buttonStyle + additionalClass

    return (
        <button disabled={props.isDisabled} className={className}
                onClick={() => {props.onClick}}>
            {props.icon && props.iconPosition == AlertButtonIconPosition.LEFT && <div> {props.icon} </div>}
            {props.text}
            {props.icon && props.iconPosition == AlertButtonIconPosition.RIGHT && <div> {props.icon} </div>}
        </button>
    );
}

export default AlertButton;




