import {Input, InputState} from "../../../components/v2/Input";

function inputs(){
  return(
    <div className="test-page-wrap">
        <div className="test-page-content">
            <Input label="Прізвище" placeholder={"Шевченко"}
                   isHiddable={true} state={InputState.DEFAULT}/>
            <Input label="Прізвище" placeholder={"Шевченко"}
                   isHiddable={true} state={InputState.DISABLED}/>
            <Input label="Прізвище" placeholder={"Шевченко"}
                   isHiddable={true} state={InputState.SUCCESS}/>
            <Input label="Прізвище" placeholder={"Шевченко"}
                   isHiddable={true} state={InputState.ERROR}/>
        </div>
    </div>
  );
}

export default inputs;
