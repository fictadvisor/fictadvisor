import { useState } from 'react';

import Checkbox, { CheckboxState } from '@/components/common/ui/checkbox';
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
          size={SwitchSize.MEDIUM}
          text="Just"
          textPosition={SwitchTextPosition.LEFT}
        ></Switch>
        <Switch
          size={SwitchSize.SMALL}
          text="Hoshion"
          textPosition={SwitchTextPosition.RIGHT}
        ></Switch>

        <Checkbox text="Default"></Checkbox>
        <Checkbox state={CheckboxState.ERROR} text="Error"></Checkbox>
        <Checkbox text="Disabled" disabled={true}></Checkbox>
        <Checkbox text="Disabled" disabled={true} checked={true}></Checkbox>

        <RadioGroup
          onChange={handleChange}
          name={'fruit'}
          value={radioValue}
          isDisabled={false}
        >
          <Radio text={'apple'} value={'apple'} />
          <Radio text={'orange'} value={'orange'} isDisabled={true} />
          <Radio text={'banana'} value={'banana'} />
          <Radio text={'Error'} value={'Error'} state={RadioState.ERROR} />
        </RadioGroup>
      </div>
    </div>
  );
};

export default ControlsPage;
