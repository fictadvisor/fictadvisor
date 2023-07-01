import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useQuery } from 'react-query';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Form, Formik, useFormikContext } from 'formik';

import {
  Dropdown,
  Input,
  InputSize,
  InputType,
} from '@/components/common/ui/form';
import {
  IconButton,
  IconButtonColor,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { SubjectSearchFormFields, TeacherSearchFormFields } from './types';

import styles from '../SearchPage.module.scss';

export interface SearchFormProps {
  onSubmit: (obj: SubjectSearchFormFields | TeacherSearchFormFields) => void;
  initialValues: SubjectSearchFormFields | TeacherSearchFormFields;
  filterDropDownOptions: { value: string; label: string }[];
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

export const SearchForm: FC<SearchFormProps> = ({
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, values, setFieldValue }) => (
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
                  onChange={handleSubmit}
                  showRemark={false}
                  name="group"
                  options={
                    groupData
                      ? groupData.groups.map(group => ({
                          label: group.code,
                          value: group.id,
                        }))
                      : []
                  }
                />
              </div>
              <div className={styles['dropdown-2']}>
                <Dropdown
                  label="Сортувати за"
                  placeholder="Іменем"
                  onChange={handleSubmit}
                  showRemark={false}
                  name="sort"
                  options={filterDropDownOptions}
                />
              </div>
              <div>
                <IconButton
                  className={styles['sort-icon']}
                  type="button"
                  onClick={() => {
                    setFieldValue(
                      'order',
                      values.order === 'asc' ? 'desc' : 'asc',
                    );
                    handleSubmit();
                  }}
                  name="order"
                  size={IconButtonSize.LARGE}
                  shape={IconButtonShape.SQUARE}
                  color={IconButtonColor.SECONDARY}
                  icon={
                    values.order !== 'asc' ? (
                      <BarsArrowUpIcon />
                    ) : (
                      <BarsArrowDownIcon />
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
