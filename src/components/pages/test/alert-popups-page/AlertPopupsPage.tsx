import React from 'react';

import { AlertColor, AlertVariant } from '@/components/common/ui/alert/Alert';
import AlertPopup from '@/components/common/ui/alert-popup/AlertPopup';

import styles from '../test-pages.module.scss';

const AlertPopupsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      <AlertPopup
        title="We are going live in July!"
        description="We are happy to announce that we are going live on July 28th. Get ready!"
        variant={AlertVariant.FILLED}
        color={AlertColor.WARNING}
      />
    </div>
  </div>
);

export default AlertPopupsPage;
