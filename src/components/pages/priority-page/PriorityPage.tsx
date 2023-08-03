import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
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
import { preparePriorityData } from '@/components/pages/priority-page/utils';
import { validationSchema } from '@/components/pages/priority-page/validation';
import useToast from '@/hooks/use-toast';
import { PriorityData } from '@/lib/api/contract/types/ContractBody';

const PriorityPage: FC = () => {
  const [submited, setSubmited] = useState(false);

  const toast = useToast();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: PriorityData) => {
        preparePriorityData(values);
        if (
          values.specialty === '121' &&
          values.priorities[1] === values.priorities[2]
        ) {
          toast.error('Помилка в пріоритетах');
          setSubmited(false);
          return;
        }
        if (values.specialty === '126') {
          for (let i = 1; i <= 3; i++) {
            // if (values.priorities[i] === values.priorities[i + 1]) {
            //   toast.error('Помилка в пріоритетах');
            //   setSubmited(false);
            //   return;
            // }
          }
        }

        console.log(values);
        // ContractAPI.createPriority(values);
        setSubmited(true);
      }}
    >
      {({ values, isValid, isSubmitting }) => (
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
            <Typography variant="h6Bold">Освітні програми</Typography>
            {values.specialty === '121' && (
              <Box sx={stylesMui.item}>
                <FormikDropdown
                  name="priorities.1"
                  options={IPeduPrograms}
                  size={FieldSize.LARGE}
                  label="Перший пріоритет"
                  placeholder="виберіть зі списку"
                />
                <FormikDropdown
                  name="priorities.2"
                  options={IPeduPrograms}
                  size={FieldSize.LARGE}
                  label="Перший пріоритет"
                  placeholder="виберіть зі списку"
                />
              </Box>
            )}
            {values.specialty === '126' && (
              <Box sx={stylesMui.item}>
                <FormikDropdown
                  options={ISTeduPrograms}
                  name="priorities.1"
                  size={FieldSize.LARGE}
                  label="Перший пріоритет"
                  placeholder="виберіть зі списку"
                />
                <FormikDropdown
                  name="priorities.2"
                  options={ISTeduPrograms}
                  size={FieldSize.LARGE}
                  label="Другий пріоритет"
                  placeholder="виберіть зі списку"
                />
                <FormikDropdown
                  name="priorities.3"
                  options={ISTeduPrograms}
                  size={FieldSize.LARGE}
                  label="Третій пріоритет"
                  placeholder="виберіть зі списку"
                />
              </Box>
            )}
          </Box>
          <Box sx={{ gap: '24px' }}>
            <Divider
              textAlign={DividerTextAlign.LEFT}
              text="Дані про вступника"
            />
            <Input name="lastName" placeholder="Шевченко" label="Прізвище" />
            <Input name="firstName" placeholder="Тарас" label="Ім'я" />
            <Input
              name="middleName"
              placeholder="Григорович"
              label="По-батькові"
            />
          </Box>
          <Divider
            textAlign={DividerTextAlign.LEFT}
            text="Дата заповнення"
            sx={{ marginBottom: '12px' }}
          />
          <Box sx={stylesMui.item}>
            <Input name="day" label="Число (день місяця)" placeholder="21" />
            <CheckBox name="isToAdmission" label="Подаю документи в корпусі" />
            {!values.isToAdmission ? (
              <Input
                name="email"
                placeholder="smthcool@gmail.com"
                label="Електронна пошта вступника"
              />
            ) : (
              <Box sx={stylesMui.item}>
                <Divider
                  textAlign={DividerTextAlign.LEFT}
                  text="Підтвердження даних"
                  sx={stylesMui.divider}
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
