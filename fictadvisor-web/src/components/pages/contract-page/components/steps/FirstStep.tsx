import React, { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Form, Formik, FormikProps } from 'formik';

import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import { metaValidationSchema } from '@/components/pages/contract-page/validation/meta';
import useTabClose from '@/hooks/use-tab-close';
import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';
import {
  EducationalProgramType,
  MasterEducationProgram,
  PaymentTypeParam,
  StudyDegree,
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
    if (
      values.meta.educationalProgram === MasterEducationProgram.CIS ||
      values.meta.educationalProgram === MasterEducationProgram.CS ||
      values.meta.educationalProgram === MasterEducationProgram.IS
    ) {
      values.meta.speciality = '121';
    }
    if (values.meta.educationalProgram === MasterEducationProgram.CSN) {
      values.meta.speciality = '123';
    }
    if (
      values.meta.educationalProgram === MasterEducationProgram.ISRS ||
      values.meta.educationalProgram === MasterEducationProgram.IIS ||
      values.meta.educationalProgram === MasterEducationProgram.IMST
    ) {
      values.meta.speciality = '126';
    }
    if (values.meta.degree === StudyDegree.MASTER) {
      values.helper.isAdult = true;
    }
    if (values.meta.studyType === StudyTypeParam.BUDGET) {
      values.helper.hasCustomer = false;
    }
    if (values.meta.degree === StudyDegree.BACHELOR) {
      values.meta.educationalProgram = '';
      values.meta.programType = '';
    }
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
                На який освітній рівень вступаю (бакалавр/магістр)
              </Typography>
              <FormikRadioGroup
                name="meta.degree"
                options={[
                  { label: 'Бакалавр', value: StudyDegree.BACHELOR },
                  { label: 'Магістр', value: StudyDegree.MASTER },
                ]}
              />
            </Box>

            {values.meta.degree === StudyDegree.BACHELOR ? (
              <>
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
                    <Checkbox
                      name="meta.isToAdmission"
                      label="Формую договір в корпусі (*)"
                    />
                  </Box>
                  <Box sx={stylesMui.item}>
                    <Checkbox
                      name="helper.isAdult"
                      label="Є 18 років"
                      onClick={() => setIsAdult(!values.helper.isAdult)}
                    />
                  </Box>
                  <Box sx={stylesMui.item}>
                    <Checkbox
                      name="meta.isForcePushed"
                      label="Надіслати примусово (НЕ НАТИСКАТИ)"
                      onClick={handleCheck}
                    />
                  </Box>
                  {values.meta.studyType === StudyTypeParam.CONTRACT && (
                    <Box sx={stylesMui.item}>
                      <Checkbox
                        name="helper.hasCustomer"
                        label={'Обрати іншого замовника (**)'}
                        onClick={() => setHasCustomer(pr => !pr)}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={stylesMui.item}>
                  <Typography fontSize={'11px'}>
                    *На момент формування пріоритетки/договору ти перебуваєш в
                    корпусі, щоб заповнення даних зміг перевірити один з
                    представників відбіркової комісії
                  </Typography>
                  {values.meta.studyType === StudyTypeParam.CONTRACT && (
                    <Typography fontSize={'11px'}>
                      **Замовник - особа, яка оплачує контракт. За замовчуванням
                      замовник вважається вступником, якщо вступник
                      неповнолітній - замовником вважають законного
                      представника. За бажанням, можна змінити замовника
                    </Typography>
                  )}
                </Box>
              </>
            ) : (
              <>
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
                    Тип освітньої програми
                  </Typography>
                  <FormikRadioGroup
                    name="meta.programType"
                    options={[
                      {
                        value: EducationalProgramType.PROFESSIONAL,
                        label: 'Професійна',
                      },
                      {
                        value: EducationalProgramType.SCIENTIFIC,
                        label: 'Наукова',
                      },
                    ]}
                  />
                </Box>
                {values.meta.programType ===
                  EducationalProgramType.SCIENTIFIC && (
                  <Box sx={stylesMui.item}>
                    <Typography variant="h6Bold">Освітня програма</Typography>
                    <FormikRadioGroup
                      name="meta.educationalProgram"
                      options={[
                        {
                          value: MasterEducationProgram.CIS,
                          label:
                            "121 Інженерія програмного забезпечення комп'ютерних та інформаційних систем",
                        },
                        {
                          value: MasterEducationProgram.CSN,
                          label: "123 Комп'ютерні системи та мережі",
                        },
                        {
                          value: MasterEducationProgram.IMST,
                          label:
                            '126 Інформаційні управляючі системи та технології',
                        },
                      ]}
                    />
                  </Box>
                )}
                {values.meta.programType ===
                  EducationalProgramType.PROFESSIONAL && (
                  <Box sx={stylesMui.item}>
                    <Typography variant="h6Bold">Освітня програма</Typography>
                    <FormikRadioGroup
                      name="meta.educationalProgram"
                      options={[
                        {
                          value: MasterEducationProgram.IS,
                          label:
                            '121 Інженерія програмного забезпечення інформаційних систем',
                        },
                        {
                          value: MasterEducationProgram.CS,
                          label:
                            "121 Інженерія програмного забезпечення комп'ютерних систем",
                        },
                        {
                          value: MasterEducationProgram.CSN,
                          label: "123 Комп'ютерні системи та мережі",
                        },
                        {
                          value: MasterEducationProgram.IMST,
                          label:
                            '126 Інформаційні управляючі системи та технології',
                        },
                        {
                          value: MasterEducationProgram.IIS,
                          label: '126 Інтегровані інформаційні системи',
                        },
                        {
                          value: MasterEducationProgram.ISRS,
                          label:
                            '126 Інформаційне забезпечення робототехнічних систем',
                        },
                      ]}
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
                <Box>
                  <Box sx={stylesMui.item}>
                    <Checkbox
                      name="meta.isToAdmission"
                      label="Формую договір в корпусі (*)"
                    />
                  </Box>
                  <Box sx={stylesMui.item}>
                    <Checkbox
                      name="meta.isForcePushed"
                      label="Надіслати примусово (НЕ НАТИСКАТИ)"
                      onClick={handleCheck}
                    />
                  </Box>
                  {values.meta.studyType === StudyTypeParam.CONTRACT && (
                    <Box sx={stylesMui.item}>
                      <Checkbox
                        name="helper.hasCustomer"
                        label={'Обрати іншого замовника (**)'}
                        onClick={() => setHasCustomer(pr => !pr)}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={stylesMui.item}>
                  <Typography fontSize={'11px'}>
                    *На момент формування пріоритетки/договору ти перебуваєш в
                    корпусі, щоб заповнення даних зміг перевірити один з
                    представників відбіркової комісії
                  </Typography>
                  {values.meta.studyType === StudyTypeParam.CONTRACT && (
                    <Typography fontSize={'11px'}>
                      **Замовник - особа, яка оплачує контракт. За замовчуванням
                      замовник вважається вступником, якщо вступник
                      неповнолітній - замовником вважають законного
                      представника. За бажанням, можна змінити замовника
                    </Typography>
                  )}
                </Box>
              </>
            )}
            <Actions first />
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
