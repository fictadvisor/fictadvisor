import React, {FunctionComponent} from 'react';
import {SmallProgressCircle} from "./custom-svg/progress/SmallProgressCircle";
import {LargestProgressCircle} from "./custom-svg/progress/LargestProgressCircle";
import {LargeProgressCircle} from "./custom-svg/progress/LargeProgressCircle";
import {MediumProgressCircle} from "./custom-svg/progress/MediumProgressCircle";
import {SmallestProgressCircle} from "./custom-svg/progress/SmallestProgressCircle";

export enum ProgressSize {
    SMALLEST = "smallest-loader",
    SMALL = "small-loader",
    MEDIUM = "medium-loader",
    LARGE = "big-loader",
    LARGEST = "biggest-loader"
}

interface ProgressProps {
    size: ProgressSize
}


const Progress: FunctionComponent<ProgressProps> = (props) => {

    let progressCircle;
    switch(props.size){
        case ProgressSize.SMALLEST:{
            progressCircle = <SmallestProgressCircle/>
            break;
        }
        case ProgressSize.SMALL:{
            progressCircle = <SmallProgressCircle/>
            break;
        }
        case ProgressSize.MEDIUM:{
            progressCircle = <MediumProgressCircle/>
            break;
        }
        case ProgressSize.LARGE:{
            progressCircle = <LargeProgressCircle/>
            break;
        }
        case ProgressSize.LARGEST:{
            progressCircle = <LargestProgressCircle/>
            break;
        }
    }

    return (
        <div className={props.size}>
            {progressCircle}
        </div>
    );
};

export default Progress;
