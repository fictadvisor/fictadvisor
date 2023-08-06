import React, { FC, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik, FormikProps } from 'formik';

import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import { CheckBox } from '@/components/pages/contract-page/components/CheckBox';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import {
  initialValues,
  IPeduPrograms,
  ISTeduPrograms,
} from '@/components/pages/priority-page/constants';
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

  const toast = useToast();

  const handleFormSubmit = async (values: ExtendedPriorityDataBody) => {
    try {
      await ContractAPI.createPriority(prepareData({ ...values }));
      setSubmited(true);
    } catch (error) {
      if (
        (error as { response: AxiosError }).response.status === 500 ||
        (error as { response: AxiosError }).response.status === 403
      ) {
        toast.error(
          `Внутрішня помилка сервера`,
          'Зверніться до оператора або в чат абітурієнтів',
        );
        return;
      }

      toast.error(`Трапилась помилка, перевірте усі дані та спробуйте ще раз`);
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
      {({ values, isValid }) => (
        <Form
          style={{ gap: '40px', paddingTop: '24px', paddingBottom: '50px' }}
        >
          <Box sx={stylesMui.item}>
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
          <Box sx={stylesMui.item}>
            {values.specialty === '121' && (
              <Box sx={stylesMui.item}>
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
              <Box sx={stylesMui.item}>
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
              sx={{ marginBottom: '12px' }}
              textAlign={DividerTextAlign.LEFT}
              text="Дані про вступника"
            />
            <Input name="lastName" placeholder="Шевченко" label="Прізвище" />
            <Input name="firstName" placeholder="Тарас" label="Ім'я" />
            <Box sx={stylesMui.item}>
              <CheckBox name="noMiddleName" label="Немає по-батькові" />
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
            sx={{ marginBottom: '12px' }}
          />
          <Box sx={stylesMui.item}>
            <Input name="day" label="Число (день місяця)" placeholder="21" />
            <Input
              name="email"
              placeholder="smthcool@gmail.com"
              label="Електронна пошта вступника"
              clearOnUnmount
            />
            <CheckBox
              name="isToAdmission"
              label="Формую пріоритетку в корпусі"
            />
            {values.isToAdmission && (
              <Box sx={stylesMui.item}>
                <Divider
                  textAlign={DividerTextAlign.LEFT}
                  text="Підтвердження даних"
                  sx={{ marginBottom: '12px' }}
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

            <Box sx={stylesMui.item}>
              <CheckBox
                name="isForcePushed"
                label="Надіслати примусово (НЕ НАТИСКАТИ)"
                onClick={() =>
                  setIsForcePushed(!form?.current?.values.isForcePushed)
                }
              />
            </Box>
            {values?.isForcePushed && (
              <Box sx={stylesMui.item}>
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
