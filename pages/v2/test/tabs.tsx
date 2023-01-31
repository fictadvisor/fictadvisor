import { AcademicCapIcon } from "@heroicons/react/24/outline";
import {Tab, TabContentPosition} from "../../../components/v2/Tab";

function tabs() {
    return (
        <div className="test-page-wrap">
            <div className="test-page-content">
                <div className={"block"}>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.CENTRE}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.CENTRE}
                         isDisabled={true}></Tab>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.LEFT}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.LEFT}
                         isDisabled={true}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.CENTRE}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.CENTRE}
                         isDisabled={true}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.LEFT}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.LEFT}
                         isDisabled={true}></Tab>
                </div>
                
                <div className={"block"}>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.CENTRE}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.CENTRE} isDisabled={true}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.LEFT}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.LEFT} isDisabled={true}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.CENTRE}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.CENTRE} isDisabled={true}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.LEFT}
                         icon={<AcademicCapIcon/>}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.LEFT} isDisabled={true}
                         icon={<AcademicCapIcon/>}></Tab>
                </div>

                <div className={"block"}>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.CENTRE} count={1}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.CENTRE} isDisabled={true}
                         count={1}></Tab>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.LEFT} count={2}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.LEFT} isDisabled={true}
                         count={2}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.CENTRE} count={10}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.CENTRE} isDisabled={true}
                         count={0}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.LEFT} count={100}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.LEFT} isDisabled={true}
                         count={100}></Tab>
                </div>

                <div className={"block"}>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.CENTRE} icon={<AcademicCapIcon/>}
                         count={1}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.CENTRE} isDisabled={true}
                         icon={<AcademicCapIcon/>} count={1}></Tab>
                    <Tab className="tab-normal" text="Tab" position={TabContentPosition.LEFT} icon={<AcademicCapIcon/>}
                         count={2}></Tab>
                    <Tab className="tab-normal" text="disabled" position={TabContentPosition.LEFT} isDisabled={true}
                         icon={<AcademicCapIcon/>} count={2}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.CENTRE} icon={<AcademicCapIcon/>}
                         count={10}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.CENTRE} isDisabled={true}
                         icon={<AcademicCapIcon/>} count={10}></Tab>
                    <Tab className="tab-small" text="Tab" position={TabContentPosition.LEFT} icon={<AcademicCapIcon/>}
                         count={100}></Tab>
                    <Tab className="tab-small" text="disabled" position={TabContentPosition.LEFT} isDisabled={true}
                         icon={<AcademicCapIcon/>} count={100}></Tab>
                </div>
            </div>
        </div>
    );
}

export default tabs;
