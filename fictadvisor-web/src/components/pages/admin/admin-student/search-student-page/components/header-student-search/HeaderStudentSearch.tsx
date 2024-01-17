'use client';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import { IconButtonShape } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonSize,
} from '@/components/common/ui/icon-button-mui/types';
import { Group } from '@/types/group';
import { UserGroupRole } from '@/types/user';

import { StudentSearchFormFields } from '../../../common/types/StudentSearch';
import { transformGroupsMulti } from '../../../common/utils/transformToOptions';
import { roleOptions, sortOptions } from '../../constants/Options';
import { StudentInitialValues } from '../../constants/StudentInitialValues';

import * as styles from './HeaderStudentSearch.styles';

export interface HeaderStudentSearchProps {
  onSubmit: (values: Partial<StudentSearchFormFields>) => void;
  groups: Group[];
}

const HeaderStudentSearch: FC<HeaderStudentSearchProps> = ({
  onSubmit,
  groups,
}) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('firstName');
  const [group, setGroup] = useState<string[]>([]);
  const [roles, setRoles] = useState<UserGroupRole[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] = useState(StudentInitialValues);

  const groupOptions = transformGroupsMulti(groups);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setValues(values => ({ ...values, search: value }));
  };
  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setValues(values => ({ ...values, order: order }));
  };
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setValues(values => ({
      ...values,
      sort: value as 'lastName' | 'firstName' | 'middleName',
    }));
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as UserGroupRole[];
    setRoles(value);
    setValues(values => ({ ...values, roles: value }));
  };
  const handleGroupChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    setGroup(value);
    setValues(values => ({ ...values, groups: value }));
  };

  useEffect(() => {
    onSubmit(values);
  }, [values]);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.filterBar}>
        <Box sx={styles.search}>
          <Input
            value={search}
            onChange={handleSearchChange}
            size={InputSize.MEDIUM}
            type={InputType.SEARCH}
            placeholder="Пошук"
            showRemark={false}
          />
        </Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.checkboxesDropdown}>
          <CheckboxesDropdown
            selected={group.map(state => ({
              label: state,
              value: state,
            }))}
            values={groupOptions}
            handleChange={handleGroupChange}
            label="Група"
            size={FieldSize.MEDIUM}
          />
        </Box>
        <Box sx={styles.checkboxesDropdown}>
          <CheckboxesDropdown
            selected={roles.map(state => ({
              label: state,
              value: state,
            }))}
            values={roleOptions}
            handleChange={handleRoleChange}
            placeholder="Роль"
            label="Роль"
            size={FieldSize.MEDIUM}
          />
        </Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.dropdown}>
          <Dropdown
            label="Сортування"
            size={FieldSize.MEDIUM}
            options={sortOptions}
            value={sortBy}
            onChange={handleSortByChange}
            showRemark={false}
            disableClearable
          />
        </Box>
        <IconButton
          onClick={handleOrderChange}
          shape={IconButtonShape.SQUARE}
          size={IconButtonSize.LARGE}
          color={IconButtonColor.SECONDARY}
          icon={order === 'asc' ? <BarsArrowDownIcon /> : <BarsArrowUpIcon />}
        />
      </Box>
      <Button
        size={ButtonSize.MEDIUM}
        text="Створити"
        href="/admin/students/create"
        sx={styles.button}
      />
    </Box>
  );
};
export default HeaderStudentSearch;
