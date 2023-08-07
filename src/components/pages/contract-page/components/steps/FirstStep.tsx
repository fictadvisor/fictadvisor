import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Form, Formik, FormikProps } from 'formik';

import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import { CheckBox } from '@/components/pages/contract-page/components/CheckBox';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import { metaValidationSchema } from '@/components/pages/contract-page/validation';
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
}
export const FirstStep: FC<FirstStepProps> = ({
  onNextStep,
  data,
  setIsForcePushed,
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
      {({ values }) => (
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
            {/*{values.meta.studyType === StudyTypeParam.CONTRACT && (*/}
            {/*  <Box sx={stylesMui.item}>*/}
            {/*    <Typography variant="h6Bold">*/}
            {/*      Оплата(Щосеместрово/Щоквартально)*/}
            {/*    </Typography>*/}
            {/*    <FormikRadioGroup*/}
            {/*      name="meta.paymentType"*/}
            {/*      options={[*/}
            {/*        {*/}
            {/*          value: PaymentTypeParam.EVERY_SEMESTER,*/}
            {/*          label: 'Щосеместрово',*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: PaymentTypeParam.EVERY_YEAR,*/}
            {/*          label: 'Щорічно',*/}
            {/*        },*/}
            {/*      ]}*/}
            {/*      clearValueOnUnmount*/}
            {/*    />*/}
            {/*  </Box>*/}
            {/*)}*/}
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
                  label="Формую договір в корпусі"
                />
              </Box>
              <Box sx={stylesMui.item}>
                <CheckBox name="helper.isAdult" label="Є 18 років" />
              </Box>
              <Box sx={stylesMui.item}>
                <CheckBox
                  name="meta.isForcePushed"
                  label="Надіслати примусово (НЕ НАТИСКАТИ)"
                  onClick={handleCheck}
                />
              </Box>
            </Box>

            <Actions first />
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
