import { Check, CheckState } from "../components/v2/Check";
import { GroupRadio, RadioState } from "../components/v2/GroupRadio";
import Switch, { SwitchType, SwitchTextPosition } from "../components/v2/Switch";

interface OwnProps { }

type Props = OwnProps;

function test() {

    let radios = [
        {
            state: RadioState.DEFAULT,
            text: "Default text ",
        },
        {
            state: RadioState.DISABLED,
            text: "Disabled",
            isDisabled: true,
        },
        {
            state: RadioState.DISABLED,
            text: "Disabled",
            isChecked: true,
            isDisabled: true,

        },
        {
            state: RadioState.ERROR,
            text: "Error",
        },
    ];

    return (
        <div id="container">
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

export default test;
