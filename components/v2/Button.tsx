import {ReactNode} from "react";

interface SizeButtonProps {
    text: string,
    onClick: Function,
    isDisabled: boolean,
    iconPath?: string
}

export function LargeButton(props: SizeButtonProps){
    return (
        <Button text={props.text} onClick={props.onClick} isDisabled={props.isDisabled} className="large-button">
            {props.iconPath &&
                <img src={props.iconPath} alt="button icon"/>
            }
        </Button>
    );
}

export function MediumButton(props: SizeButtonProps){
    return (
        <Button text={props.text} onClick={props.onClick} isDisabled={props.isDisabled} className="medium-button">
            {props.iconPath &&
                <img src={props.iconPath} alt="button icon"/>
            }
        </Button>
    );
}

export function SmallButton(props: SizeButtonProps){
    return (
        <Button text={props.text} onClick={props.onClick} isDisabled={props.isDisabled} className="small-button">
            {props.iconPath &&
                <img src={props.iconPath} alt="button icon"/>
            }
        </Button>
    );
}

interface ButtonProps {
    text: string,
    onClick: Function,
    isDisabled: boolean,
    className: string,
    children: ReactNode;
}


function Button(props: ButtonProps){
    return (
        <button disabled={props.isDisabled} className={'button '+props.className} onClick={() => props.onClick()}>
            {props.children}
            {props.text}
        </button>
    );
};




