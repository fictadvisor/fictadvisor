import Divider from '@/components/common/ui/divider/Divider';
import { DividerTextPosition } from '@/components/common/ui/divider/Divider';

import pageStyles from '../test-pages.module.scss';
import dividerStyles from './DividerPage.module.scss';

const DividersPage = () => (
  <div className={pageStyles['test-page-wrap']}>
    <div className={pageStyles['test-page-content']}>
      <div className={dividerStyles['container']}>
        <Divider text={'Text'} textPosition={DividerTextPosition.CENTER} />
        <Divider text={'Text'} textPosition={DividerTextPosition.LEFT} />
        <Divider text={'Text'} textPosition={DividerTextPosition.RIGHT} />
      </div>
    </div>
  </div>
);

export default DividersPage;
