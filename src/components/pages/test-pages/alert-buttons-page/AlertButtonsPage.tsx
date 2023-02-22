import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonVariant,
} from '@/components/common/ui/alert-button/AlertButton';

import styles from '../test-pages.module.scss';

const AlertButtonsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <AlertButton
        text="Add"
        icon={<CustomCheck />}
        disabled={true}
        variant={AlertButtonVariant.SUCCESS}
      />
      <AlertButton
        text="Add"
        icon={<CustomCheck />}
        disabled={true}
        variant={AlertButtonVariant.SUCCESS}
      />
      <AlertButton
        text="Add"
        disabled={false}
        variant={AlertButtonVariant.SUCCESS}
      />
      <AlertButton
        icon={<CustomCheck />}
        disabled={false}
        variant={AlertButtonVariant.SUCCESS}
      />

      <AlertButton
        text="Remove"
        icon={<XMarkIcon className="icon" />}
        disabled={false}
        variant={AlertButtonVariant.ERROR_FILLED}
      />
      <AlertButton
        text="Remove"
        icon={<XMarkIcon className="icon" />}
        disabled={true}
        variant={AlertButtonVariant.ERROR_FILLED}
      />
      <AlertButton
        text="Remove"
        disabled={false}
        variant={AlertButtonVariant.ERROR_FILLED}
      />
      <AlertButton
        icon={<XMarkIcon className="icon" />}
        disabled={false}
        variant={AlertButtonVariant.ERROR_FILLED}
      />

      <AlertButton
        text="Remove"
        icon={<XMarkIcon className="icon" />}
        disabled={false}
        variant={AlertButtonVariant.ERROR_OUTLINE}
      />
      <AlertButton
        text="Remove"
        icon={<XMarkIcon className="icon" />}
        disabled={true}
        variant={AlertButtonVariant.ERROR_OUTLINE}
      />
      <AlertButton
        text="Remove"
        disabled={false}
        variant={AlertButtonVariant.ERROR_OUTLINE}
      />
      <AlertButton
        icon={<XMarkIcon className="icon" />}
        disabled={false}
        variant={AlertButtonVariant.ERROR_OUTLINE}
      />
    </div>
  </div>
);

export default AlertButtonsPage;
