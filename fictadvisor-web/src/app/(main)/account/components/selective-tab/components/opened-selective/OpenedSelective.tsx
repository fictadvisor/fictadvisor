import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik, FormikValues } from 'formik';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import Checkbox from '@/components/common/ui/form/with-formik/checkbox';
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
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
  const { data, isLoading } = useQuery({
    queryKey: ['openedSelective', user, semester, year],
    queryFn: () =>
      UserAPI.getSelectiveDisciplines(user!.id, { year, semester }),
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  const handleSubmit = async (data: { [key: string]: boolean }) => {
    await UserAPI.postSelectiveDisciplines(user!.id, transformData(data));
    onSubmit();
  };

  const checkDisabled = (values: FormikValues, id: string) => {
    if (values[id] === true) return false;
    const numberOfChecked = Object.values(values).filter(value => value).length;
    return numberOfChecked >= Number(data?.availableSelectiveAmount);
  };

  if (isLoading) {
    return <LoadPage />;
  }

  return (
    <>
      {
        <Box sx={styles.wrapper}>
          <Typography variant="h6" sx={styles.text}>{`${
            semesterMap[semester]
          } семестр ${year}-${year + 1} `}</Typography>
          {data?.remainingSelectives ? (
            <Typography variant="h6Bold" sx={styles.text}>
              Обери {data.availableSelectiveAmount} предмети, які є твоїми
              вибірковими на цей семестр
            </Typography>
          ) : (
            <Typography variant="h6Bold" sx={styles.text}>
              Наразі обирати предмети на цей семестр не можна.
            </Typography>
          )}
          {data?.remainingSelectives && (
            <Formik
              initialValues={{ ...getInitialValues(data.remainingSelectives) }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <Box sx={styles.disciplines}>
                    {data.remainingSelectives.map(discipline => (
                      <Checkbox
                        key={discipline.disciplineId}
                        name={discipline.disciplineId}
                        label={discipline.subjectName}
                        sx={styles.checkbox}
                        disabled={checkDisabled(
                          values,
                          discipline.disciplineId,
                        )}
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
          )}
        </Box>
      }
    </>
  );
};

export default OpenedSelective;
