'use client';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { GroupRoles, SortQGSParam } from '@fictadvisor/utils/enums';
import { QueryAllStudentsDTO } from '@fictadvisor/utils/requests';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { transformGroupsMulti } from '@/app/admin/students/common/utils/transformToOptions';
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
import Progress from '@/components/common/ui/progress/Progress';
import GroupAPI from '@/lib/api/group/GroupAPI';

import {
  roleOptions,
  sortOptions,
  StudentInitialValues,
} from '../../constants';

import * as styles from './HeaderStudentSearch.styles';

export interface HeaderStudentSearchProps {
  onSubmit: (values: QueryAllStudentsDTO) => void;
}

const HeaderStudentSearch: FC<HeaderStudentSearchProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortQGSParam>(SortQGSParam.FIRST_NAME);
  const [group, setGroup] = useState<string[]>([]);
  const [roles, setRoles] = useState<(keyof typeof GroupRoles)[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] = useState(StudentInitialValues);

  const { data: groups, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    ...useQueryAdminOptions,
  });

  useEffect(() => {
    onSubmit(values);
  }, [values]);

  if (isLoading) return <Progress />;

  if (!groups) throw new Error('error loading data');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setValues(values => ({ ...values, search: value }));
  };
  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setValues(values => ({ ...values, order: order }));
  };
  const handleSortByChange = (value: string) => {
    setSortBy(value as SortQGSParam);
    setValues(values => ({
      ...values,
      sort: value as SortQGSParam,
    }));
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as (keyof typeof GroupRoles)[];
    setRoles(value);
    setValues(values => ({ ...values, roles: value }));
  };
  const handleGroupChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    setGroup(value);
    setValues(values => ({ ...values, groups: value }));
  };

  const groupOptions = transformGroupsMulti(groups.groups);

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.filterBar}>
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
        <Divider sx={stylesAdmin.dividerVert} />
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
        <Divider sx={stylesAdmin.dividerVert} />
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
        sx={stylesAdmin.button}
      />
    </Box>
  );
};
export default HeaderStudentSearch;
