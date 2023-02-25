import { useState } from 'react';

import { Popup } from '@/components/common/composite/popup';
import Button from '@/components/common/ui/button/Button';

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
            isClosable={true}
            hasIcon={true}
            title="title"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsFirstPopupOpen}
            firstLabel="cancel"
            firstFunction={() => {
              console.log('cancelOne');
              setIsFirstPopupOpen(false);
            }}
            secondLabel="submit"
            secondFunction={() => {
              console.log('submitOne');
              setIsFirstPopupOpen(false);
            }}
          />
        )}

        {isSecondPopupOpen && (
          <Popup
            isClosable={true}
            hasIcon={true}
            title="title"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsSecondPopupOpen}
            firstLabel="cancel"
            firstFunction={() => {
              console.log('cancelTwo');
              setIsSecondPopupOpen(false);
            }}
          />
        )}

        {isThirdPopupOpen && (
          <Popup
            isClosable={true}
            hasIcon={false}
            title="title"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsThirdPopupOpen}
            firstLabel="cancel"
            firstFunction={() => {
              console.log('cancelThird');
              setIsThirdPopupOpen(false);
            }}
            secondLabel="submit"
            secondFunction={() => {
              console.log('submitOne');
              setIsThirdPopupOpen(false);
            }}
          />
        )}

        {isFourthPopupOpen && (
          <Popup
            isClosable={false}
            hasIcon={true}
            title="title"
            text="This will remove all data relating to Alex. This action cannot be reversed. Deleted data can not be recovered."
            closeFunction={setIsFourthPopupOpen}
            firstLabel="cancel"
            firstFunction={() => {
              console.log('cancelThird');
              setIsFourthPopupOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default PopupPage;
