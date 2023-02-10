import {CustomCheck} from "@/components/common/custom-svg/CustomCheck";
import Tag, {TagState} from "@/components/common/ui/tag/Tag";
import styles from "../test-pages.module.scss";

const TagsPage = () => (
    <div className={styles["test-page-wrap"]}>
        <div className={styles["test-page-content"]}>
            <Tag className="error-first" text="Error" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="error-second" text="Error" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="error-third" text="Error" state={TagState.BIG} icon={<CustomCheck/>}></Tag>

            <Tag className="success-first" text="success" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="success-second" text="success" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="success-third" text="success" state={TagState.BIG} icon={<CustomCheck/>}></Tag>

            <Tag className="primary-first" text="primary" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="primary-second" text="primary" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="primary-third" text="primary" state={TagState.BIG} icon={<CustomCheck/>}></Tag>

            <Tag className="warning-first" text="warning" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="warning-second" text="warning" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="warning-third" text="warning" state={TagState.BIG} icon={<CustomCheck/>}></Tag>

            <Tag className="info-first" text="info" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="info-second" text="info" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="info-third" text="info" state={TagState.BIG} icon={<CustomCheck/>}></Tag>

            <Tag className="gray-first" text="gray" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="gray-second" text="gray" state={TagState.SMALL} icon={<CustomCheck/>}></Tag>
            <Tag className="gray-third" text="gray" state={TagState.BIG} icon={<CustomCheck/>}></Tag>
        </div>
    </div>
);

export default TagsPage;
