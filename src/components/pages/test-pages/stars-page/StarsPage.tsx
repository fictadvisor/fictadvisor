import starStyles from '../../../common/ui/rating/Rating.module.scss';
import testStyles from '../test-pages.module.scss';

const StarsPage = () => (
  <div className={testStyles['test-page-wrap']}>
    <div className={starStyles['ratings']}>
      <div className={starStyles['empty-stars']}></div>
      <div className={starStyles['full-stars']}></div>
    </div>
  </div>
);

export default StarsPage;
