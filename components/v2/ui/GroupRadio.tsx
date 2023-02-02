import {useState } from "react"
import styles from "styles/v2/local/elements/GroupRadio.module.scss";

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
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            {props.options.map(radio => {
                return (
                    <div>
                        <div className={styles["radio-container"]}>
                            <label>
                                <input
                                    className={styles[radio.state + "-radio-input"]}
                                    type="radio"
                                    name={radio.name}
                                    value={value}
                                    disabled={radio.isDisabled}
                                    onChange={handleChange} />
                                <span className={styles[radio.state + "-radio-box"]}></span>
                            </label>
                            <span className={styles[radio.state + "-radio-text"]}>{radio.text}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}