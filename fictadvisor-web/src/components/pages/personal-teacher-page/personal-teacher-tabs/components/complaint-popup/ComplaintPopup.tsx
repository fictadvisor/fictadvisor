import { Dispatch, FC, SetStateAction } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { convertEmptyStringToUndefined } from '@/lib/utils/convertEmptyStringToUndefined';
import theme from '@/styles/theme';

import ComplaintPopupContent from './components/ComplaintPopupContent';
import * as styles from './ComplaintPopup.styles';
import { Complaint } from './types';
import { initialValues, validationSchema } from './validation';

interface ComplaintPopupProps {
  isPopupOpen: boolean;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
  teacherId: string;
}

const ComplaintPopup: FC<ComplaintPopupProps> = ({
  isPopupOpen,
  setIsPopupOpen,
  teacherId,
}) => {
  const { displayError } = useToastError();
  const toast = useToast();
  const isTablet = useMediaQuery(theme.breakpoints.down('tablet'));

  const handleSubmit = async (data: Complaint) => {
    try {
      await TeacherAPI.postTeacherComplaint(
        teacherId,
        convertEmptyStringToUndefined(data),
      );
      toast.success(
        'Скарга надіслана',
        'Ми успішно отримали скаргу на викладача та вже працюємо над нею',
        5000,
      );
      setIsPopupOpen(false);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, resetForm }) => (
        <Form>
          <Popup
            sx={styles.popup}
            open={isPopupOpen}
            content={<ComplaintPopupContent />}
            title="Лишити скаргу на викладача"
            firstButton={
              <Box sx={{ marginTop: '18px', marginBottom: '30px' }}>
                <Button
                  text="Скасувати"
                  size={isTablet ? ButtonSize.SMALL : ButtonSize.MEDIUM}
                  variant={ButtonVariant.OUTLINE}
                  onClick={() => {
                    resetForm();
                    setIsPopupOpen(false);
                  }}
                />
              </Box>
            }
            hasCross
            onClose={() => {
              resetForm();
              setIsPopupOpen(false);
            }}
            secondButton={
              <Box sx={{ marginTop: '18px', marginBottom: '30px' }}>
                <Button
                  size={isTablet ? ButtonSize.SMALL : ButtonSize.MEDIUM}
                  variant={ButtonVariant.FILLED}
                  text="Лишити скаргу"
                  onClick={() => handleSubmit()}
                />
              </Box>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default ComplaintPopup;
