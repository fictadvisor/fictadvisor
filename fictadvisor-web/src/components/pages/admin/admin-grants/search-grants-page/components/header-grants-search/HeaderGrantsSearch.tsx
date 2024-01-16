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

import { GrantsInitialValues } from '../../../common/constants/GrantsInitialValues';
import { GrantsOptions, sortOptions } from '../../../common/constants/Options';
import { GrantSet, GrantSort } from '../../../common/types';
import { GrantsSearchFormFields } from '../../../common/types/GrantsSearchFormFields';

import * as styles from './HeaderGrantsSearch.styles';

export interface HeaderGrantsSearchProps {
  roleId: string;
  onSubmit: (values: Partial<GrantsSearchFormFields>) => void;
}

const HeaderGrantsSearch: FC<HeaderGrantsSearchProps> = ({
  onSubmit,
  roleId,
}) => {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('permission');
  const [grantSet, setGrantSet] = useState<GrantSet>('' as GrantSet);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] = useState(GrantsInitialValues);

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
      sort: value as GrantSort,
    }));
  };

  const handleGrantSetChange = (value: string) => {
    setGrantSet(value as GrantSet);
    setValues(values => ({
      ...values,
      set: value as GrantSet,
    }));
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
          <Dropdown
            size={FieldSize.MEDIUM}
            options={GrantsOptions}
            showRemark={false}
            onChange={handleGrantSetChange}
            value={grantSet}
            label="Статус права"
            placeholder="Статус права"
          />
        </Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.dropdown}>
          <Dropdown
            placeholder="Сортування"
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
        href={`/admin/roles/${roleId}/grants/create`}
        sx={styles.button}
      />
    </Box>
  );
};
export default HeaderGrantsSearch;
