import React, { FC, useEffect, useState } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import { SubjectInitialValues } from '@/components/pages/search-pages/search-form/constants';
import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';

import * as styles from './AdminSubjectSearch.styles';
interface AdminSubjectSearchProps {
  onSubmit: (values: SearchFormFields) => void;
}
const AdminSubjectSearch: FC<AdminSubjectSearchProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [values, setValues] = useState<SearchFormFields>(SubjectInitialValues);
  const handleSubmit = () => {
    setValues({ search, order, sort: 'name', group: '' });
    onSubmit(values);
  };

  const handleSortButtonClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setValues({ search, order, sort: 'name', group: '' });
    onSubmit(values);
  };

  useEffect(() => {
    handleSubmit();
  }, [search]);
  return (
    <Box sx={styles.header}>
      <Box sx={styles.filterBar}>
        <Input
          value={search}
          onChange={setSearch}
          onDeterredChange={() => {
            handleSubmit();
          }}
          size={InputSize.MEDIUM}
          type={InputType.SEARCH}
          placeholder="Пошук"
          showRemark={false}
        />
        <IconButton
          onClick={handleSortButtonClick}
          shape={IconButtonShape.SQUARE}
          color={IconButtonColor.SECONDARY}
          size={IconButtonSize.LARGE}
          icon={order === 'asc' ? <BarsArrowDownIcon /> : <BarsArrowUpIcon />}
          sx={{ height: '100%' }}
        />
      </Box>
      <Button
        size={ButtonSize.MEDIUM}
        text="Створити"
        href="/admin/subjects/create"
        sx={styles.button}
      />
    </Box>
  );
};

export default AdminSubjectSearch;
