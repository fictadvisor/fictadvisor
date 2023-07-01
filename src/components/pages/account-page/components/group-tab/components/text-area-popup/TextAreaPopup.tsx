import React, { SetStateAction } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';

import Button, { ButtonSize } from '@/components/common/ui/button';
import { NumberedTextArea } from '@/components/common/ui/form';
import { initialValues } from '@/components/pages/account-page/components/group-tab/components/text-area-popup/constants';
import { validationSchema } from '@/components/pages/account-page/components/group-tab/components/text-area-popup/validation';

import { CloseButton } from '../../../../../../common/ui/icon-button/variants';

import styles from './TextAreaPopup.module.scss';

interface TextAreaPopup {
  handleSubmit: (value: string) => void;
  closeFunction: React.Dispatch<SetStateAction<boolean>>;
}

export const TextAreaPopup: React.FC<TextAreaPopup> = ({
  closeFunction,
  handleSubmit,
}) => {
  // TODO: remove this shit
  document.body.style.overflow = 'auto';
  return (
    <div className={styles.wrapper}>
      <div className={styles.shadow} onClick={() => closeFunction(false)} />
      <div className={styles.content}>
        <CloseButton
          onClick={() => closeFunction(false)}
          className={styles.close}
        />
        <h6 className={styles.title}>Додати студента</h6>
        <p className={styles.description}>
          Ти можеш додати декількох студентів одразу, ввівши їх електронні
          адреси через Enter або кому. Також скопіювавши весь рядок електронних
          пошт з таблиці, вони зручно сформуються в один список
        </p>
        <Formik
          onSubmit={data => handleSubmit(data.textArea)}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ isValid }) => (
            <Form>
              <div className={styles.textAreaWrapper}>
                <NumberedTextArea name="textArea" />
              </div>
              <div className={styles.buttonsContainer}>
                <div className={styles.buttonsWrapper}>
                  <div className={styles.line}>
                    <Button
                      startIcon={<PlusIcon className="icon" />}
                      text="Додати"
                      type="submit"
                      className={styles.button}
                      size={ButtonSize.SMALL}
                      disabled={!isValid}
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
