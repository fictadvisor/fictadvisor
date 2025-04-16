'use client';
import { useState } from 'react';
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
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { roleOptions, sortOptions } from '../../constants';

import * as styles from './HeaderStudentSearch.styles';

export interface HeaderStudentSearchProps {
  onSubmit: (values: QueryAllStudentsDTO) => void;
  values: QueryAllStudentsDTO;
}

const HeaderStudentSearch: FC<HeaderStudentSearchProps> = ({
  onSubmit,
  values,
}) => {
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [group, setGroup] = useState<string[]>(values.groups ?? []);
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'desc');
  const [sortBy, setSortBy] = useState<SortQGSParam>(
    values.sort ?? SortQGSParam.FIRST_NAME,
  );
  const [roles, setRoles] = useState<(keyof typeof GroupRoles)[]>(
    values.roles ?? [],
  );

  const { displayError } = useToastError();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    ...useQueryAdminOptions,
  });

  const handleFormSubmit = () => {
    onSubmit({
      order,
      roles,
      search,
      sort: sortBy,
      groups: group,
    });
  };

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
  };
  const handleSortByChange = (value: string) => {
    setSortBy(value as SortQGSParam);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as (keyof typeof GroupRoles)[];
    setRoles(value);
  };

  const handleGroupChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    setGroup(value);
  };

  const groupOptions = transformGroupsMulti(groups?.groups ?? []);
  if (error) {
    displayError(error);
    throw new Error('error loading data');
  }

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.filterBar}>
        <Box sx={styles.search}>
          <Input
            value={search}
            onChange={setSearch}
            onDeterredChange={handleFormSubmit}
            size={InputSize.MEDIUM}
            type={InputType.SEARCH}
            placeholder="Пошук"
            showRemark={false}
          />
        </Box>
        <Divider sx={stylesAdmin.dividerVert} />
        <Box sx={styles.checkboxesDropdown}>
          {isLoading ? (
            <Progress />
          ) : (
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
          )}
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
