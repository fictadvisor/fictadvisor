import React, { FC, useState } from 'react';
import { SortQACParam } from '@fictadvisor/utils/enums';
import { QueryAllCathedrasDTO } from '@fictadvisor/utils/requests';
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

import { AdminDepartmentsSortOptions } from '../../constants';

interface AdminDepartmentSearchProps {
  onSubmit: (values: QueryAllCathedrasDTO) => void;
  values: QueryAllCathedrasDTO;
  cathedras: Cathedra[];
}

const AdminDepartmentsSearch: FC<AdminDepartmentSearchProps> = ({
  onSubmit,
  values,
  cathedras,
}) => {
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'asc');
  const [sort, setSort] = useState<SortQACParam>(
    values.sort ?? SortQACParam.NAME,
  );

  const [divisions, setDivisions] = useState<CheckboxesDropdownOption[]>([]);

  const handleFormSubmit = () => {
    const newFaculties = divisions.map(division => division.id!);
    onSubmit({
      search,
      order,
      sort,
      divisions: newFaculties,
    });
  };

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
    setSort(value as SortQACParam);
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
              onDeterredChange={handleFormSubmit}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
              sx={stylesAdmin.input}
            />
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Box sx={{ width: '150px' }}>
            {
              <CheckboxesDropdown
                dropdownSx={{ width: '150px' }}
                label="Факультети"
                values={faculties}
                selected={divisions}
                size={FieldSize.MEDIUM}
                handleChange={handleFacultiesChange}
                menuSx={{
                  backgroundColor: 'backgroundDark.100',
                  width: '150px',
                }}
              />
            }
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Box>
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
          </Box>
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
