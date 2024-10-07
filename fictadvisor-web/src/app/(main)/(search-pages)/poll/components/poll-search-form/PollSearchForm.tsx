import { useCallback, useRef, useState } from 'react';
import { FC } from 'react';
import { QueryAllDisciplineTeacherForPollDTO } from '@fictadvisor/utils/requests';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Box, useMediaQuery } from '@mui/material';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';

import {
  Dropdown,
  Input,
  InputSize,
  InputType,
} from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import theme from '@/styles/theme';

import { disciplineTypes, filterOptions } from './constants';
import * as styles from './PollSearchForm.styles';

import stylesScss from './PollSearchForm.module.scss';

export interface PollSearchFormProps {
  onSubmit: (values: QueryAllDisciplineTeacherForPollDTO) => void;
  initialValues: QueryAllDisciplineTeacherForPollDTO;
  searchPlaceholder: string;
  localStorageName?: string;
}
const FormObserver = (props: { name?: string }) => {
  const { values } = useFormikContext();
  localStorage.setItem(props.name || '', JSON.stringify(values));
  return null;
};
const PollSearchForm: FC<PollSearchFormProps> = ({
  onSubmit,
  initialValues,
  searchPlaceholder,
  localStorageName,
}) => {
  const isTablet = useMediaQuery(theme.breakpoints.down('tablet'));
  const [collapsed, setCollapsed] = useState(false);

  const formikRef =
    useRef<FormikProps<QueryAllDisciplineTeacherForPollDTO>>(null);

  const handleTeacherDisciplineTypeChange = useCallback(
    (teacherDisciplineType: string) => {
      formikRef.current?.setFieldValue('disciplineType', teacherDisciplineType);
      formikRef.current?.handleSubmit();
    },
    [],
  );

  const handleSortChange = useCallback((sort: string) => {
    formikRef.current?.setFieldValue('sort', sort);
    formikRef.current?.handleSubmit();
  }, []);

  const handleOrderChange = useCallback(() => {
    const order = formikRef.current?.values.order;
    formikRef.current?.setFieldValue('order', order === 'asc' ? 'desc' : 'asc');
    formikRef.current?.handleSubmit();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={formikRef}
    >
      {({ handleSubmit, values }) => (
        <Form className={stylesScss['form']}>
          <FormObserver name={localStorageName} />
          <Input
            onDeterredChange={handleSubmit}
            className={stylesScss['input']}
            size={InputSize.LARGE}
            type={InputType.SEARCH}
            name="search"
            placeholder={searchPlaceholder}
            showRemark={false}
          />
          <Box sx={styles.collapseBtn}>
            <IconButton
              sx={styles.collapseIcon}
              shape={IconButtonShape.SQUARE}
              color={IconButtonColor.SECONDARY}
              icon={collapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
              onClick={() => setCollapsed(pr => !pr)}
            />
          </Box>
          {(!collapsed || (!isTablet && collapsed)) && (
            <>
              <Box sx={styles.dropdown}>
                <CheckboxesDropdown
                  selected={
                    values.disciplineTypes
                      ? values.disciplineTypes.map(disciplineType => ({
                          value: disciplineType,
                          label: disciplineType,
                        }))
                      : []
                  }
                  handleChange={e => {
                    handleTeacherDisciplineTypeChange(e.target.value);
                  }}
                  size={FieldSize.MEDIUM}
                  values={disciplineTypes}
                  label="Викладає"
                />
              </Box>
              <Box sx={styles.dropdown}>
                <Dropdown
                  label="Сортувати за"
                  placeholder="Іменем"
                  onChange={handleSortChange}
                  showRemark={false}
                  value={values.sort!}
                  options={filterOptions}
                  disableClearable
                />
              </Box>
              <IconButton
                sx={styles.sortIcon}
                onClick={handleOrderChange}
                shape={IconButtonShape.SQUARE}
                color={IconButtonColor.SECONDARY}
                icon={
                  values.order === 'asc' ? (
                    <BarsArrowDownIcon />
                  ) : (
                    <BarsArrowUpIcon />
                  )
                }
              />
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PollSearchForm;
