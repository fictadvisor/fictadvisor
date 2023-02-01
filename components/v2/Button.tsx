import React, {ReactNode} from "react";
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

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    isDisabled,
    icon,
    size,
    type,
    iconPosition,
    className,
}) => {
    
    const buttonColor = `${type}-button-color `
    const buttonStyle = `${type.split("-")[0]}-${size}${icon ? "-icon" : ""}-button`
    const additionalClass = className ? " " + className : ""
    className = buttonColor + buttonStyle + additionalClass

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




