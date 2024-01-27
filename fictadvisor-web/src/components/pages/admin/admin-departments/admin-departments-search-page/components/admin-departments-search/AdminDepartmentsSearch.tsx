import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import { AdminDepartmentSearchFields } from '@/components/pages/admin/admin-departments/admin-departments-search-page/components/admin-departments-search/types';
import { AdminDepartmentsInitialValues } from '@/components/pages/admin/admin-departments/admin-departments-search-page/constants/AdminDepartmentsInitialValues';
import { AdminDepartmentsSortOptions } from '@/components/pages/admin/admin-departments/admin-departments-search-page/constants/AdminDepartmentsSortOptions';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';

import * as styles from './AdminDepartmentsSearch.styles';

interface AdminDepartmentSearchProps {
  onSubmit: (values: AdminDepartmentSearchFields) => void;
}

const AdminDepartmentsSearch: FC<AdminDepartmentSearchProps> = ({
  onSubmit,
}) => {
  const [values, setValues] = useState<AdminDepartmentSearchFields>(
    AdminDepartmentsInitialValues,
  );
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [divisions, setDivisions] = useState<CheckboxesDropdownOption[]>([]);
  const toast = useToastError();

  const handleFormSubmit = () => {
    const newFaculties = divisions.map(division => division.id) as string[];
    setValues({
      ...values,
      search,
      order,
      sort,
      divisions: newFaculties,
    });
    onSubmit(values);
  };

  useEffect(() => {
    handleFormSubmit();
  }, [search, order, sort, divisions]);

  const { data, isLoading } = useQuery(
    'cathedras',
    () => CathedraAPI.getAll(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error.response?.data.message);
        }
      },
    },
  );

  if (isLoading || !data) return <div>Loading...</div>;

  const facultyOptions = new Set<string>();
  data.cathedras.map(cathedra => facultyOptions.add(cathedra.division));
  const faculties = Array.from(facultyOptions).map(faculty => ({
    label: faculty,
    value: faculty,
    id: faculty,
  }));
  const handleOrderChange = () => {
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleFacultiesChange = (event: SelectChangeEvent) => {
    setDivisions(
      faculties.filter(faculty => event.target.value.includes(faculty.value)),
    );
  };

  return (
    <form>
      <Box sx={styles.header}>
        <Box sx={styles.filterBar}>
          <Box>
            <Input
              value={search}
              onChange={setSearch}
              onDeterredChange={() => handleFormSubmit()}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
              sx={styles.input}
            />
          </Box>
          <Divider orientation="vertical" sx={styles.divider} />
          <CheckboxesDropdown
            dropdownSx={styles.dropdown}
            label="Факультети"
            values={faculties}
            selected={divisions}
            size={FieldSize.MEDIUM}
            handleChange={handleFacultiesChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '150px' }}
          />
          <Divider orientation="vertical" sx={styles.divider} />
          <Dropdown
            dropdownSx={styles.dropdown}
            disableClearable
            placeholder="Сортувати за"
            size={FieldSize.MEDIUM}
            options={AdminDepartmentsSortOptions}
            showRemark={false}
            onChange={handleSortChange}
            value={sort}
            label="Сортувати за"
          />
          <Box>
            <IconButton
              onClick={handleOrderChange}
              shape={IconButtonShape.SQUARE}
              color={IconButtonColor.SECONDARY}
              size={IconButtonSize.LARGE}
              icon={
                values.order === 'asc' ? (
                  <BarsArrowDownIcon />
                ) : (
                  <BarsArrowUpIcon />
                )
              }
            />
          </Box>
        </Box>
        <Button
          size={ButtonSize.MEDIUM}
          text="Створити"
          href="/admin/departments/create"
          sx={styles.button}
        />
      </Box>
    </form>
  );
};

export default AdminDepartmentsSearch;
