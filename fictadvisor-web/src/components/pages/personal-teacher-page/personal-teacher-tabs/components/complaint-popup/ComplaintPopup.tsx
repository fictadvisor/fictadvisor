import { Dispatch, FC, SetStateAction } from 'react';
import { Box } from '@mui/material';
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

import ComplaintPopupContent from './components/ComplaintPopupContent';
import * as styles from './ComplaintPopup.styles';
import { Complaint } from './types';
import { initialValues, validationSchema } from './validation';

interface ComplaintPopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  teacherId: string;
}

const ComplaintPopup: FC<ComplaintPopupProps> = ({
  isOpen,
  setIsOpen,
  teacherId,
}) => {
  const { displayError } = useToastError();
  const toast = useToast();

  const handleSubmit = async (data: Complaint) => {
    const { fullName, groupId, message, title } = data;
    const complaint: Complaint = {
      message,
      title,
      fullName: undefined,
      groupId: undefined,
    };
    if (fullName) complaint.fullName = fullName;
    if (groupId) complaint.groupId = groupId;

    try {
      await TeacherAPI.postTeacherComplaint(
        teacherId,
        convertEmptyStringToUndefined(complaint),
      );
      toast.success(
        'Скарга надіслана',
        'Ми успішно отримали скаргу на викладача та вже працюємо над нею',
        5000,
      );
      setIsOpen(false);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form>
          <Popup
            sx={styles.popup}
            open={isOpen}
            content={<ComplaintPopupContent />}
            title={'Лишити скаргу на викладача'}
            firstButton={
              <Box>
                <Button
                  text="Скасувати"
                  size={ButtonSize.MEDIUM}
                  variant={ButtonVariant.OUTLINE}
                  onClick={() => setIsOpen(false)}
                />
              </Box>
            }
            hasCross={true}
            onClose={() => setIsOpen(false)}
            secondButton={
              <Box>
                <Button
                  size={ButtonSize.MEDIUM}
                  variant={ButtonVariant.FILLED}
                  text="Лишити скаргу"
                  type="submit"
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
