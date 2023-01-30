import { AcademicCapIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AlertButton, { AlertButtonIconPosition, AlertButtonType } from "../../../components/v2/AlertButton";
import Button, { ButtonIconPosition, ButtonSize, ButtonType } from "../../../components/v2/Button";
import { Check, CheckState } from "../../../components/v2/Check";
import { CrossIcon } from "../../../components/v2/svg-icons/CrossIcon";
import { WhiteCheckMarkIcon } from "../../../components/v2/svg-icons/WhiteCheckMarkIcon";
import Table from "../../../components/v2/Table";
import Tag, { TagState } from "../../../components/v2/Tag";
function tables() {
    const fields = [
        {
            email:"elizabeth.yarmolenko@gmail.com",
            fullName:"Ярмоленко Єлизавета Миколаївна" ,
            tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second"/>,
            checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста"/>,
        }
    ]
    return (
        <div className="test-page-wrap">
            <div className="test-page-content">
                <Table 
                email="elizabeth.yarmolenko@gmail.com" 
                fullName="Ярмоленко Єлизавета Миколаївна" 
                tag={<Tag state={TagState.SMALL} text="Зам. староста" className="primary-second"/>}
                //checkBox={<Check state={CheckState.DEFAULT} text="Зам. староста"/>}
                editButton={<AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>}
                editIcon={<AlertButton icon={<XMarkIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY}/>}
                />
                
            </div>
        </div>
    );
}

export default tables;
