import { FormEvent, Fragment, useRef } from 'react';
import { Stack } from '@mui/system';
import { Form, Formik, FormikProps } from 'formik';

import { CheckboxColor } from '@/components/common/ui/form/checkbox/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import useAuthentication from '@/hooks/use-authentication';
import { Checkboxes, useSchedule } from '@/store/schedule/useSchedule';

import * as styles from './CheckBoxSection.styles';

export const CheckBoxSection = () => {
  const [groupId, checkboxes, updateCheckboxes] = useSchedule(state => [
    state.groupId,
    state.checkboxes,
    state.updateCheckboxes,
  ]);

  const { user } = useAuthentication();

  const handleValuesChange = (event: FormEvent<HTMLFormElement>) => {
    const values = form?.current?.values as Checkboxes;
    updateCheckboxes(values);
  };

  const form = useRef<FormikProps<Checkboxes>>(null);

  return (
    <Formik initialValues={checkboxes} onSubmit={() => {}} innerRef={form}>
      <Form
        onChange={event => setTimeout(() => handleValuesChange(event), 0)}
        style={{ alignSelf: 'flex-start' }}
      >
        <Stack sx={styles.checkboxes}>
          {user && user.group?.id === groupId && (
            <Fragment>
              <Checkbox
                label={'Інша подія'}
                name={'otherEvents'}
                color={CheckboxColor.EVENT}
              />
              <Checkbox
                label={'Мої вибіркові'}
                color={CheckboxColor.PRIMARY}
                name={'isSelective'}
              />
            </Fragment>
          )}
          <Checkbox
            label={'Лекція'}
            name={'addLecture'}
            color={CheckboxColor.LECTURE}
          />
          <Checkbox
            label={'Практика'}
            name={'addPractice'}
            color={CheckboxColor.PRACTICE}
          />
          <Checkbox
            label={'Лабораторна'}
            name={'addLaboratory'}
            color={CheckboxColor.LAB}
          />
        </Stack>
      </Form>
    </Formik>
  );
};
