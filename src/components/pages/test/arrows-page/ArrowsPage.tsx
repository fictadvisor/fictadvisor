import { useDispatch } from 'react-redux';

import { AlertColor } from '@/components/common/ui/alert';
import ArrowButton, {
  ArrowButtonSize,
} from '@/components/common/ui/arrow-button';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from '../test-pages.module.scss';

const ArrowsPage = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <ArrowButton
          className={styles['test']}
          size={ArrowButtonSize.SMALL}
          onClick={() => {
            dispatch(
              showAlert({
                title: 'yo its workin',
                description: 'shit really work',
                color: AlertColor.SUCCESS,
              }),
            );
          }}
        />
        <ArrowButton
          size={ArrowButtonSize.MEDIUM}
          onClick={() => {
            dispatch(
              showAlert({
                title: 'WOWWWWWWWWW',
                color: AlertColor.ERROR,
              }),
            );
          }}
        />
      </div>
    </div>
  );
};

export default ArrowsPage;
