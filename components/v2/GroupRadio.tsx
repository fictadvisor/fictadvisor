import { ChangeEvent, useState } from "react"

export enum RadioState {
    DEFAULT = 'default',
    DISABLED = 'disabled',
    ERROR = 'error',
}

export interface GroupRadio {
    options: {
        state: RadioState,
        name: string,
        value: string,
        text?: string,
        isDisabled?: boolean,
    }[],
}

export function GroupRadio(props: GroupRadio) {
    const [value, setValue] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    };
    return (
        <div>
            {props.options.map(radio => {
                return (
                    <div>
                        <div className="radio-container">
                            <label>
                                <input
                                    className={radio.state + "-radio-input"}
                                    type="radio"
                                    name={radio.name}
                                    value={value}
                                    disabled={radio.isDisabled}
                                    onChange={handleChange} />
                                <span className={radio.state + "-radio-box"}></span>
                            </label>
                            <span className={radio.state + "-radio-text"}>{radio.text}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}