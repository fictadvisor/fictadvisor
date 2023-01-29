import AlertButton, {AlertButtonIconPosition, AlertButtonType} from "../../../components/v2/AlertButton";
import {WhiteCheckMarkIcon} from "../../../components/v2/svg-icons/WhiteCheckMarkIcon";
import {CrossIcon} from "../../../components/v2/svg-icons/CrossIcon";

function alertButtons(){
  return(
    <div className = "test-page-wrap">
        <div className = "test-page-content">
            <AlertButton text="Success" icon={<WhiteCheckMarkIcon/>} iconPosition={AlertButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>
            <AlertButton text="Success" icon={<WhiteCheckMarkIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>
            <AlertButton text="Success" onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>
            <AlertButton text="Success" onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>

            <AlertButton text="Error primary" icon={<CrossIcon/>} iconPosition={AlertButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_PRIMARY}/>
            <AlertButton text="Error primary" icon={<CrossIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_PRIMARY}/>
            <AlertButton text="Error primary" onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_PRIMARY}/>
            <AlertButton text="Error primary" onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_PRIMARY}/>

            <AlertButton text="Error secondary" icon={<CrossIcon/>} iconPosition={AlertButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY}/>
            <AlertButton text="Error secondary" icon={<CrossIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY}/>
            <AlertButton text="Error secondary" onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY}/>
            <AlertButton text="Error secondary" onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY}/>
        </div>
    </div>
  );
}

export default alertButtons;