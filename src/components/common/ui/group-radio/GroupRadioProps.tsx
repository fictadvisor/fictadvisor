import React, { useState } from 'react';

import styles from './GroupRadio.module.scss';

export enum RadioState {
  DEFAULT = 'default',
  DISABLED = 'disabled',
  ERROR = 'error',
}

interface GroupRadioProps {
  options: {
    state: RadioState;
    name: string;
    value: string;
    text?: string;
    disabled?: boolean;
  }[];
}

const GroupRadio: React.FC<GroupRadioProps> = props => {
  const [value, setValue] = useState('');
  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <div>
      {props.options.map((radio, index) => {
        return (
          <div key={index}>
            <div className={styles['radio-container']}>
              <label>
                <input
                  className={styles[radio.state + '-radio-input']}
                  type="radio"
                  name={radio.name}
                  value={value}
                  disabled={radio.disabled}
                  onChange={handleChange}
                />
                <span className={styles[radio.state + '-radio-box']}></span>
              </label>
              <span className={styles[radio.state + '-radio-text']}>
                {radio.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupRadio;
