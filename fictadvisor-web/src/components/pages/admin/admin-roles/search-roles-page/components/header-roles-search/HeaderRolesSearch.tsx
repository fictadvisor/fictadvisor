'use client';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import { IconButtonShape } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonSize,
} from '@/components/common/ui/icon-button-mui/types';
import { RoleName } from '@/types/role';

import {
  RoleNameOptions,
  sortOptions,
} from '../../../common/constants/Options';
import { RolesInitialValues } from '../../../common/constants/RolesInitialValues';
import { HeaderRolesSearchProps } from '../../../common/types/HeaderRolesSearch';

import * as styles from './HeaderRolesSearch.styles';

const HeaderRolesSearch: FC<HeaderRolesSearchProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('displayName');
  const [roleName, setRoleName] = useState<RoleName>('' as RoleName);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] = useState(RolesInitialValues);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setValues(values => ({ ...values, search: value }));
  };
  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setValues(values => ({ ...values, order: order }));
  };
  const handleSortChange = (value: string) => {
    setSort(value);
    setValues(values => ({
      ...values,
      sort: value as 'displayName' | 'weight' | 'createdAt' | 'id',
    }));
  };

  const handleRoleNameChange = (value: string) => {
    setRoleName(value as RoleName);
    setValues(values => ({ ...values, name: value as RoleName }));
  };

  useEffect(() => {
    onSubmit(values);
  }, [values]);

  RoleName;

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
        <Box sx={styles.dropdown}>
          <Dropdown
            size={FieldSize.MEDIUM}
            options={RoleNameOptions}
            showRemark={false}
            onChange={handleRoleNameChange}
            value={roleName}
            label="Тип ролі"
            placeholder="Тип ролі"
          />
        </Box>
        <Box sx={styles.dropdown}>
          <Dropdown
            label="Сортування"
            size={FieldSize.MEDIUM}
            options={sortOptions}
            value={sort}
            onChange={handleSortChange}
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
        href="/admin/roles/create"
        sx={styles.button}
      />
    </Box>
  );
};
export default HeaderRolesSearch;
