import React, { FC, useEffect, useState } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
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
import { Cathedra } from '@/types/cathedra';

import {
  AdminDepartmentsInitialValues,
  AdminDepartmentsSortOptions,
} from '../../constants';
import { AdminDepartmentSearchFields } from '../../types';

interface AdminDepartmentSearchProps {
  onSubmit: (values: AdminDepartmentSearchFields) => void;
  cathedras: Cathedra[];
}

const AdminDepartmentsSearch: FC<AdminDepartmentSearchProps> = ({
  onSubmit,
  cathedras,
}) => {
  const [values, setValues] = useState<AdminDepartmentSearchFields>(
    AdminDepartmentsInitialValues,
  );
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [divisions, setDivisions] = useState<CheckboxesDropdownOption[]>([]);

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

  const facultyOptions = new Set<string>();
  cathedras.map(cathedra => facultyOptions.add(cathedra.division));
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
      <Box sx={stylesAdmin.header}>
        <Box sx={stylesAdmin.filterBar}>
          <Box>
            <Input
              value={search}
              onChange={setSearch}
              onDeterredChange={() => handleFormSubmit()}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
              sx={stylesAdmin.input}
            />
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Box sx={{ width: '150px' }}>
            <CheckboxesDropdown
              dropdownSx={{ width: '150px' }}
              label="Факультети"
              values={faculties}
              selected={divisions}
              size={FieldSize.MEDIUM}
              handleChange={handleFacultiesChange}
              menuSx={{ backgroundColor: 'backgroundDark.100', width: '150px' }}
            />
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Dropdown
            dropdownSx={{ width: '150px' }}
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
          sx={stylesAdmin.button}
        />
      </Box>
    </form>
  );
};

export default AdminDepartmentsSearch;
