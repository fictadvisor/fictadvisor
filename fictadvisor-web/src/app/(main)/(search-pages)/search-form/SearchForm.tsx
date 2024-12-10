import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FC } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Box, useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';

import {
  Dropdown,
  Input,
  InputSize,
  InputType,
} from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import theme from '@/styles/theme';

import { disciplineTypes } from '../poll/components/poll-search-form/constants';

import * as styles from './SearchForm.styles';
import { SearchFormFields } from './types';

import stylesScss from './SearchForm.module.scss';
export interface SearchFormProps {
  onSubmit: (values: Partial<SearchFormFields>) => void;
  setQueryObj: Dispatch<SetStateAction<SearchFormFields>>;
  filterDropDownOptions: DropDownOption[];
  searchPlaceholder: string;
  localStorageName: string;
  isSubject?: boolean;
  initialValues: SearchFormFields;
}
const FormObserver = ({ name }: { name: string }) => {
  const { values, dirty } = useFormikContext();
  useEffect(() => {
    if (localStorage && dirty) {
      localStorage.setItem(name || '', JSON.stringify(values));
    }
  }, [values, name]);
  return null;
};

// Important!!! SearchForm is currently used for searching both subjects and teachers.
// But, the thing is SubjectAPI and TeacherAPI have different getAll query parameters and since now
// one QueryAllDTO is a subset of another it is tolerable. However, in the future, that might
// change, so I think this component needs refactoring
const SearchForm: FC<SearchFormProps> = ({
  onSubmit,
  setQueryObj,
  filterDropDownOptions,
  searchPlaceholder,
  localStorageName,
  initialValues,
  isSubject = false,
}) => {
  const isTablet = useMediaQuery(theme.breakpoints.down('tablet'));
  const [collapsed, setCollapsed] = useState(false);

  const { displayError } = useToastError();
  const {
    data: groupData,
    isError,
    error,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    placeholderData: (previousData, previousQuery) => previousData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) {
    displayError(error);
  }

  const { data: cathedraData } = useQuery({
    queryKey: ['all-cathedra'],
    queryFn: () => CathedraAPI.getAll(),
    staleTime: Infinity,
  });

  const groups: DropDownOption[] = useMemo(
    () =>
      groupData?.groups.map(({ code, id }) => ({
        label: code,
        id,
      })) || [],
    [groupData?.groups],
  );

  const cathedras: CheckboxesDropdownOption[] = useMemo(
    () =>
      cathedraData?.cathedras.map(({ abbreviation, id }) => ({
        label: abbreviation,
        value: id,
      })) || [],
    [cathedraData?.cathedras],
  );

  // This is a temporary solution. It will be removed when we rewrite input component to be used without formik and get rid of formik in this case
  const formikRef = useRef<FormikProps<SearchFormFields>>(null);

  const handleGroupChange = useCallback((groupId: string) => {
    formikRef.current?.setFieldValue('groupId', groupId);
    formikRef.current?.handleSubmit();
  }, []);

  const handleRoleChange = useCallback(
    (event: SelectChangeEvent<string | []>) => {
      formikRef.current?.setFieldValue('roles', event.target.value);
      formikRef.current?.handleSubmit();
    },
    [],
  );

  const handleCathedraChange = useCallback(
    (event: SelectChangeEvent<string | []>) => {
      formikRef.current?.setFieldValue('cathedrasId', event.target.value);
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

  useEffect(() => {
    const parsedData = JSON.parse(
      localStorage.getItem(localStorageName) || '{}',
    );
    if (Object.keys(parsedData).length) {
      formikRef.current?.setValues(parsedData);
      setQueryObj(parsedData);
    }
  }, [localStorageName]);

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
              <Box className={stylesScss['dropdown1']}>
                <Dropdown
                  placeholder="ІП-22"
                  label="Група"
                  onChange={handleGroupChange}
                  showRemark={false}
                  value={values.groupId}
                  options={groups}
                />
              </Box>
              {!isSubject && (
                <Box className={stylesScss['dropdown3']}>
                  <CheckboxesDropdown
                    label="Викладає"
                    size={FieldSize.MEDIUM}
                    handleChange={handleRoleChange}
                    values={disciplineTypes}
                    selected={values.disciplineTypes.map(disciplineType => ({
                      label: '',
                      value: disciplineType,
                    }))}
                  />
                  <CheckboxesDropdown
                    label="Кафедри"
                    size={FieldSize.MEDIUM}
                    handleChange={handleCathedraChange}
                    values={cathedras}
                    selected={values.cathedrasId.map(cathedra => ({
                      label: '',
                      value: cathedra,
                    }))}
                  />
                </Box>
              )}
              <Box sx={styles.dropdown2(isSubject)}>
                <Dropdown
                  label="Сортувати за"
                  placeholder="Іменем"
                  onChange={handleSortChange}
                  showRemark={false}
                  value={values.sort}
                  options={filterDropDownOptions}
                  disableClearable={true}
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
