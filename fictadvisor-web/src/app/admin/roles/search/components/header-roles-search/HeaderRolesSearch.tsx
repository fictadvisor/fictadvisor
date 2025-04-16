'use client';
import { useState } from 'react';
import { FC } from 'react';
import { RoleName, SortQARParam } from '@fictadvisor/utils/enums';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import {
  RoleNameOptions,
  sortOptions,
} from '@/app/admin/roles/common/constants';
import { HeaderRolesSearchProps } from '@/app/admin/roles/common/types';
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

const HeaderRolesSearch: FC<HeaderRolesSearchProps> = ({
  onSubmit,
  values,
}) => {
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'desc');
  const [sort, setSort] = useState<SortQARParam>(
    values.sort ?? SortQARParam.DISPLAYNAME,
  );
  const [roleName, setRoleName] = useState<RoleName>(
    values.name ?? ('' as RoleName),
  );

  const handleFormSubmit = () => {
    onSubmit({
      search,
      sort,
      order,
      name: roleName,
    });
  };

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortChange = (value: string) => {
    setSort(value as SortQARParam);
  };

  const handleRoleNameChange = (value: string) => {
    setRoleName(value as RoleName);
  };

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.filterBar}>
        <Box sx={stylesAdmin.search}>
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
        <Box sx={stylesAdmin.dropdown}>
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
        <Box sx={stylesAdmin.dropdown}>
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
        sx={stylesAdmin.button}
      />
    </Box>
  );
};
export default HeaderRolesSearch;
