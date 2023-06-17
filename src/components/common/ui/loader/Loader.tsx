import React, { FC } from 'react';
import mergeClassNames from 'merge-class-names';

import { LargeProgressCircle } from '@/components/common/icons/progress/LargeProgressCircle';
import { LargestProgressCircle } from '@/components/common/icons/progress/LargestProgressCircle';
import { MediumProgressCircle } from '@/components/common/icons/progress/MediumProgressCircle';
import { SmallestProgressCircle } from '@/components/common/icons/progress/SmallestProgressCircle';
import { SmallProgressCircle } from '@/components/common/icons/progress/SmallProgressCircle';

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

const LoaderMap = {
  [LoaderSize.SMALLEST]: SmallestProgressCircle,
  [LoaderSize.SMALL]: SmallProgressCircle,
  [LoaderSize.MEDIUM]: MediumProgressCircle,
  [LoaderSize.LARGE]: LargeProgressCircle,
  [LoaderSize.LARGEST]: LargestProgressCircle,
};

const Loader: FC<LoaderProps> = ({ size = LoaderSize.SMALLEST, className }) => {
  const LoaderIcon = LoaderMap[size];

  return (
    <div className={mergeClassNames(styles[size], className)}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
