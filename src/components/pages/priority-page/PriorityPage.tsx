import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';

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
import { validationSchema } from '@/components/pages/priority-page/validation';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { ExtendedPriorityData } from '@/lib/api/contract/types/ContractBody';

import { prepareData } from './utils/index';
import { SuccessScreen } from './SuccessScreen';
const PriorityPage: FC = () => {
  const [submited, setSubmited] = useState(false);

  const toast = useToast();

  const handleFormSubmit = async (values: ExtendedPriorityData) => {
    try {
      await ContractAPI.createPriority(prepareData({ ...values }));
      setSubmited(true);
    } catch (error) {
      if ((error as AxiosError).status === 500) {
        toast.error(`Внутрішня помилка сервера`);
        return;
      }
      toast.error(`Трапилась помилка, перевірте усі дані та спробуйте ще раз`);
    }
  };

  if (submited) {
    return <SuccessScreen />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
            <CheckBox name="isToAdmission" label="Подаю документи в корпусі" />
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
            <Button
              text="Підтвердити вибір"
              type="submit"
              disabled={!isValid}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PriorityPage;
