import React, {useState, useRef} from "react";

// props
export enum TextAreaState{
    SUCCESS = "success-area", ERROR = "error-area"
}

interface TextAreaProps {
    placeholder?: string // placeholder
    label?: string
    isDisabled?: boolean,
    sizing?: string
    areaCurrState?: TextAreaState
}

export const TextArea: React.FC<TextAreaProps> = (TextAreaProps) => {
    // refs and hooks
    const ref = useRef(null); // == event.target
    const [currTAText, setCurrTAText] = useState('');

    // styles
    const divClasses = [
        'textarea-test',
        TextAreaProps.sizing ?`${TextAreaProps.sizing}-area`:"",
        TextAreaProps.areaCurrState?TextAreaProps.areaCurrState:"",
    ]

    // for typing in and saving in hook
    const onChangeTAValue = event => {
        setCurrTAText(ref.current.value)
    };

    // render
    return (
        <form className={divClasses.join(" ")}>
            {TextAreaProps.label?<label>{TextAreaProps.label}</label>:<></>}
            <textarea
                ref={ref}
                className='textarea-test_input'
                disabled={TextAreaProps.isDisabled}
                placeholder={TextAreaProps.placeholder}
                onChange={onChangeTAValue}
                value={currTAText}
            />
            {TextAreaProps.areaCurrState ? <p>{TextAreaProps.areaCurrState}</p> : <></>}
        </form>
    )
}
