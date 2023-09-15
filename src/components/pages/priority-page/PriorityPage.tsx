import React, { FC, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';

import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import {
  initialValues,
  IPeduPrograms,
  ISTeduPrograms,
} from '@/components/pages/priority-page/constants';
import * as styles from '@/components/pages/priority-page/PriorityPage.styles';
import {
  getLocalStorage,
  saveLocalStorage,
} from '@/components/pages/priority-page/utils/localStorage';
import {
  optionalValidationSchema,
  validationSchema,
} from '@/components/pages/priority-page/validation';
import useTabClose from '@/hooks/use-tab-close';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { ExtendedPriorityDataBody } from '@/lib/api/contract/types/PriorityDataBody';

import { prepareData } from './utils/prepareData';
import { SuccessScreen } from './SuccessScreen';
const PriorityPage: FC = () => {
  const [submited, setSubmited] = useState(false);
  const form = useRef<FormikProps<ExtendedPriorityDataBody>>(null);
  const [isForcePushed, setIsForcePushed] = useState(
    getLocalStorage()?.isForcePushed,
  );
  const { displayError } = useToastError();

  const handleFormSubmit = async (values: ExtendedPriorityDataBody) => {
    try {
      await ContractAPI.createPriority(prepareData({ ...values }));
      setSubmited(true);
    } catch (error) {
      displayError(error);
    }
  };

  useTabClose(() => {
    if (form?.current?.values) {
      saveLocalStorage(form?.current?.values);
    }
  });

  if (submited) {
    return <SuccessScreen />;
  }

  return (
    <Formik
      innerRef={form}
      initialValues={getLocalStorage() || initialValues}
      validationSchema={
        isForcePushed ? optionalValidationSchema : validationSchema
      }
      onSubmit={handleFormSubmit}
    >
      {({ values }) => (
        <Form
          style={{ gap: '40px', paddingTop: '24px', paddingBottom: '50px' }}
        >
          <Box sx={styles.item}>
            <Typography variant="h6Bold">Спеціальність</Typography>
            <FormikRadioGroup
              name="specialty"
              options={[
                {
                  label: '121 Інженерія програмного забезпечення',
                  value: '121',
                },
                {
                  label: '126 Інформаційні системи та технології',
                  value: '126',
                },
              ]}
            />
          </Box>
          <Box sx={styles.item}>
            {values.specialty === '121' && (
              <Box sx={styles.item}>
                <Typography variant="h6Bold">Освітні програми</Typography>
                <FormikDropdown
                  name="priorities.1"
                  options={IPeduPrograms}
                  size={FieldSize.LARGE}
                  label="Перший пріоритет"
                  placeholder="виберіть зі списку"
                  clearOnUnmount
                />
                <FormikDropdown
                  name="priorities.2"
                  options={IPeduPrograms}
                  size={FieldSize.LARGE}
                  label="Другий пріоритет"
                  placeholder="виберіть зі списку"
                  clearOnUnmount
                />
              </Box>
            )}
            {values.specialty === '126' && (
              <Box sx={styles.item}>
                <Typography variant="h6Bold">Освітні програми</Typography>
                <FormikDropdown
                  options={ISTeduPrograms}
                  name="priorities.1"
                  size={FieldSize.LARGE}
                  label="Перший пріоритет"
                  placeholder="виберіть зі списку"
                  clearOnUnmount
                />
                <FormikDropdown
                  name="priorities.2"
                  options={ISTeduPrograms}
                  size={FieldSize.LARGE}
                  label="Другий пріоритет"
                  placeholder="виберіть зі списку"
                  clearOnUnmount
                />
                <FormikDropdown
                  name="priorities.3"
                  options={ISTeduPrograms}
                  size={FieldSize.LARGE}
                  label="Третій пріоритет"
                  placeholder="виберіть зі списку"
                  clearOnUnmount
                />
              </Box>
            )}
          </Box>
          <Box sx={{ gap: '24px' }}>
            <Divider
              sx={styles.divider}
              textAlign={DividerTextAlign.LEFT}
              text="Дані про вступника"
            />
            <Box sx={styles.item}>
              <Input name="lastName" placeholder="Шевченко" label="Прізвище" />
              <Input name="firstName" placeholder="Тарас" label="Ім'я" />
              <Checkbox name="noMiddleName" label="Немає по-батькові" />
              {values?.noMiddleName ? (
                <Input
                  resetOnDisabled
                  name="middleName"
                  disabled={true}
                  placeholder={'Григорович'}
                  label={`По-батькові`}
                />
              ) : (
                <Input
                  name="middleName"
                  disabled={false}
                  placeholder={'Григорович'}
                  label={`По-батькові`}
                />
              )}
            </Box>
          </Box>
          <Divider
            textAlign={DividerTextAlign.LEFT}
            text="Дата заповнення"
            sx={styles.divider}
          />
          <Box sx={styles.item}>
            <Input name="day" label="Число (день місяця)" placeholder="21" />
            <Input
              name="email"
              placeholder="smthcool@gmail.com"
              label="Електронна пошта вступника"
              clearOnUnmount
            />
            <Checkbox
              name="isToAdmission"
              label="Формую пріоритетку в корпусі"
            />
            {values.isToAdmission && (
              <Box sx={styles.item}>
                <Divider
                  textAlign={DividerTextAlign.LEFT}
                  text="Підтвердження даних"
                  sx={styles.divider}
                />
                <Typography variant="h6Bold">
                  Віддайте телефон оператору
                </Typography>
                <Input
                  name="secretNumber"
                  label="Секретний код"
                  placeholder="0000"
                />
              </Box>
            )}

            <Box sx={styles.item}>
              <Checkbox
                name="isForcePushed"
                label="Надіслати примусово (НЕ НАТИСКАТИ)"
                onChange={(_, checked) => setIsForcePushed(checked)}
              />
            </Box>
            {values?.isForcePushed && (
              <Box sx={styles.item}>
                <Input
                  name="forcePushedNumber"
                  label="Код форс пушу"
                  placeholder="0000"
                />
              </Box>
            )}
            <Button
              text="Підтвердити вибір"
              type="submit"
              // disabled={!isValid}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PriorityPage;
