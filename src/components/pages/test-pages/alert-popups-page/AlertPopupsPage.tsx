import React from 'react';

import Alert, {
  AlertColor,
  AlertVariant,
} from '@/components/common/ui/alert/Alert';
import AlertPopup from '@/components/common/ui/alert-popup/AlertPopup';

import styles from '../test-pages.module.scss';

const AlertPopupsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <AlertPopup>
        <Alert
          title="We are going live in July!"
          variant={AlertVariant.OUTLINE}
          color={AlertColor.SUCCESS}
        />
      </AlertPopup>
    </div>
  </div>
);

export default AlertPopupsPage;
