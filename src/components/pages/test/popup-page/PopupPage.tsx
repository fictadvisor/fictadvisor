import { useState } from 'react';

import { Popup } from '@/components/common/composite/popup';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button/Button';

import styles from '../test-pages.module.scss';

const PopupPage = () => {
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false);
  const [isFourthPopupOpen, setIsFourthPopupOpen] = useState(false);

  return (
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <Button
          text="open first popup"
          onClick={() => setIsFirstPopupOpen(true)}
        />

        <Button
          text="open second popup"
          onClick={() => setIsSecondPopupOpen(true)}
        />

        <Button
          text="open third popup"
          onClick={() => setIsThirdPopupOpen(true)}
        />

        <Button
          text="open fourth popup"
          onClick={() => setIsFourthPopupOpen(true)}
        />

        {isFirstPopupOpen && (
          <Popup
            isClosable={false}
            hasIcon={true}
            title="Application Received"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsFirstPopupOpen}
            firstButton={
              <Button
                size={ButtonSize.SMALL}
                text="cancel"
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.OUTLINE}
                onClick={() => {
                  setIsFirstPopupOpen(false);
                }}
              />
            }
            secondButton={
              <Button
                size={ButtonSize.SMALL}
                text="submit"
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.FILLED}
                onClick={() => {
                  setIsFirstPopupOpen(false);
                }}
              />
            }
          />
        )}

        {isSecondPopupOpen && (
          <Popup
            isClosable={true}
            hasIcon={true}
            title="Application Received"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsSecondPopupOpen}
            firstButton={
              <Button
                size={ButtonSize.SMALL}
                text="cancel"
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.OUTLINE}
                onClick={() => {
                  setIsSecondPopupOpen(false);
                }}
              />
            }
            secondButton={''}
          />
        )}

        {isThirdPopupOpen && (
          <Popup
            isClosable={true}
            hasIcon={false}
            title="Application Received"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsThirdPopupOpen}
            firstButton={
              <Button
                size={ButtonSize.SMALL}
                text="cancel"
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.OUTLINE}
                onClick={() => {
                  setIsThirdPopupOpen(false);
                }}
              />
            }
            secondButton={
              <Button
                size={ButtonSize.SMALL}
                text="submit"
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.FILLED}
                onClick={() => {
                  setIsThirdPopupOpen(false);
                }}
              />
            }
          />
        )}

        {isFourthPopupOpen && (
          <Popup
            isClosable={false}
            hasIcon={true}
            title="Application Received"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsFourthPopupOpen}
            firstButton={
              <Button
                size={ButtonSize.SMALL}
                text="cancel"
                color={ButtonColor.PRIMARY}
                variant={ButtonVariant.FILLED}
                onClick={() => {
                  setIsFourthPopupOpen(false);
                }}
              />
            }
          />
        )}
      </div>
    </div>
  );
};
export default PopupPage;
