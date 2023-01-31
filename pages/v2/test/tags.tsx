import { CustomCheck } from "../../../components/v2/custom-svg/CustomCheck";
import { Tag, TagState } from "../../../components/v2/Tag";

function tags() {
    return (
        <div>
            <div className="test-page-wrap">
                <div className="test-page-content">
                    <Tag className="error-first" text="Error" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="error-second" text="Error" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="error-third" text="Error" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="success-first" text="success" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="success-second" text="success" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="success-third" text="success" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="primary-first" text="primary" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="primary-second" text="primary" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="primary-third" text="primary" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="warning-first" text="warning" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="warning-second" text="warning" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="warning-third" text="warning" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="info-first" text="info" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="info-second" text="info" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="info-third" text="info" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="gray-first" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="gray-second" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="gray-third" text="gray" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="violet-first" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="violet-second" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="violet-third" text="gray" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="mint-first" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="mint-second" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="mint-third" text="gray" state={TagState.BIG} icon={<CustomCheck />}></Tag>

                    <Tag className="orange-first" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="orange-second" text="gray" state={TagState.SMALL} icon={<CustomCheck />}></Tag>
                    <Tag className="orange-third" text="gray" state={TagState.BIG} icon={<CustomCheck />}></Tag>
                </div>

            </div>
        </div>
    );
}

export default tags;
