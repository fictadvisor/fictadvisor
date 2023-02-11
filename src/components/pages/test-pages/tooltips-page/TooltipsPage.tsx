import Tooltip, { TooltipDirection } from '@/components/common/ui/tooltip';

import styles from '../test-pages.module.scss';

const TooltipsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <Tooltip text="Tooltip Example" />
      <Tooltip direction={TooltipDirection.TOP} text="Tooltip Example" />
      <Tooltip direction={TooltipDirection.BOTTOM} text="Tooltip Example" />
      <Tooltip direction={TooltipDirection.LEFT} text="Tooltip Example" />
      <Tooltip direction={TooltipDirection.RIGHT} text="Tooltip Example" />
    </div>
  </div>
);

export default TooltipsPage;
