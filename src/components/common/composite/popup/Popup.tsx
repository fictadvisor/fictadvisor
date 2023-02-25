import React, { SetStateAction } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '../../ui/button/Button';
import { CloseButton } from '../../ui/icon-button/variants';

import styles from './Popup.module.scss';
type OnClickFunction = {
  (): void;
};

type FirstButton = {
  firstLabel: string;
  firstFunction: OnClickFunction;
};

type SecondButton = {
  secondLabel?: string;
  secondFunction?: OnClickFunction;
};

type PopupProps = {
  isClosable: boolean;
  hasIcon: boolean;
  title: string;
  text: string;
  closeFunction: React.Dispatch<SetStateAction<boolean>>;
} & FirstButton &
  SecondButton;

export const Popup: React.FC<PopupProps> = ({
  isClosable,
  hasIcon,
  title,
  text,
  firstLabel,
  secondLabel,
  firstFunction,
  secondFunction,
  closeFunction,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shadow} />
      <div className={styles.content}>
        {isClosable && (
          <CloseButton
            onClick={() => closeFunction(false)}
            className={styles.close}
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
        <div className={styles.buttonsWrapper}>
          <div className={secondLabel ? styles.buttonWrapper : styles.line}>
            <Button
              size={ButtonSize.SMALL}
              text={firstLabel}
              color={ButtonColor.PRIMARY}
              variant={
                secondLabel ? ButtonVariant.OUTLINE : ButtonVariant.FILLED
              }
              onClick={firstFunction}
            />
          </div>
          {secondLabel && (
            <div className={styles.buttonWrapper}>
              <Button
                size={ButtonSize.SMALL}
                text={secondLabel}
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.FILLED}
                onClick={secondFunction}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
