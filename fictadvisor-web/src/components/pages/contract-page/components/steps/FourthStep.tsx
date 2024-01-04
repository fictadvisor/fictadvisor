import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';

import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import { Actions } from '@/components/pages/contract-page/components/Actions';
import { kyiv } from '@/components/pages/contract-page/constants';
import { REGIONS } from '@/components/pages/contract-page/constants';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import { saveLocalStorage } from '@/components/pages/contract-page/utils/localStorage';
import {
  customerOptionalValidation,
  customerValidation,
} from '@/components/pages/contract-page/validation/customer';
import useTabClose from '@/hooks/use-tab-close';
import {
  ExtendedContractBody,
  PassportType,
} from '@/lib/api/contract/types/ContractBody';
export interface ThirdStepProps {
  onNextStep: (data: ExtendedContractBody, last: boolean) => void;
  onPrevStep: (data: ExtendedContractBody) => void;
  data: ExtendedContractBody;
  isForcePushed: boolean;
}
export const FourthStep: FC<ThirdStepProps> = ({
  onPrevStep,
  onNextStep,
  data,
  isForcePushed,
}) => {
  const handleSubmit = (values: ExtendedContractBody) => {
    onNextStep(values, true);
  };

  const form = useRef<FormikProps<ExtendedContractBody>>(null);

  useTabClose(() => {
    if (form?.current?.values) {
      saveLocalStorage(form?.current?.values);
    }
  });

  return (
    <Formik
      innerRef={form}
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={
        isForcePushed ? customerOptionalValidation : customerValidation
      }
    >
      {({ values }) => (
        <Form>
          <Typography variant="h4Bold">Інформація про замовника</Typography>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Особисті дані замовника"
              sx={stylesMui.divider}
            />
            <Input
              name="customer.lastName"
              placeholder="Шевченко"
              label="Прізвище"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input name="customer.firstName" placeholder="Тарас" label="Ім’я" />
          </Box>
          <Box sx={stylesMui.item}>
            <Checkbox
              name="helper.customerHasNoMiddleName"
              label="Немає по-батькові"
            />
            {values?.helper?.customerHasNoMiddleName ? (
              <Input
                name="customer.middleName"
                disabled={true}
                resetOnDisabled
                placeholder={'Григорович'}
                label={`По-батькові`}
              />
            ) : (
              <Input
                name="customer.middleName"
                disabled={false}
                placeholder={'Григорович'}
                label={`По-батькові`}
              />
            )}
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="customer.phoneNumber"
              placeholder="+9970951234567"
              label="Номер телефону"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="customer.email"
              placeholder="smthcool@gmail.com"
              label="Електронна пошта"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Паспортні дані замовника"
              sx={stylesMui.divider}
            />

            <FormikRadioGroup
              name="helper.customerPassportType"
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
              {values?.helper?.customerPassportType !== PassportType.ID && (
                <Input
                  clearOnUnmount
                  name="customer.passportSeries"
                  label="Серія паспорту"
                />
              )}
            </Box>

            <Input name="customer.passportNumber" label="Номер паспорту" />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="customer.passportDate"
              label="Дата видачі паспорту"
              placeholder="25.07.2017"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="customer.passportInstitute"
              label="Орган видачі паспорту"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Checkbox
              name="helper.customerHasNoCode"
              label="Відмова від РНОКПП"
            />
            {values?.helper?.customerHasNoCode ? (
              <Input
                name="customer.idCode"
                disabled={true}
                resetOnDisabled
                label="Ідентифікаційний код"
              />
            ) : (
              <Input
                name="customer.idCode"
                disabled={false}
                label="Ідентифікаційний код"
              />
            )}
          </Box>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Місце проживання замовника"
              sx={stylesMui.divider}
            />
            <FormikDropdown
              size={FieldSize.LARGE}
              options={REGIONS}
              label="Регіон"
              name="customer.region"
              placeholder="виберіть зі списку"
            />
          </Box>
          {values.customer.region !== kyiv && (
            <Box sx={stylesMui.item}>
              <Input
                name="customer.settlement"
                placeholder="с. Пуків/м. Київ"
                label="Населений пункт"
              />
            </Box>
          )}
          <Box sx={stylesMui.item}>
            <Input
              name="customer.address"
              label={`Адреса (зі скороченнями)`}
              placeholder="вул. Липова, буд.32 ,кв.1"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="customer.index"
              label="Поштовий індекс"
              placeholder="12345"
            />
          </Box>

          {values.meta.isToAdmission && (
            <Box sx={stylesMui.item}>
              <Divider
                textAlign={DividerTextAlign.LEFT}
                text="Підтвердження даних"
                sx={stylesMui.divider}
              />
              <Typography variant="h6Bold">Зверніться до оператора</Typography>
              <Input
                name="helper.secretNumber"
                label="Секретний код"
                placeholder="0000"
              />
            </Box>
          )}

          {values?.meta?.isForcePushed && (
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
            last
          />
        </Form>
      )}
    </Formik>
  );
};
