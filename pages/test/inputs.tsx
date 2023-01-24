import {LargeButton, MediumButton, SmallButton} from "../../components/v2/Button";
import {Input, InputState} from "../../components/v2/Input";

interface OwnProps {}

type Props = OwnProps;

function inputs(){
  return(
    <div className="test-page-wrap">
        <hr className="test-hr"/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.DEFAULT}/>
        <hr className="test-hr"/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.DISABLED}/>
        <hr className="test-hr"/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.SUCCESS}/>
        <hr className="test-hr"/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.ERROR}/>
        <hr className="test-hr"/>
    </div>
  );
}

export default inputs;
