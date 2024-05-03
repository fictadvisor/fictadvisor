import React, { FC, useEffect, useState } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import { SubjectInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
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

interface SubjectsSearchHeaderProps {
  onSubmit: (values: SearchFormFields) => void;
}
const SubjectsSearchHeader: FC<SubjectsSearchHeaderProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [values, setValues] = useState<SearchFormFields>(SubjectInitialValues);
  const handleSubmit = () => {
    setValues({
      search,
      order,
      sort: 'name',
      groupId: '',
      roles: [],
      cathedrasId: [],
    });
    onSubmit(values);
  };

  const handleSortButtonClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setValues({
      search,
      order,
      sort: 'name',
      groupId: '',
      roles: [],
      cathedrasId: [],
    });
    onSubmit(values);
  };

  useEffect(() => {
    handleSubmit();
  }, [search]);

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.filterBar}>
        <Box sx={{ maxWidth: '458px' }}>
          <Input
            value={search}
            onChange={setSearch}
            onDeterredChange={handleSubmit}
            size={InputSize.MEDIUM}
            type={InputType.SEARCH}
            placeholder="Пошук"
            showRemark={false}
            sx={stylesAdmin.input}
          />
        </Box>
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
        sx={stylesAdmin.button}
      />
    </Box>
  );
};

export default SubjectsSearchHeader;
