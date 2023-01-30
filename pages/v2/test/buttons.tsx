import Button, {ButtonIconPosition, ButtonSize, ButtonType} from "../../../components/v2/Button";
import {AcademicCapIcon} from "../../../components/v2/svg-icons/AcademicCapIcon";
import {SuccessIcon} from "../../../components/v2/svg-icons/SuccessIcon";
import {BeakerIcon, HeartIcon} from "@heroicons/react/24/outline";
import React from "react";

function buttons(){
    return(
        <div className="test-page-wrap">
            <div className="test-page-content">
                <Button text="Primary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_RED}/>

                <Button text="Primary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_RED}/>

                <Button text="Primary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_RED}/>
                <Button text="Primary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_RED}/>

                <Button text="Primary Gray" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_GRAY}/>
                <Button text="Primary Gray" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_GRAY}/>
                <Button text="Primary Gray" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_GRAY}/>

                <Button text="Primary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_GRAY}/>
                <Button text="Primary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_GRAY}/>
                <Button text="Primary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_GRAY}/>

                <Button text="Primary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.PRIMARY_GRAY}/>
                <Button text="Primary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.PRIMARY_GRAY}/>
                <Button text="Primary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_GRAY}/>

                <Button text="Secondary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.SECONDARY_RED}/>
                <Button text="Secondary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY_RED}/>
                <Button text="Secondary Red" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_RED}/>

                <Button text="Secondary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.SECONDARY_RED}/>
                <Button text="Secondary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY_RED}/>
                <Button text="Secondary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_RED}/>

                <Button text="Secondary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.SECONDARY_RED}/>
                <Button text="Secondary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY_RED}/>
                <Button text="Secondary Red" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_RED}/>

                <Button text="Secondary Gray" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.SECONDARY_GRAY}/>
                <Button text="Secondary Gray" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY_GRAY}/>
                <Button text="Secondary Gray" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_GRAY}/>

                <Button text="Secondary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.SECONDARY_GRAY}/>
                <Button text="Secondary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY_GRAY}/>
                <Button text="Secondary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_GRAY}/>

                <Button text="Secondary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.SECONDARY_GRAY}/>
                <Button text="Secondary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.SECONDARY_GRAY}/>
                <Button text="Secondary Gray" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_GRAY}/>

                <Button text="Tertiary" onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.TERTIARY}/>
                <Button text="Tertiary" onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY}/>
                <Button text="Tertiary" onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.TERTIARY}/>

                <Button text="Tertiary" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.TERTIARY}/>
                <Button text="Tertiary" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY}/>
                <Button text="Tertiary" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.TERTIARY}/>

                <Button text="Tertiary" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.TERTIARY}/>
                <Button text="Tertiary" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY}/>
                <Button text="Tertiary" icon={<AcademicCapIcon/>} iconPosition={ButtonIconPosition.RIGHT} onClick={() => {}} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.TERTIARY}/>

                <BeakerIcon className="icon"/>
                <AcademicCapIcon className="icon"/>
                <HeartIcon className="icon"/>
            </div>
        </div>
    );
}

export default buttons;
