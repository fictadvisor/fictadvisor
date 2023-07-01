import { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikValues } from 'formik';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Checkbox } from '@/components/common/ui/form';
import useAuthentication from '@/hooks/use-authentication';
import UserAPI from '@/lib/api/user/UserAPI';

import * as styles from './OpenedSelective.styles';
import { getInitialValues, transformData } from './utils';

interface OpenedSelectiveProps {
  semester: 1 | 2;
  year: number;
  onSubmit: () => void;
}

const semesterMap = {
  1: 'I',
  2: 'II',
};

const OpenedSelective: FC<OpenedSelectiveProps> = ({
  semester,
  year,
  onSubmit,
}) => {
  const { user } = useAuthentication();
  const { data } = useQuery(
    ['openedSelective', user.id, semester, year],
    () => UserAPI.getSelectiveDisciplines(user.id, year, semester),
    { refetchOnWindowFocus: false },
  );

  // TODO: refactor this shit
  const handleSubmit = async (data: { [key: string]: boolean }) => {
    await UserAPI.postSelectiveDisciplines(user.id, transformData(data));
    onSubmit();
  };

  const checkDisabled = (values: FormikValues, id: string) => {
    if (values[id] === true) return false;
    const numberOfChecked = Object.values(values).filter(value => value).length;
    return numberOfChecked >= Number(data?.availableSelectiveAmount);
  };

  return (
    <>
      {data && (
        <Box sx={styles.wrapper}>
          <Typography
            variant="h6Bold"
            sx={styles.text}
          >{`${semesterMap[semester]} семестр ${year}`}</Typography>
          <Typography variant="h6Bold" sx={styles.text}>
            Обери {data.availableSelectiveAmount} предмети, які є твоїми
            вибірковими на цей семестр
          </Typography>
          <Formik
            initialValues={{ ...getInitialValues(data.remainingSelective) }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <Box sx={styles.disciplines}>
                  {data.remainingSelective.map(discipline => (
                    <Checkbox
                      key={discipline.disciplineId}
                      name={discipline.disciplineId}
                      label={discipline.subjectName}
                      sx={styles.checkbox}
                      disabled={checkDisabled(values, discipline.disciplineId)}
                    />
                  ))}
                </Box>
                <Button
                  size={ButtonSize.SMALL}
                  text="Зберегти"
                  type="submit"
                  sx={styles.button}
                />
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </>
  );
};

export default OpenedSelective;
