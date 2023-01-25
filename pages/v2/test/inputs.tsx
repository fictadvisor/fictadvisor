import {Input, InputState} from "../../../components/v2/Input";

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
