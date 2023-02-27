import React, { ReactNode, SetStateAction } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import { CloseButton } from '../../ui/icon-button/variants';

import styles from './Popup.module.scss';

interface PopupProps {
  isClosable: boolean;
  hasIcon: boolean;
  title: string;
  text: string;
  firstButton: ReactNode;
  secondButton?: ReactNode;
  closeFunction: React.Dispatch<SetStateAction<boolean>>;
}

export const Popup: React.FC<PopupProps> = ({
  isClosable,
  hasIcon,
  title,
  text,
  firstButton,
  secondButton,
  closeFunction,
}) => {
  const secondLabel = secondButton ? true : false;
  return (
    <div className={styles.wrapper}>
      <div className={styles.shadow} onClick={() => closeFunction(false)} />
      <div className={styles.content}>
        {isClosable && (
          <CloseButton
            onClick={() => closeFunction(false)}
            className={hasIcon ? styles.close : styles.movedClose}
          />
        )}
        {hasIcon ? (
          <div className={styles.titleWrapper}>
            <CheckCircleIcon
              width="24px"
              height="24px"
              className={styles.icon}
            />
            <h1 className={styles.title}>{title}</h1>
          </div>
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )}
        <p
          className={
            hasIcon ? styles.description : styles.alignedLeftDescription
          }
        >
          {text}
        </p>
        <div
          className={hasIcon ? styles.buttonsWrapper : styles.alignRightButton}
        >
          <div className={secondLabel ? styles.buttonWrapper : styles.line}>
            {firstButton}
          </div>
          {secondLabel && (
            <div className={styles.buttonWrapper}>{secondButton}</div>
          )}
        </div>
      </div>
    </div>
  );
};
