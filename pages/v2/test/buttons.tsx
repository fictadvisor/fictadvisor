import {LargeButton, MediumButton, SmallButton} from "../../../components/v2/Button";

function buttons(){
    return(
        <div className="test-page-wrap">
            <hr className="test-hr"/>
            <LargeButton text="← Default" onClick={() => {}} isDisabled={false}/>
            <hr className="test-hr"/>
            <MediumButton text="Icon Button" onClick={() => {}} isDisabled={false}/>
            <hr className="test-hr"/>
            <SmallButton text="Small" onClick={() => {}} isDisabled={false}/>
            <hr className="test-hr"/>
            <LargeButton text="Disabled" onClick={() => {}} isDisabled={true}/>
            <hr className="test-hr"/>
            <MediumButton text="Button" onClick={() => {}} isDisabled={true}/>
            <hr className="test-hr"/>
            <SmallButton text="Button" onClick={() => {}} isDisabled={true}/>
            <hr className="test-hr"/>
        </div>
    );
}

export default buttons;
