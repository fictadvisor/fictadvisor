import Divider from '@/components/common/ui/divider/Divider';
import { DividerTextPosition } from '@/components/common/ui/divider/Divider';

import pageStyles from '../test-pages.module.scss';

const DividersPage = () => (
  <div className={pageStyles['test-page-wrap']}>
    <div className={pageStyles['test-page-content']}>
      <Divider />
      <Divider text={'Text'} textPosition={DividerTextPosition.CENTER} />
      <Divider text={'Text'} textPosition={DividerTextPosition.LEFT} />
      <Divider text={'Text'} textPosition={DividerTextPosition.RIGHT} />
    </div>
  </div>
);

export default DividersPage;
