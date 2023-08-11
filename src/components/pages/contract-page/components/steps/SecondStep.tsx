import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';

import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import { Actions } from '@/components/pages/contract-page/components/Actions';
import { CheckBox } from '@/components/pages/contract-page/components/CheckBox';
import { REGIONS } from '@/components/pages/contract-page/constants';
import { kyiv } from '@/components/pages/contract-page/constants';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import { saveLocalStorage } from '@/components/pages/contract-page/utils/localStorage';
import {
  entrantOptionalValidationSchema,
  entrantValidationSchema,
} from '@/components/pages/contract-page/validation/entrant';
import useTabClose from '@/hooks/use-tab-close';
import {
  ExtendedContractBody,
  PassportType,
} from '@/lib/api/contract/types/ContractBody';
export interface SecondStepProps {
  onNextStep: (data: ExtendedContractBody, final?: boolean) => void;
  onPrevStep: (data: ExtendedContractBody) => void;
  data: ExtendedContractBody;

  isForcePushed: boolean;
}
export const SecondStep: FC<SecondStepProps> = ({
  onNextStep,
  data,
  onPrevStep,
  isForcePushed,
}) => {
  const form = useRef<FormikProps<ExtendedContractBody>>(null);
  const handleSubmit = (values: ExtendedContractBody) => {
    onNextStep(values, data?.helper?.isAdult && !data?.helper?.hasCustomer);
  };

  useTabClose(() => {
    if (form?.current?.values) {
      saveLocalStorage(form?.current?.values);
    }
  });

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={
        isForcePushed
          ? entrantOptionalValidationSchema
          : entrantValidationSchema
      }
      innerRef={form}
    >
      {({ values }) => (
        <Form>
          <Typography variant="h4Bold">Інформація про вступника</Typography>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Особисті дані вступника"
              sx={stylesMui.divider}
            />
            <Input
              name="entrant.lastName"
              placeholder="Шевченко"
              label={`Прізвище`}
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="entrant.firstName"
              placeholder="Тарас"
              label={`Ім’я`}
            />
          </Box>
          <Box sx={stylesMui.item}>
            <CheckBox
              name="helper.entrantHasNoMiddleName"
              label="Немає по-батькові"
            />
            {values?.helper?.entrantHasNoMiddleName ? (
              <Input
                resetOnDisabled
                name="entrant.middleName"
                disabled={true}
                placeholder={'Григорович'}
                label={`По-батькові`}
              />
            ) : (
              <Input
                name="entrant.middleName"
                disabled={false}
                placeholder={'Григорович'}
                label={`По-батькові`}
              />
            )}
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="entrant.phoneNumber"
              placeholder="+380123456789"
              label={`Номер телефону`}
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="entrant.email"
              placeholder="smthcool@gmail.com"
              label={`Електронна пошта`}
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Паспортні дані вступника"
              sx={stylesMui.divider}
            />

            <FormikRadioGroup
              name="helper.entrantPassportType"
              options={[
                {
                  value: PassportType.ID,
                  label: 'ID картка',
                },
                {
                  value: PassportType.OLD,
                  label: 'Паспорт старого зразка',
                },
                {
                  value: PassportType.FOREIGN,
                  label: 'Закордонний пасорт',
                },
              ]}
            />

            <Box sx={{ gap: '24px' }}>
              {values?.helper?.entrantPassportType !== PassportType.ID && (
                <Input
                  clearOnUnmount
                  name="entrant.passportSeries"
                  label="Серія паспорту"
                />
              )}
            </Box>

            <Input name="entrant.passportNumber" label="Номер паспорту" />
          </Box>

          <Box sx={stylesMui.item}>
            <Input
              name="entrant.passportDate"
              label={`Дата видачі паспорту`}
              placeholder="25.07.2017"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="entrant.passportInstitute"
              label={`Орган видачі паспорту`}
            />
          </Box>
          <Box sx={stylesMui.item}>
            <CheckBox
              name="helper.entrantHasNoCode"
              label="Відмова від РНОКПП"
            />
            {values?.helper?.entrantHasNoCode ? (
              <Input
                name="entrant.idCode"
                disabled={true}
                resetOnDisabled
                label="Ідентифікаційний код"
              />
            ) : (
              <Input
                name="entrant.idCode"
                disabled={false}
                label="Ідентифікаційний код"
              />
            )}
          </Box>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Місце проживання вступника"
              sx={stylesMui.divider}
            />
            <FormikDropdown
              size={FieldSize.LARGE}
              options={REGIONS}
              label="Регіон"
              name="entrant.region"
              placeholder="виберіть зі списку"
            />
          </Box>
          {values.entrant.region !== kyiv && (
            <Box sx={stylesMui.item}>
              <Input
                name="entrant.settlement"
                placeholder="с. Пуків/м. Київ"
                label="Населений пункт"
              />
            </Box>
          )}
          <Box sx={stylesMui.item}>
            <Input
              name="entrant.address"
              label={`Адреса (зі скороченнями)`}
              placeholder="вул. Липова, буд.32 ,кв.1"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="entrant.index"
              label={`Поштовий індекс`}
              placeholder="12345"
            />
          </Box>

          {values.meta.isToAdmission &&
            values?.helper?.isAdult &&
            !values?.helper.hasCustomer && (
              <Box sx={stylesMui.item}>
                <Divider
                  textAlign={DividerTextAlign.LEFT}
                  text="Підтвердження даних"
                  sx={stylesMui.divider}
                />
                <Typography variant="h6Bold">
                  Зверніться до оператора
                </Typography>
                <Input
                  name="helper.secretNumber"
                  label="Секретний код"
                  placeholder="0000"
                />
              </Box>
            )}

          {values?.helper?.isAdult &&
            !values?.helper?.hasCustomer &&
            values?.meta?.isForcePushed && (
              <Box sx={stylesMui.item}>
                <Input
                  name="helper.forcePushedNumber"
                  label="Код форс пушу"
                  placeholder="0000"
                />
              </Box>
            )}

          <Actions
            onPrevStep={() => {
              if (form.current) onPrevStep(form.current.values);
            }}
            last={values?.helper?.isAdult && !values.helper.hasCustomer}
          />
        </Form>
      )}
    </Formik>
  );
};
