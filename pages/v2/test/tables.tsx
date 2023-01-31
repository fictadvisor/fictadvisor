import { XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import AlertButton, { AlertButtonIconPosition, AlertButtonType } from "../../../components/v2/AlertButton";
import { Check, CheckState } from "../../../components/v2/Check";
import { IconButtonSize, TrashBucketButton } from "../../../components/v2/IconButton";
import { WhiteCheckMarkIcon } from "../../../components/v2/svg-icons/WhiteCheckMarkIcon";
import Table from "../../../components/v2/Table";
import Tag, { TagState } from "../../../components/v2/Tag";
function tables() {
    const fields = [
        {
            avatar: "avatar.png",
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
            checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста" />,
            //action={<AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>}
            secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
        },
        {
            avatar: "stars-full.svg",
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            //tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
            //checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста" />,
            firstButton: <AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon />} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => { }} isDisabled={false} type={AlertButtonType.SUCCESS} />,
            secondButton: <AlertButton icon={<XMarkIcon />} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => { }} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY} />,
        },
        {
            avatar: "stars-empty.svg",
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
            checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста" />,
            //action={<AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon/>} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} type={AlertButtonType.SUCCESS}/>}
            secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
        },

        {
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
            checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста" />,
            firstButton: <AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon />} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => { }} isDisabled={false} type={AlertButtonType.SUCCESS} />,
            secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
        },
        {
            email: "elizabeth.yarmolenkobestdesigner2023@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
            checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста" />,
            firstButton: <AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon />} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => { }} isDisabled={false} type={AlertButtonType.SUCCESS} />,
            secondButton: <TrashBucketButton size={IconButtonSize.NORMAL} />,
        },
        {
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            //tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
            checkBox: <Check state={CheckState.DEFAULT} text="Зам. староста" />,
            firstButton: <AlertButton text="Прийняти" icon={<WhiteCheckMarkIcon />} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => { }} isDisabled={false} type={AlertButtonType.SUCCESS} />,
            secondButton: <AlertButton icon={<XMarkIcon />} iconPosition={AlertButtonIconPosition.RIGHT} onClick={() => { }} isDisabled={false} type={AlertButtonType.ERROR_SECONDARY} />,
        },
        {
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            //tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
        },
        {
            email: "elizabeth.yarmolenko@gmail.com",
            fullName: "Ярмоленко Єлизавета Миколаївна",
            tag: <Tag state={TagState.SMALL} text="Зам. староста" className="primary-second" />,
        },
    ]
    return (
        <div className="test-page-wrap">
            <div className="test-page-content">
                <Table fields={fields} />
            </div>
        </div>
    );
}

export default tables;
