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
import { UserGroupState } from '@/types/user';

import { sortOptions, stateOptions } from '../../constants/Options';
import { UserInitialValues } from '../../constants/UserInitialValues';
import { HeaderUserSearchProps } from '../../types/HeaderUserSearch';

import * as styles from './HeaderUserSearch.styles';

const HeaderUserSearch: FC<HeaderUserSearchProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('username');
  const [userState, setUserState] = useState<UserGroupState[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] = useState(UserInitialValues);

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
    setValues(values => ({ ...values, sort: value as 'username' | 'email' }));
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as UserGroupState[];
    setUserState(value);
    setValues(values => ({ ...values, state: value }));
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
        href="/admin/users/create"
        sx={styles.button}
      />
    </Box>
  );
};
export default HeaderUserSearch;
