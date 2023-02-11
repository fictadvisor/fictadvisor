import Progress, {
  ProgressSize,
} from '@/components/common/ui/progress/Progress';

import styles from '../test-pages.module.scss';

const ProgressPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <Progress size={ProgressSize.SMALLEST} />
      <Progress size={ProgressSize.SMALL} />
      <Progress size={ProgressSize.MEDIUM} />
      <Progress size={ProgressSize.LARGE} />
      <Progress size={ProgressSize.LARGEST} />
    </div>
  </div>
);

export default ProgressPage;
