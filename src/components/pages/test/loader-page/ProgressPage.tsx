import Loader, { LoaderSize } from '@/components/common/ui/loader/Loader';

import styles from '../test-pages.module.scss';

const ProgressPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <Loader className={styles['test']} />
      <Loader size={LoaderSize.SMALL} />
      <Loader size={LoaderSize.MEDIUM} />
      <Loader size={LoaderSize.LARGE} />
      <Loader size={LoaderSize.LARGEST} />
    </div>
  </div>
);

export default ProgressPage;
