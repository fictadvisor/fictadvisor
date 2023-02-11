import { XMarkIcon } from '@heroicons/react/24/outline';

import { CustomCheck } from '@/components/common/custom-svg/CustomCheck';
import AlertButton, {
  AlertButtonIconPosition,
  AlertButtonType,
} from '@/components/common/ui/alert-button/AlertButton';

import styles from '../test-pages.module.scss';

const AlertButtonsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <AlertButton
        text="Success"
        icon={<CustomCheck />}
        iconPosition={AlertButtonIconPosition.LEFT}
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.SUCCESS}
      />
      <AlertButton
        text="Success"
        icon={<CustomCheck />}
        iconPosition={AlertButtonIconPosition.RIGHT}
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.SUCCESS}
      />
      <AlertButton
        text="Success"
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.SUCCESS}
      />
      <AlertButton
        text="Success"
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.SUCCESS}
      />

      <AlertButton
        text="Error primary"
        icon={<XMarkIcon className="icon" />}
        iconPosition={AlertButtonIconPosition.LEFT}
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_PRIMARY}
      />
      <AlertButton
        text="Error primary"
        icon={<XMarkIcon className="icon" />}
        iconPosition={AlertButtonIconPosition.RIGHT}
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_PRIMARY}
      />
      <AlertButton
        text="Error primary"
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_PRIMARY}
      />
      <AlertButton
        text="Error primary"
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_PRIMARY}
      />

      <AlertButton
        text="Error secondary"
        icon={<XMarkIcon className="icon" />}
        iconPosition={AlertButtonIconPosition.LEFT}
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_SECONDARY}
      />
      <AlertButton
        icon={<XMarkIcon className="icon" />}
        iconPosition={AlertButtonIconPosition.RIGHT}
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_SECONDARY}
      />
      <AlertButton
        text="Error secondary"
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_SECONDARY}
      />
      <AlertButton
        text="Error secondary"
        onClick={() => {}}
        isDisabled={false}
        type={AlertButtonType.ERROR_SECONDARY}
      />
    </div>
  </div>
);

export default AlertButtonsPage;
