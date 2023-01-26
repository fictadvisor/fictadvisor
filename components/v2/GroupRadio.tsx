export enum RadioState {
    DEFAULT = 'default',
    DISABLED = 'disabled',
    ERROR = 'error',
}

export interface GroupRadio {
    options: {
        state: RadioState,
        isChecked?: boolean,
        isDisabled?: boolean,
        text?: string,
    }[],
}

export function GroupRadio(props: GroupRadio) {
    return (
        <div>
            {props.options.map(radio => {
                return (
                    <div>
                        <div className="radio-container">
                            <label>
                                <input type="radio" className={`${radio.state}-radio-input`} checked={radio.isChecked} disabled={radio.isDisabled} />
                                <span className={`${radio.state}-radio-box`}></span>
                            </label>
                            <span className={`${radio.state}-radio-text`}>{radio.text}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}