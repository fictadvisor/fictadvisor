import { useState } from 'react';

import Check, { CheckBoxState } from '@/components/common/ui/check/CheckBox';
import { Radio, RadioState } from '@/components/common/ui/radio-group/Radio';
import RadioGroup from '@/components/common/ui/radio-group/RadioGroup';
import Switch, {
  SwitchSize,
  SwitchTextPosition,
} from '@/components/common/ui/switch/Switch';

import styles from '../test-pages.module.scss';

const ControlsPage = () => {
  const [radioValue, setRadioValue] = useState('');

  const handleChange = value => {
    setRadioValue(value);
  };

  return (
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <Switch
          type={SwitchSize.MEDIUM}
          text="Hello"
          textPosition={SwitchTextPosition.LEFT}
        ></Switch>
        <Switch
          type={SwitchSize.SMALL}
          text="Biden"
          textPosition={SwitchTextPosition.RIGHT}
        ></Switch>

        <Check text="Default"></Check>
        <Check state={CheckBoxState.ERROR} text="Error"></Check>
        <Check text="Disabled" disabled={true}></Check>
        <Check text="Disabled" disabled={true} checked={true}></Check>

        <RadioGroup
          onChange={handleChange}
          name={'fruit'}
          value={radioValue}
          isDisabled={false}
        >
          <Radio text={'apple'} value={'apple'} />
          <Radio text={'orange'} value={'orange'} />
          <Radio text={'banana'} value={'banana'} isDisabled={true} />
          <Radio text={'Error'} value={'Error'} state={RadioState.ERROR} />
        </RadioGroup>
      </div>
    </div>
  );
};

export default ControlsPage;
