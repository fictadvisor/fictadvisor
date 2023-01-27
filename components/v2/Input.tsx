import {ReactNode, useEffect, useRef, useState} from "react";

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
    children?: ReactNode
}


export function Input(props: InputProps){
    const [isFocused, setIsFocused] = useState(false);
    const fieldRef = useRef(null);

    useEffect(() =>{
        console.log(isFocused);
        if (isFocused) fieldRef.current.style.color = "#FFFFFF"
        else           fieldRef.current.style.color = "inherit"
    });

    return (
        <div className={props.state}>
            <label ref={fieldRef}> {props.label} </label>
            <input placeholder={props.placeholder}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}/>
        </div>
    );
}




