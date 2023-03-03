import React, { FC } from 'react';

import Alert, { AlertColor } from '@/components/common/ui/alert';
import useAuthentication from '@/hooks/use-authentication';

import styles from './NoGroupBlock.module.scss';

const NoGroupBlock: FC = () => {
  const { user } = useAuthentication();
  return (
    <div className={styles['content']}>
      <div className={styles['text-content']}>
        <h4>{user.group.code}</h4>
      </div>
      <Alert
        title={''}
        description={'Ваша заявка ще не прийнята, очікуйте підтвердження'}
        isClosable={false}
        className={styles['alert alert-description']}
      />
      <div className={styles['alert-desktop']}>
        <Alert
          title={'Ваша заявка відхилена'}
          color={AlertColor.ERROR}
          isClosable={false}
          description={'Оберіть іншу групу нижче та надішліть новий запит'}
          className={styles['alert']}
        />
      </div>
      <div className={styles['alert-mobile']}>
        <Alert
          title={'Ваша заявка відхилена'}
          color={AlertColor.ERROR}
          isClosable={false}
          className={styles['alert']}
        />
      </div>
      <div className={styles['division']}>
        <div className={styles['white']}></div>
        <h4 className={styles['division-text']}>Або виберіть іншу групу</h4>
        <div className={styles['white']}></div>
        <div className={styles['button']}></div>
      </div>
    </div>
  );
};
export default NoGroupBlock;
