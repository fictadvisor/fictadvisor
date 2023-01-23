import {ReactNode} from "react";

interface SizeInputProps {
    text: string,
    onClick: Function,
    isDisabled: boolean,
    iconPath?: string
}

//  function LargeInput(props: SizeInputProps){
//     return (
//         <Input text={props.text} onClick={props.onClick} isDisabled={props.isDisabled} className="large-button">
//             {props.iconPath &&
//                 <img src={props.iconPath} alt="button icon"/>
//             }
//         </Input>
//     );
// }

//  function MediumInput(props: SizeInputProps){
//     return (
//         <Input text={props.text} onClick={props.onClick} isDisabled={props.isDisabled} className="small-button">
//             {props.iconPath &&
//                 <img src={props.iconPath} alt="button icon"/>
//             }
//         </Input>
//     );
// }

export enum InputState {
    DEFAULT = 'field', DISABLED = 'disabled-field', ERROR = 'error-field', SUCCESS = 'success-field'
}

interface InputProps{
    label?: string,
    placeholder: string,
    defaultRemark?: string,
    errorRemark?: string,
    successRemark?: string,
    isHiddable: boolean,
    state: InputState,
    // className: string,
    children?: ReactNode
}


export function Input(props: InputProps){
    let className: string;

    return (
        <div className={props.state}>
            <label> {props.label} </label>
            <input placeholder={props.placeholder}/>
        </div>
    );
};




