import pageStyles from '../test-pages.module.scss';
import dividerStyles from './DividerPage.module.scss';

const DividersPage = () => (
  <div className={pageStyles['test-page-wrap']}>
    <div className={pageStyles['test-page-content']}>
      <div className={dividerStyles['container']}>
        <ul className={dividerStyles['dividers-list']}>
          <hr className={dividerStyles['first-line']} />
          <li className={dividerStyles['divider-text']}>Text</li>
          <hr className={dividerStyles['first-line']} />
        </ul>

        <ul className={dividerStyles['dividers-list']}>
          <li
            className={`${dividerStyles['divider-text']} ${dividerStyles['second-text']}`}
          >
            Text
          </li>
          <hr className={dividerStyles['second-line']} />
        </ul>

        <ul className={dividerStyles['dividers-list']}>
          <hr className={dividerStyles['second-line']} />
          <li
            className={`${dividerStyles['divider-text']} ${dividerStyles['third-text']}`}
          >
            Text
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default DividersPage;
