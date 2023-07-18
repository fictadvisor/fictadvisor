import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { useQuery } from 'react-query';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';

import {
  Dropdown,
  Input,
  InputSize,
  InputType,
} from '@/components/common/ui/form';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { SearchFormFields } from './types';

import styles from './SearchForm.module.scss';

export interface SearchFormProps {
  onSubmit: (values: Partial<SearchFormFields>) => void;
  initialValues: SearchFormFields;
  filterDropDownOptions: DropDownOption[];
  searchPlaceholder: string;
  localStorageName?: string;
}

// TODO: refactor this shit
const FormObserver = (props: { name?: string }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    if (props.name) localStorage.setItem(props.name, JSON.stringify(values));
  }, [values, props.name]);
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
        <Form className={styles['form']}>
          <FormObserver name={localStorageName} />
          <Input
            onDeterredChange={handleSubmit}
            className={styles['input']}
            size={InputSize.LARGE}
            type={InputType.SEARCH}
            name="search"
            placeholder={searchPlaceholder}
            showRemark={false}
          />
          <div className={styles['collapse-btn']}>
            <IconButton
              className={styles['collapse-icon']}
              type="button"
              name="order"
              size={IconButtonSize.LARGE}
              shape={IconButtonShape.SQUARE}
              color={IconButtonColor.SECONDARY}
              icon={collapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
              onClick={() => setCollapsed(pr => !pr)}
            />
          </div>

          {!collapsed && (
            <>
              <div className={styles['dropdown-1']}>
                <Dropdown
                  placeholder="ІП-22"
                  label="Група"
                  onChange={handleGroupChange}
                  showRemark={false}
                  value={values.group}
                  options={groups}
                />
              </div>
              <div className={styles['dropdown-2']}>
                <Dropdown
                  label="Сортувати за"
                  placeholder="Іменем"
                  onChange={handleSortChange}
                  showRemark={false}
                  value={values.sort}
                  options={filterDropDownOptions}
                />
              </div>
              <div>
                <IconButton
                  className={styles['sort-icon']}
                  type="button"
                  onClick={handleOrderChange}
                  name="order"
                  size={IconButtonSize.LARGE}
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
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
