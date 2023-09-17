import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { useQuery } from 'react-query';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';

import {
  Dropdown,
  Input,
  InputSize,
  InputType,
} from '@/components/common/ui/form';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import GroupAPI from '@/lib/api/group/GroupAPI';

import * as styles from './SearchForm.styles';
import { SearchFormFields } from './types';

import stylesScss from './SearchForm.module.scss';
export interface SearchFormProps {
  onSubmit: (values: Partial<SearchFormFields>) => void;
  initialValues: SearchFormFields;
  filterDropDownOptions: DropDownOption[];
  searchPlaceholder: string;
  localStorageName?: string;
}
const FormObserver = (props: { name?: string }) => {
  const { values } = useFormikContext();
  localStorage.setItem(props.name || '', JSON.stringify(values));
  return null;
};
const SearchForm: FC<SearchFormProps> = ({
  onSubmit,
  initialValues,
  filterDropDownOptions,
  searchPlaceholder,
  localStorageName,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: groupData } = useQuery('all-groups', GroupAPI.getAll, {
    staleTime: Infinity,
  });

  const groups: DropDownOption[] = useMemo(
    () => groupData?.groups.map(({ code, id }) => ({ label: code, id })) || [],
    [groupData?.groups],
  );

  // This is a temporary solution. It will be removed when we rewrite input component to be used without formik and get rid of formik in this case
  const formikRef = useRef<FormikProps<SearchFormFields>>(null);

  const handleGroupChange = useCallback((group: string) => {
    formikRef.current?.setFieldValue('group', group);
    formikRef.current?.handleSubmit();
  }, []);

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
          {!collapsed && (
            <>
              <Box sx={styles.dropdown1}>
                <Dropdown
                  placeholder="ІП-22"
                  label="Група"
                  onChange={handleGroupChange}
                  showRemark={false}
                  value={values.group}
                  options={groups}
                />
              </Box>
              <Box sx={styles.dropdown2}>
                <Dropdown
                  label="Сортувати за"
                  placeholder="Іменем"
                  onChange={handleSortChange}
                  showRemark={false}
                  value={values.sort}
                  options={filterDropDownOptions}
                />
              </Box>
              <Box>
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
              </Box>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
