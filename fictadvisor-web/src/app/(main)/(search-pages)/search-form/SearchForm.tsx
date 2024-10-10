import { useMemo, useState } from 'react';
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
import { useQueryParams } from '@/hooks/use-query-params/useQueryParams';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

export interface SearchFormProps {
  filterDropDownOptions: DropDownOption[];
  searchPlaceholder: string;
  isSubject?: boolean;
  initialValues: SearchFormFields;
}

const SearchForm: FC<SearchFormProps> = ({
  filterDropDownOptions,
  searchPlaceholder,
  initialValues,
  isSubject = false,
}) => {
  const isTablet = useMediaQuery(theme.breakpoints.down('tablet'));
  const [collapsed, setCollapsed] = useState(false);

  const { updateQueryParams } = useQueryParams();

  // Initialize states from query params
  const initialSearch = initialValues.search || '';
  const initialGroupId = initialValues.groupId || '';
  const initialDisciplineTypes = initialValues.disciplineTypes || [];
  const initialCathedrasId = initialValues.cathedrasId || [];
  const initialSort = initialValues.sort || '';
  const initialOrder = initialValues.order || 'asc';

  const [search, setSearch] = useState(initialSearch);
  const [groupId, setGroupId] = useState(initialGroupId);
  const [disciplineTypesSelected, setDisciplineTypesSelected] = useState(
    initialDisciplineTypes,
  );
  const [cathedrasId, setCathedrasId] = useState<string[]>(initialCathedrasId);
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState(initialOrder);

  const { displayError } = useToastError();
  const { data: groupData, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
  });

  if (error) {
    displayError('Помилка завантаження груп');
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

  const handleGroupChange = (groupId: string) => {
    setGroupId(groupId);
    updateQueryParams({ groupId });
  };

  const handleDisciplineTypeChange = (event: SelectChangeEvent) => {
    console.log(event);
    const selected: CheckboxesDropdownOption[] = []; // Extract selected items based on your logic
    const selectedValues = selected.map(
      item => item.value as DisciplineTypeEnum,
    );
    setDisciplineTypesSelected(selectedValues);
    updateQueryParams({ disciplineTypes: selectedValues.join(','), page: '1' });
  };

  const handleCathedraChange = (event: SelectChangeEvent) => {
    console.log('first');
    const selectedValues = event.target.value as unknown as string[];

    updateQueryParams({ cathedrasId: selectedValues.join(','), page: '1' });
    setCathedrasId(selectedValues);
  };
  const handleSortChange = (sort: string) => {
    setSort(sort);
    updateQueryParams({ sort });
  };

  const handleOrderChange = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    updateQueryParams({ order: newOrder });
  };

  return (
    <div className={stylesScss['form']}>
      {/* <Input
        className={stylesScss['input']}
        size={InputSize.LARGE}
        type={InputType.SEARCH}
        name="search"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          updateQueryParams({ search: e.target.value });
        }}
        placeholder={searchPlaceholder}
        showRemark={false}
      /> */}
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
              onChange={e => handleGroupChange(e)}
              showRemark={false}
              value={groupId}
              options={groups}
            />
          </Box>
          {!isSubject && (
            <Box className={stylesScss['dropdown3']}>
              <CheckboxesDropdown
                label="Викладає"
                size={FieldSize.MEDIUM}
                handleChange={handleDisciplineTypeChange}
                values={disciplineTypes}
                selected={disciplineTypesSelected.map(disciplineType => ({
                  label: '',
                  value: disciplineType,
                }))}
              />
              <CheckboxesDropdown
                label="Кафедри"
                size={FieldSize.MEDIUM}
                handleChange={handleCathedraChange}
                values={cathedras}
                selected={cathedrasId.map(cathedra => ({
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
              onChange={e => handleSortChange(e)}
              showRemark={false}
              value={sort}
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
                order === 'asc' ? <BarsArrowDownIcon /> : <BarsArrowUpIcon />
              }
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default SearchForm;
