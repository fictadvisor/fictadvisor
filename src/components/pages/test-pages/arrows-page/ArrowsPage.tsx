import pageStyles from '../test-pages.module.scss';
import arrowStyles from 'styles/v2/local/elements/ArrowButton.module.scss';

const ArrowsPage = () => (
  <div className={pageStyles['test-page-wrap']}>
    <button
      className={
        arrowStyles['arrow-desktop'] + ' ' + arrowStyles['arrow-default-color']
      }
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="#FAFAFA"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <button
      className={
        arrowStyles['arrow-mobile'] + ' ' + arrowStyles['arrow-default-color']
      }
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.4993 15.8333L6.66602 9.99999L12.4993 4.16666"
          stroke="#FAFAFA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);

export default ArrowsPage;
