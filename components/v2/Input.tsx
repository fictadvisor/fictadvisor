import React, {useEffect, useRef, useState} from "react";
import {SearchIcon} from "./svg-icons/SearchIcon";
import {HiddenIcon} from "./svg-icons/HiddenIcon";
import {UnhiddenIcon} from "./svg-icons/UnhiddenIcon";
import {GreenSuccessIcon} from "./svg-icons/GreenSuccessIcon";
import {RedErrorIcon} from "./svg-icons/RedErrorIcon";

export enum InputState{
    DEFAULT = 'default', DISABLED = 'disabled', ERROR = 'error', SUCCESS = 'success'
}

export enum InputSize{
    LARGE = "large", MEDIUM = "medium"
}

export enum InputType{
    DEFAULT = "default", HIDDABLE = "hiddable", NO_LABEL = "unlabeled", SEARCH = "search"
}

interface InputProps{
    label?: string,
    placeholder: string,
    defaultRemark?: string,
    successRemark?: string,
    errorRemark?: string,
    state: InputState,
    size: InputSize,
    type: InputType,
    className?: string
}


const Input: React.FC<InputProps> = (props) => {

    const inputColor = `${props.type}-input-color `
    const inputStyle = `${props.size}-${props.type}$-input`
    const additionalClass = props.className ? " " + props.className : ""
    const className = inputColor + inputStyle + additionalClass

    let remark;
    switch(props.state) {
        case InputState.DEFAULT: {
            remark = props.defaultRemark;
            break;
        }
        case InputState.ERROR: {
            remark = props.errorRemark;
            break;
        }
        case InputState.SUCCESS: {
            remark = props.successRemark;
            break;
        }
        case InputState.DISABLED: {
            remark = null;
            break;
        }
    }

    const [isFocused, setIsFocused] = useState(false);
    const fieldRef = useRef(null);

    function handleFocus(value: boolean){
        setIsFocused(value)
        if (isFocused) fieldRef.current.style.color = "#FFFFFF"
        else           fieldRef.current.style.color = "inherit"
    }

    const [isHidden, setIsHidden] = useState(props.type === InputType.HIDDABLE);
    let inputType = isHidden ? "password" : "text";

    const [value, setValue] = useState("");
    function handleChange(event){
        setValue(event.target.value);
    }

    const leftIcon = props.type === InputType.SEARCH ? <SearchIcon/> : null;

    let rightIcon = null;
    if (props.type === InputType.HIDDABLE){
        if (isHidden) rightIcon = <HiddenIcon/>
        else          rightIcon = <UnhiddenIcon/>
    }
    else if (props.type === InputType.SEARCH){
            if (value !== null) rightIcon = <SearchIcon/>
    }
    else{
        if (props.state === InputState.SUCCESS) rightIcon = <GreenSuccessIcon/>
        if (props.state === InputState.ERROR) rightIcon = <RedErrorIcon/>
    }

    function handleIconClick(){
        if (props.type === InputType.HIDDABLE){
            setIsHidden(!isHidden);
        }
        if (props.type === InputType.SEARCH){
            setValue("");
        }
    }


    return (
        <div className={className}>
            <label ref={fieldRef}> {props.label} </label>
            {leftIcon && <div className="icon leftIcon">leftIcon</div>}
            {rightIcon && <div className="icon rightIcon" onClick={handleIconClick}>rightIcon</div>}
            <input placeholder={props.placeholder} type={inputType} onChange={handleChange} value = {value}
                   onFocus={() => handleFocus(true)}
                   onBlur={() => handleFocus(false)}/>
            {remark && <p>{remark}</p>}
        </div>
    );
}

export default Input;



