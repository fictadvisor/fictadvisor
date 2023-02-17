import Check, { CheckState } from '@/components/common/ui/check/Check';
import GroupRadio, {
  RadioState,
} from '@/components/common/ui/group-radio/GroupRadioProps';
import Switch, {
  SwitchTextPosition,
  SwitchType,
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
          type={SwitchType.WEB}
          text="Hello"
          textPosition={SwitchTextPosition.LEFT}
        ></Switch>
        <Switch
          type={SwitchType.MOBILE}
          text="Biden"
          textPosition={SwitchTextPosition.RIGHT}
        ></Switch>

        <Check state={CheckState.DEFAULT} text="Default"></Check>
        <Check state={CheckState.ERROR} text="Error"></Check>
        <Check
          state={CheckState.DISABLED}
          text="Disabled"
          disabled={true}
        ></Check>
        <Check
          state={CheckState.DISABLED}
          text="Disabled"
          disabled={true}
          checked={true}
        ></Check>

        <GroupRadio options={radios}></GroupRadio>
      </div>
    </div>
  );
};

export default ControlsPage;
