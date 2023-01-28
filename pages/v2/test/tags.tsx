import { TagMark } from "../../../components/v2/svg-icons/TagMarkIcon";
import { Tag, TagState } from "../../../components/v2/Tag";

/*Icons for tabs could be different,
so you need to import your icon from svg-icons
TagMark is an expamle*/

function tags() {
    return (
        <div>
            <div className="test-page-wrap">
                <Tag className="error-first" text="Error" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="error-second" text="Error" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="error-third" text="Error" state={TagState.BIG} icon={<TagMark />}></Tag>

                <Tag className="success-first" text="success" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="success-second" text="success" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="success-third" text="success" state={TagState.BIG} icon={<TagMark />}></Tag>

                <Tag className="primary-first" text="primary" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="primary-second" text="primary" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="primary-third" text="primary" state={TagState.BIG} icon={<TagMark />}></Tag>

                <Tag className="warning-first" text="warning" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="warning-second" text="warning" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="warning-third" text="warning" state={TagState.BIG} icon={<TagMark />}></Tag>


                <Tag className="info-first" text="info" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="info-second" text="info" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="info-third" text="info" state={TagState.BIG} icon={<TagMark />}></Tag>


                <Tag className="gray-first" text="gray" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="gray-second" text="gray" state={TagState.SMALL} icon={<TagMark />}></Tag>
                <Tag className="gray-third" text="gray" state={TagState.BIG} icon={<TagMark />}></Tag>
            </div>
        </div>
    );
}

export default tags;
