import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';

import { Actions } from '@/app/(admission)/_contract/components/Actions';
import { kyiv } from '@/app/(admission)/_contract/constants';
import { REGIONS } from '@/app/(admission)/_contract/constants';
import * as stylesMui from '@/app/(admission)/_contract/ContractPage.styles';
import { saveLocalStorage } from '@/app/(admission)/_contract/utils/localStorage';
import {
  representativeOptionalValidation,
  representativeValidation,
} from '@/app/(admission)/_contract/validation/representative';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
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
export const ThirdStep: FC<ThirdStepProps> = ({
  onPrevStep,
  onNextStep,
  data,
  isForcePushed,
}) => {
  const handleSubmit = (values: ExtendedContractBody) => {
    onNextStep(values, !values?.helper?.isAdult && !values.helper.hasCustomer);
  };

  const form = useRef<FormikProps<ExtendedContractBody>>(null);

  useTabClose(() => {
    if (form?.current?.values) {
      saveLocalStorage(form?.current?.values);
    }
  });

  return (
    <Formik
      onSubmit={values => {
        handleSubmit(values);
      }}
      innerRef={form}
      initialValues={data}
      validationSchema={
        isForcePushed
          ? representativeOptionalValidation
          : representativeValidation
      }
    >
      {({ values }) => (
        <Form>
          <Typography variant="h4Bold">Інформація про представника</Typography>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Особисті дані представника"
              sx={stylesMui.divider}
            />
            <Input
              name="representative.lastName"
              placeholder="Шевченко"
              label="Прізвище"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="representative.firstName"
              placeholder="Тарас"
              label="Ім’я"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Checkbox
              name="helper.representativeHasNoMiddleName"
              label="Немає по-батькові"
            />
            {values?.helper?.representativeHasNoMiddleName ? (
              <Input
                name="representative.middleName"
                disabled={true}
                resetOnDisabled
                placeholder={'Григорович'}
                label={`По-батькові`}
              />
            ) : (
              <Input
                name="representative.middleName"
                disabled={false}
                placeholder={'Григорович'}
                label={`По-батькові`}
              />
            )}
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="representative.phoneNumber"
              placeholder="+9970951234567"
              label="Номер телефону"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="representative.email"
              placeholder="smthcool@gmail.com"
              label="Електронна пошта"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Паспортні дані представника"
              sx={stylesMui.divider}
            />

            <FormikRadioGroup
              name="helper.representativePassportType"
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
              {values?.helper?.representativePassportType !==
                PassportType.ID && (
                <Input
                  clearOnUnmount
                  name="representative.passportSeries"
                  label="Серія паспорту"
                />
              )}
            </Box>

            <Input
              name="representative.passportNumber"
              label="Номер паспорту"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="representative.passportDate"
              label="Дата видачі паспорту"
              placeholder="25.07.2017"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="representative.passportInstitute"
              label="Орган видачі паспорту"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Checkbox
              name="helper.representativeHasNoCode"
              label="Відмова від РНОКПП"
            />
            {values?.helper?.representativeHasNoCode ? (
              <Input
                name="representative.idCode"
                disabled={true}
                resetOnDisabled
                label="Ідентифікаційний код"
              />
            ) : (
              <Input
                name="representative.idCode"
                disabled={false}
                label="Ідентифікаційний код"
              />
            )}
          </Box>
          <Box sx={stylesMui.item}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Місце проживання представника"
              sx={stylesMui.divider}
            />
            <FormikDropdown
              size={FieldSize.LARGE}
              options={REGIONS}
              label="Регіон"
              name="representative.region"
              placeholder="виберіть зі списку"
            />
          </Box>
          {values.representative.region !== kyiv && (
            <Box sx={stylesMui.item}>
              <Input
                name="representative.settlement"
                placeholder="с. Пуків/м. Київ"
                label="Населений пункт"
              />
            </Box>
          )}
          <Box sx={stylesMui.item}>
            <Input
              name="representative.address"
              label={`Адреса (зі скороченнями)`}
              placeholder="вул. Липова, буд.32 ,кв.1"
            />
          </Box>
          <Box sx={stylesMui.item}>
            <Input
              name="representative.index"
              label="Поштовий індекс"
              placeholder="12345"
            />
          </Box>

          {values.meta.isToAdmission && !values.helper.hasCustomer && (
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

          {values?.meta?.isForcePushed &&
            !values.helper.isAdult &&
            !values.helper.hasCustomer && (
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
            last={!values?.helper?.isAdult && !values.helper.hasCustomer}
          />
        </Form>
      )}
    </Formik>
  );
};
