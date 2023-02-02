import Input, {InputSize, InputState, InputType} from "../../../components/v2/Input";

function inputs(){
  return(
    <div className="test-page-wrap">
        <div className="test-page-content">
            <Input placeholder={"placeholder"} label="label" defaultRemark="defaultRemark" state={InputState.DEFAULT} size={InputSize.LARGE} type={InputType.DEFAULT}/>
            <Input placeholder={"placeholder"} label="label" errorRemark="errorRemark" state={InputState.ERROR} size={InputSize.LARGE} type={InputType.DEFAULT}/>
            <Input placeholder={"placeholder"} label="label" successRemark="successRemark"  state={InputState.SUCCESS} size={InputSize.LARGE} type={InputType.DEFAULT}/>
            <Input placeholder={"placeholder"} label="label" state={InputState.DISABLED} size={InputSize.LARGE} type={InputType.DEFAULT}/>

            <Input placeholder={"placeholder"} label="label" defaultRemark="defaultRemark" state={InputState.DEFAULT} size={InputSize.MEDIUM} type={InputType.DEFAULT}/>
            <Input placeholder={"placeholder"} label="label" errorRemark="errorRemark" state={InputState.ERROR} size={InputSize.MEDIUM} type={InputType.DEFAULT}/>
            <Input placeholder={"placeholder"} label="label" successRemark="successRemark"  state={InputState.SUCCESS} size={InputSize.MEDIUM} type={InputType.DEFAULT}/>
            <Input placeholder={"placeholder"} label="label" state={InputState.DISABLED} size={InputSize.MEDIUM} type={InputType.DEFAULT}/>

            <Input placeholder={"placeholder"} label="label" defaultRemark="defaultRemark" state={InputState.DEFAULT} size={InputSize.LARGE} type={InputType.HIDDABLE}/>
            <Input placeholder={"placeholder"} label="label" errorRemark="errorRemark" state={InputState.ERROR} size={InputSize.LARGE} type={InputType.HIDDABLE}/>
            <Input placeholder={"placeholder"} label="label" successRemark="successRemark"  state={InputState.SUCCESS} size={InputSize.LARGE} type={InputType.HIDDABLE}/>
            <Input placeholder={"placeholder"} label="label" state={InputState.DISABLED} size={InputSize.LARGE} type={InputType.HIDDABLE}/>


            <Input placeholder={"placeholder"} label="label" defaultRemark="defaultRemark" state={InputState.DEFAULT} size={InputSize.MEDIUM} type={InputType.HIDDABLE}/>
            <Input placeholder={"placeholder"} label="label" errorRemark="errorRemark" state={InputState.ERROR} size={InputSize.MEDIUM} type={InputType.HIDDABLE}/>
            <Input placeholder={"placeholder"} label="label" successRemark="successRemark"  state={InputState.SUCCESS} size={InputSize.MEDIUM} type={InputType.HIDDABLE}/>
            <Input placeholder={"placeholder"} label="label" state={InputState.DISABLED} size={InputSize.MEDIUM} type={InputType.HIDDABLE}/>

            <Input placeholder={"placeholder"} state={InputState.DEFAULT} size={InputSize.LARGE} type={InputType.NO_LABEL}/>
            <Input placeholder={"placeholder"} state={InputState.ERROR} size={InputSize.LARGE} type={InputType.NO_LABEL}/>
            <Input placeholder={"placeholder"} state={InputState.SUCCESS} size={InputSize.LARGE} type={InputType.NO_LABEL}/>
            <Input placeholder={"placeholder"} state={InputState.DISABLED} size={InputSize.LARGE} type={InputType.NO_LABEL}/>

            <Input placeholder={"placeholder"} state={InputState.DEFAULT} size={InputSize.MEDIUM} type={InputType.NO_LABEL}/>
            <Input placeholder={"placeholder"} state={InputState.ERROR} size={InputSize.MEDIUM} type={InputType.NO_LABEL}/>
            <Input placeholder={"placeholder"} state={InputState.SUCCESS} size={InputSize.MEDIUM} type={InputType.NO_LABEL}/>
            <Input placeholder={"placeholder"} state={InputState.DISABLED} size={InputSize.MEDIUM} type={InputType.NO_LABEL}/>

            <Input placeholder={"placeholder"} defaultRemark="defaultRemark" state={InputState.DEFAULT} size={InputSize.LARGE} type={InputType.SEARCH}/>
            <Input placeholder={"placeholder"} errorRemark="errorRemark" state={InputState.ERROR} size={InputSize.LARGE} type={InputType.SEARCH}/>
            <Input placeholder={"placeholder"} successRemark="successRemark"  state={InputState.SUCCESS} size={InputSize.LARGE} type={InputType.SEARCH}/>
            <Input placeholder={"placeholder"} state={InputState.DISABLED} size={InputSize.LARGE} type={InputType.SEARCH}/>

            <Input placeholder={"placeholder"} defaultRemark="defaultRemark" state={InputState.DEFAULT} size={InputSize.MEDIUM} type={InputType.SEARCH}/>
            <Input placeholder={"placeholder"} errorRemark="errorRemark" state={InputState.ERROR} size={InputSize.MEDIUM} type={InputType.SEARCH}/>
            <Input placeholder={"placeholder"} successRemark="successRemark"  state={InputState.SUCCESS} size={InputSize.MEDIUM} type={InputType.SEARCH}/>
            <Input placeholder={"placeholder"} state={InputState.DISABLED} size={InputSize.MEDIUM} type={InputType.SEARCH}/>

        </div>
    </div>
  );
}
export default inputs;
