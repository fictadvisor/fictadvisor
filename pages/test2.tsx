import {LargeButton, MediumButton, SmallButton} from "../components/v2/Button";
import {Input, InputState} from "../components/v2/Input";

interface OwnProps {}

type Props = OwnProps;

function test2(){
  return(
    <div id="container">

        <hr/>
        <h1> This is header 1</h1>
        <hr/>
        <h2> This is header 2</h2>
        <hr/>
        <h3> This is header 3</h3>
        <hr/>
        <h4> This is header 4</h4>
        <hr/>
        <h5> This is header 5</h5>
        <hr/>
        <h6> This is header 6</h6>
        <hr/>
        <p className="body-secondary">Body Secondary</p>
        <hr/>
        <p className="body-primary">Body Primary</p>
        <hr/>
        <p className="overline-text">Overline</p>
        <hr/>

        <LargeButton text="← Default" onClick={() => {}} isDisabled={false}/>
        <hr/>
        <MediumButton text="Icon Button" onClick={() => {}} isDisabled={false}/>
        <hr/>
        <SmallButton text="Small" onClick={() => {}} isDisabled={false}/>
        <hr/>
        <LargeButton text="Disabled" onClick={() => {}} isDisabled={true}/>
        <hr/>
        <MediumButton text="Button" onClick={() => {}} isDisabled={true}/>
        <hr/>
        <SmallButton text="Button" onClick={() => {}} isDisabled={true}/>
        <hr/>

        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.DEFAULT}/>
        <hr/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.DISABLED}/>
        <hr/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.SUCCESS}/>
        <hr/>
        <Input label="Прізвище" placeholder={"Шевченко"}
               isHiddable={true} state={InputState.ERROR}/>
        <hr/>
    </div>
  );
}

export default test2;
