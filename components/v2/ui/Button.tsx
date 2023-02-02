import React, {ReactNode} from "react";
import styles from "styles/v2/local/elements/Button.module.scss";
import mergeClassNames from "merge-class-names";
export enum ButtonSize {
    LARGE = "large", MEDIUM = "medium", SMALL = "small"
}

export enum ButtonType {
    PRIMARY_RED = "primary-red",
    PRIMARY_GRAY = "primary-gray",
    SECONDARY_RED = 'secondary-red',
    SECONDARY_GRAY = 'secondary-grey',
    TERTIARY = "tertiary"
}

export enum ButtonIconPosition{
    LEFT, RIGHT
}

interface ButtonProps {
    text: string,
    onClick: Function,
    isDisabled?: boolean,
    icon?: ReactNode,
    size: ButtonSize,
    type: ButtonType,
    iconPosition?: ButtonIconPosition,
    className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {

    const buttonColor = `${props.type}-button-color`
    const buttonStyle = `${props.type.split("-")[0]}-${props.size}${props.icon ? "-icon" : ""}-button`
    const additionalClass = props.className ? props.className : ""
    const className = mergeClassNames(styles[buttonColor], styles[buttonStyle], styles[additionalClass]);

    return (
        <button disabled={isDisabled} className={className}
                onClick={() => {onClick}}>
            {icon && iconPosition == ButtonIconPosition.LEFT && <div className="icon"> {icon} </div>}
            {text}
            {icon && iconPosition == ButtonIconPosition.RIGHT && <div className="icon"> {icon} </div>}
        </button>
    );
}

export default Button;




