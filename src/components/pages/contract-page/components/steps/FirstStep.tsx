import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Form, Formik, FormikProps } from 'formik';

import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import { CheckBox } from '@/components/pages/contract-page/components/CheckBox';
import { CustomerCheckBox } from '@/components/pages/contract-page/components/CustomerCheckBox';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import { metaValidationSchema } from '@/components/pages/contract-page/validation/meta';
import useTabClose from '@/hooks/use-tab-close';
import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';
import {
  PaymentTypeParam,
  StudyFormParam,
  StudyTypeParam,
} from '@/types/contract';

import { saveLocalStorage } from '../../utils/localStorage';
import { Actions } from '../Actions';
export interface FirstStepProps {
  onNextStep: (data: ExtendedContractBody) => void;
  data: ExtendedContractBody;
  setIsForcePushed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdult: React.Dispatch<React.SetStateAction<boolean>>;
  setHasCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FirstStep: FC<FirstStepProps> = ({
  onNextStep,
  data,
  setIsForcePushed,
  setIsAdult,
  setHasCustomer,
}) => {
  const handleSubmit = (values: ExtendedContractBody) => {
    onNextStep(values);
  };

  const form = useRef<FormikProps<ExtendedContractBody>>(null);

  useTabClose(() => {
    if (form?.current?.values) {
      saveLocalStorage(form?.current?.values);
    }
  });

  const handleCheck = () => {
    setIsForcePushed(!form?.current?.values.meta.isForcePushed);
  };

  return (
    <Formik
      innerRef={form}
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={metaValidationSchema}
    >
      {({ values, setValues }) => (
        <Form>
          <Stack gap={'40px'}>
            <Box sx={stylesMui.item}>
              <Typography variant="h6Bold">
                Форма навчання (бюджет/контракт)
              </Typography>
              <FormikRadioGroup
                name="meta.studyType"
                options={[
                  { label: 'Бюджет', value: StudyTypeParam.BUDGET },
                  { label: 'Контракт', value: StudyTypeParam.CONTRACT },
                ]}
              />
            </Box>
            {values.meta.studyType === StudyTypeParam.CONTRACT && (
              <Box sx={stylesMui.item}>
                <Typography variant="h6Bold">
                  Оплата(Щосеместрово/Щоквартально)
                </Typography>
                <FormikRadioGroup
                  name="meta.paymentType"
                  options={[
                    {
                      value: PaymentTypeParam.EVERY_MONTH,
                      label: 'Щомісяця',
                    },
                    {
                      value: PaymentTypeParam.EVERY_SEMESTER,
                      label: 'Щосеместрово',
                    },
                    {
                      value: PaymentTypeParam.EVERY_YEAR,
                      label: 'Щороку',
                    },
                  ]}
                  clearValueOnUnmount
                  onChange={(event, value) => {
                    if (value === PaymentTypeParam.EVERY_MONTH) {
                      setValues({
                        ...values,
                        meta: { ...values.meta, isToAdmission: true },
                      });
                    }
                  }}
                />
              </Box>
            )}
            <Box sx={stylesMui.item}>
              <Typography variant="h6Bold">
                Форма навчання (денна/заочна)
              </Typography>
              <FormikRadioGroup
                name="meta.studyForm"
                options={[
                  { label: 'Денна', value: StudyFormParam.FULL_TIME },
                  { label: 'Заочна', value: StudyFormParam.PART_TIME },
                ]}
              />
            </Box>

            <Box sx={stylesMui.item}>
              <Typography variant="h6Bold">Спеціальність</Typography>
              <FormikRadioGroup
                name="meta.speciality"
                options={[
                  {
                    value: '121',
                    label: '121 Інженерія програмного забезпечення',
                  },
                  { value: '123', label: '123 Комп’ютерна інженерія' },
                  {
                    value: '126',
                    label: '126 Інформаційні системи та технології',
                  },
                ]}
              />
            </Box>

            <Box>
              <Box sx={stylesMui.item}>
                <CheckBox
                  name="meta.isToAdmission"
                  label="Формую договір в корпусі (*)"
                />
              </Box>
              <Box sx={stylesMui.item}>
                <CheckBox
                  name="helper.isAdult"
                  label="Є 18 років"
                  onClick={() => setIsAdult(!values.helper.isAdult)}
                />
              </Box>
              <Box sx={stylesMui.item}>
                <CheckBox
                  name="meta.isForcePushed"
                  label="Надіслати примусово (НЕ НАТИСКАТИ)"
                  onClick={handleCheck}
                />
              </Box>
              {values.meta.studyType === StudyTypeParam.CONTRACT && (
                <Box sx={stylesMui.item}>
                  <CustomerCheckBox
                    setHasCustomer={setHasCustomer}
                    prevCheckBoxState={values.helper.hasCustomer}
                  />
                </Box>
              )}
            </Box>

            <Box sx={stylesMui.item}>
              <Typography fontSize={'11px'}>
                *На момент формування пріоритетки/договору ви перебуваєте в
                корпусі, щоб заповнення даних зміг перевірити один з
                представників відбіркової комісії
              </Typography>
              {values.meta.studyType === StudyTypeParam.CONTRACT && (
                <Typography fontSize={'11px'}>
                  **Замовник - особа, яка оплачує контракт. За замовчуванням
                  замовник вважається вступником, якщо вступник неповнолітній -
                  замовником вважають законного представника. За бажанням, можна
                  змінити замовника
                </Typography>
              )}
            </Box>

            <Actions first />
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
