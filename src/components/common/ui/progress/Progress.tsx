import React, { FC } from 'react';

import { LargeProgressCircle } from '../../custom-svg/progress/LargeProgressCircle';
import { LargestProgressCircle } from '../../custom-svg/progress/LargestProgressCircle';
import { MediumProgressCircle } from '../../custom-svg/progress/MediumProgressCircle';
import { SmallestProgressCircle } from '../../custom-svg/progress/SmallestProgressCircle';
import { SmallProgressCircle } from '../../custom-svg/progress/SmallProgressCircle';

import styles from './Progress.module.scss';

export enum ProgressSize {
  SMALLEST = 'smallest-loader',
  SMALL = 'small-loader',
  MEDIUM = 'medium-loader',
  LARGE = 'big-loader',
  LARGEST = 'biggest-loader',
}

interface ProgressProps {
  size: ProgressSize;
}

const Progress: FC<ProgressProps> = props => {
  let progressCircle;
  switch (props.size) {
    case ProgressSize.SMALLEST: {
      progressCircle = <SmallestProgressCircle />;
      break;
    }
    case ProgressSize.SMALL: {
      progressCircle = <SmallProgressCircle />;
      break;
    }
    case ProgressSize.MEDIUM: {
      progressCircle = <MediumProgressCircle />;
      break;
    }
    case ProgressSize.LARGE: {
      progressCircle = <LargeProgressCircle />;
      break;
    }
    case ProgressSize.LARGEST: {
      progressCircle = <LargestProgressCircle />;
      break;
    }
  }

  return <div className={styles[props.size]}>{progressCircle}</div>;
};

export default Progress;
