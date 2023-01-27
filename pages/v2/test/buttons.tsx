import Button, {ButtonSize} from "../../../components/v2/Button";

function buttons(){
    return(
        <div className="test-page-wrap">
            <div className="test-page-content">
                <Button text="Default" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE}/>
                <Button text="Default" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM}/>
                <Button text="Default" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL}/>
                <Button text="Default" iconPath="/assets/icons/heart.svg" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE}/>
                <Button text="Default" iconPath="/assets/icons/heart.svg" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM}/>
                <Button text="Default" iconPath="/assets/icons/heart.svg" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL}/>
                <Button text="Default" iconPath="/assets/icons/heart.svg" onClick={() => {}} isDisabled={true} size={ButtonSize.LARGE}/>
                <Button text="Default" iconPath="/assets/icons/heart.svg" onClick={() => {}} isDisabled={true} size={ButtonSize.MEDIUM}/>
                <Button text="Default" iconPath="/assets/icons/heart.svg" onClick={() => {}} isDisabled={true} size={ButtonSize.SMALL}/>
            </div>
        </div>
    );
}

export default buttons;
