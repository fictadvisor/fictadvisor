'use client';
import { useState } from 'react';
import { FC } from 'react';
import { SortQAUParam, State } from '@fictadvisor/utils/enums';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
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

import { sortOptions, stateOptions } from '../../constants';
import { HeaderUserSearchProps } from '../../types';

import * as styles from './HeaderUserSearch.styles';

const HeaderUserSearch: FC<HeaderUserSearchProps> = ({ onSubmit, values }) => {
  const [search, setSearch] = useState<string>(values.search);
  const [sortBy, setSortBy] = useState<SortQAUParam>(values.sort);
  const [userState, setUserState] = useState<State[]>(values.state);
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order);

  const handleFormSubmit = () => {
    onSubmit({
      search,
      sort: sortBy,
      state: userState,
      order,
    });
  };

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
  };
  const handleSortByChange = (value: string) => {
    setSortBy(value as SortQAUParam);
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as State[];
    setUserState(value);
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
        <Box sx={styles.dropdown}>
          <CheckboxesDropdown
            selected={userState.map(state => ({
              label: state,
              value: state,
            }))}
            values={stateOptions}
            handleChange={handleStateChange}
            label="Стан"
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
        href="/admin/users/create"
        sx={stylesAdmin.button}
      />
    </Box>
  );
};
export default HeaderUserSearch;
