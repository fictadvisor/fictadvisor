import React from 'react';

import Alert, {
  AlertColor,
  AlertVariant,
} from '@/components/common/ui/alert/Alert';

import styles from '../test-pages.module.scss';

const AlertsPage = () => (
  <div className={styles['test-page-wrap']}>
    <div className={styles['test-page-content']}>
      {[
        AlertVariant.OUTLINE,
        AlertVariant.DARKER,
        AlertVariant.FILLED,
        AlertVariant.BORDER_LEFT,
        AlertVariant.BORDER_TOP,
      ].map((variant: AlertVariant) => (
        <>
          <Alert
            isClosable={false}
            className={styles['test']}
            title="We are going live in July!"
            description="We are happy to announce that we are going live on July 28th. Get ready!"
            variant={variant}
            color={AlertColor.INFO}
          />
          <Alert
            isClosable={false}
            title="We are going live in July!"
            variant={variant}
            color={AlertColor.INFO}
          />
          <Alert
            title="We are going live in July!"
            description="We are happy to announce that we are going live on July 28th. Get ready!"
            variant={variant}
            color={AlertColor.SUCCESS}
          />
          <Alert
            title="We are going live in July!"
            variant={variant}
            color={AlertColor.SUCCESS}
          />
          <Alert
            title="We are going live in July!"
            description="We are happy to announce that we are going live on July 28th. Get ready!"
            variant={variant}
            color={AlertColor.WARNING}
          />
          <Alert
            title="We are going live in July!"
            variant={variant}
            color={AlertColor.WARNING}
          />
          <Alert
            title="We are going live in July!"
            description="We are happy to announce that we are going live on July 28th. Get ready!"
            variant={variant}
            color={AlertColor.ERROR}
          />
          <Alert
            title="We are going live in July!"
            variant={variant}
            color={AlertColor.ERROR}
          />
        </>
      ))}
    </div>
  </div>
);

export default AlertsPage;
