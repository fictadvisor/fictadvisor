import Check, { CheckBoxState } from '@/components/common/ui/check/CheckBox';
import RadioGroup, {
  RadioState,
} from '@/components/common/ui/radio-group/RadioGroup';
import Switch, {
  SwitchSize,
  SwitchTextPosition,
} from '@/components/common/ui/switch/Switch';

import styles from '../test-pages.module.scss';

const ControlsPage = () => {
  const radios = [
    {
      state: RadioState.DEFAULT,
      text: 'apple',
      value: 'apple',
      name: 'radio-buttons',
    },
    {
      state: RadioState.DEFAULT,
      text: 'orange',
      value: 'orange',
      name: 'radio-buttons',
    },
    {
      state: RadioState.DEFAULT,
      text: 'lemon',
      value: 'lemon',
      name: 'radio-buttons',
    },
    {
      state: RadioState.DEFAULT,
      text: 'strawberry',
      value: 'strawberry',
      name: 'radio-buttons',
    },
    {
      state: RadioState.DISABLED,
      text: 'vegetable',
      name: 'radio-buttons',
      value: 'vegetable',
      disabled: true,
    },
  ];

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

        <Check state={CheckBoxState.DEFAULT} text="Default"></Check>
        <Check state={CheckBoxState.ERROR} text="Error"></Check>
        <Check text="Disabled" disabled={true}></Check>
        <Check text="Disabled" disabled={true} checked={true}></Check>

        <RadioGroup options={radios}></RadioGroup>
      </div>
    </div>
  );
};

export default ControlsPage;
