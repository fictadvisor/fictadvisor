import React, { FC } from 'react';
import mergeClassNames from 'merge-class-names';

import { LargeProgressCircle } from '../../custom-svg/progress/LargeProgressCircle';
import { LargestProgressCircle } from '../../custom-svg/progress/LargestProgressCircle';
import { MediumProgressCircle } from '../../custom-svg/progress/MediumProgressCircle';
import { SmallestProgressCircle } from '../../custom-svg/progress/SmallestProgressCircle';
import { SmallProgressCircle } from '../../custom-svg/progress/SmallProgressCircle';

import styles from './Loader.module.scss';

export enum LoaderSize {
  SMALLEST = 'smallest-loader',
  SMALL = 'small-loader',
  MEDIUM = 'medium-loader',
  LARGE = 'big-loader',
  LARGEST = 'biggest-loader',
}

interface LoaderProps {
  size?: LoaderSize;
  className?: string;
}

const Loader: FC<LoaderProps> = ({ size = LoaderSize.SMALLEST, className }) => {
  let progressCircle;
  switch (size) {
    case LoaderSize.SMALLEST: {
      progressCircle = <SmallestProgressCircle />;
      break;
    }
    case LoaderSize.SMALL: {
      progressCircle = <SmallProgressCircle />;
      break;
    }
    case LoaderSize.MEDIUM: {
      progressCircle = <MediumProgressCircle />;
      break;
    }
    case LoaderSize.LARGE: {
      progressCircle = <LargeProgressCircle />;
      break;
    }
    case LoaderSize.LARGEST: {
      progressCircle = <LargestProgressCircle />;
      break;
    }
  }

  return (
    <div className={mergeClassNames(styles[size], className)}>
      {progressCircle}
    </div>
  );
};

export default Loader;
