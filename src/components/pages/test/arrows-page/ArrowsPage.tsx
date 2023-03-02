import ArrowButton, {
  ArrowButtonSize,
} from '@/components/common/ui/arrow-button';

import styles from '../test-pages.module.scss';

const ArrowsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <ArrowButton
        className={styles['test']}
        size={ArrowButtonSize.SMALL}
      ></ArrowButton>
      <ArrowButton size={ArrowButtonSize.MEDIUM}></ArrowButton>
    </div>
  </div>
);

export default ArrowsPage;
