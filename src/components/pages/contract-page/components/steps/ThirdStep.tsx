import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';

import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import { Actions } from '@/components/pages/contract-page/components/Actions';
import { kyiv } from '@/components/pages/contract-page/constants';
import { REGIONS } from '@/components/pages/contract-page/constants';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import { saveLocalStorage } from '@/components/pages/contract-page/utils/localStorage';
import {
  representativeOptionalValidation,
  representativeValidation,
} from '@/components/pages/contract-page/validation';
import useTabClose from '@/hooks/use-tab-close';
import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';

import { CheckBox } from '../../components/CheckBox';
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
        isForcePushed
          ? representativeOptionalValidation
          : representativeValidation
      }
    >
      {({ values, isValid, touched, setValues }) => (
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
            <CheckBox
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

            <CheckBox
              name="helper.representativeHasOldPassport"
              label="Паспорт старого зразка"
              onClick={() =>
                setValues({
                  ...values,
                  helper: {
                    ...values.helper,
                    representativeHasForeignPassport: false,
                  },
                })
              }
            />

            <CheckBox
              name="helper.representativeHasForeignPassport"
              label="Закордонний паспорт"
              onClick={() =>
                setValues({
                  ...values,
                  helper: {
                    ...values.helper,
                    representativeHasOldPassport: false,
                  },
                })
              }
            />

            {values?.helper?.representativeHasForeignPassport ||
            values?.helper?.representativeHasOldPassport ? (
              <Input
                name="representative.passportSeries"
                label="Серія паспорту"
              />
            ) : (
              <Input
                name="representative.passportSeries"
                label="Серія паспорту"
                disabled
                resetOnDisabled
              />
            )}

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
            <CheckBox
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
            last={!values?.helper?.isAdult}
            isFormValid={touched && isValid}
          />
        </Form>
      )}
    </Formik>
  );
};
