import React, { MouseEvent, SetStateAction, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button-mui/';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import FormikNumberedTextArea from '@/components/common/ui/form/with-formik/numbered-text-area';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { initialValues } from '@/components/pages/account-page/components/group-tab/components/text-area-popup/constants';
import { validationSchema } from '@/components/pages/account-page/components/group-tab/components/text-area-popup/validation';

import * as styles from './TextAreaPopup.styles';
interface TextAreaPopup {
  handleSubmit: (value: string) => void;
  closeFunction: React.Dispatch<SetStateAction<boolean>>;
}

export const TextAreaPopup: React.FC<TextAreaPopup> = ({
  closeFunction,
  handleSubmit,
}) => {
  const backDropRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: MouseEvent) => {
    if (event.target === backDropRef.current) closeFunction(false);
  };

  return (
    <Backdrop
      open={true}
      sx={styles.backDrop}
      ref={backDropRef}
      onClick={handleClick}
    >
      <Box sx={styles.content}>
        <IconButton
          sx={styles.close}
          icon={<XMarkIcon />}
          color={IconButtonColor.TRANSPARENT}
          onClick={() => closeFunction(false)}
        />
        <Typography sx={styles.title}>Додати студента</Typography>
        <Typography sx={styles.description}>
          Ти можеш додати декількох студентів одразу, ввівши їх електронні
          адреси через Enter або кому. Також, якщо скопіювати весь рядок
          електронних пошт з таблиці, вони зручно сформуються в один список.
        </Typography>
        <Formik
          onSubmit={data => handleSubmit(data.textArea)}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ isValid }) => (
            <Form>
              <FormikNumberedTextArea name="textArea" />
              <Button
                sx={styles.button}
                startIcon={<PlusIcon className="icon" />}
                text="Додати"
                type="submit"
                size={ButtonSize.SMALL}
                disabled={!isValid}
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Backdrop>
  );
};
