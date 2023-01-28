import { Check, CheckState } from "../../../components/v2/Check";
import { GroupRadio, RadioState } from "../../../components/v2/GroupRadio";
import Switch, { SwitchType, SwitchTextPosition } from "../../../components/v2/Switch";
function Controls() {

    let radios = [
        {
            state: RadioState.DEFAULT,
            text: "apple",
            value: "apple",
            name: "radio-buttons",
        },
        {
            state: RadioState.DEFAULT,
            text: "orange",
            value: "orange",
            name: "radio-buttons",
        },
        {
            state: RadioState.DEFAULT,
            text: "lemon",
            value: "lemon",
            name: "radio-buttons",
        },
        {
            state: RadioState.DEFAULT,
            text: "strawberry",
            value: "strawberry",
            name: "radio-buttons",
        },
        {
            state: RadioState.DISABLED,
            text: "vegetable",
            name: "radio-buttons",
            value: "vegetable",
            isDisabled: true,
        },

    ];

    return (
        <div className="test-page-wrap">
            <Switch type={SwitchType.WEB} text="Hello" textPosition={SwitchTextPosition.LEFT}></Switch>
            <Switch type={SwitchType.MOBILE} text="Biden" textPosition={SwitchTextPosition.RIGHT}></Switch>

            <Check state={CheckState.DEFAULT} text="Default"></Check>
            <Check state={CheckState.ERROR} text="Error"></Check>
            <Check state={CheckState.DISABLED} text="Disabled" isDisabled={true}></Check>
            <Check state={CheckState.DISABLED} text="Disabled" isDisabled={true} isChecked={true}></Check>
        
            <GroupRadio options={radios}></GroupRadio>

        </div>
    );
}

export default Controls;
