'use client';
import React, { FC, useEffect, useState } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import {
  initialValues,
  sortOptions,
  typesOptions,
} from '@/app/admin/questions/common/constants';
import { QuestionSearchFormFields } from '@/app/admin/questions/common/types';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import { QuestionType } from '@/types/poll';

interface QuestionAdminSearchProps {
  onSubmit: (values: QuestionSearchFormFields) => void;
}

const QuestionsAdminSearch: FC<QuestionAdminSearchProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<QuestionSearchFormFields>(initialValues);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'text' | 'order' | 'category'>('text');
  const [type, setType] = useState<QuestionType>(QuestionType.SCALE);

  const handleFormSubmit = () => {
    setValues({
      ...values,
      search,
      order,
      sort: sortBy,
      types: [type],
    });
    onSubmit(values);
  };

  useEffect(() => {
    handleFormSubmit();
  }, [search, order, sortBy, type]);

  const handleOrderChange = () => {
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.form}>
        <Box>
          <Input
            sx={stylesAdmin.input}
            value={search}
            onChange={setSearch}
            onDeterredChange={() => handleFormSubmit()}
            size={InputSize.MEDIUM}
            type={InputType.SEARCH}
            placeholder="Пошук"
            showRemark={false}
          />
        </Box>
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Dropdown
          label="Тип відповіді"
          width="188px"
          value={type}
          options={typesOptions}
          onChange={type => setType(type as QuestionType)}
          disableClearable
          showRemark={false}
        />
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Dropdown
          label="Сортування"
          width="188px"
          value={sortBy}
          options={sortOptions}
          onChange={option =>
            setSortBy(option as 'text' | 'order' | 'category')
          }
          disableClearable
          showRemark={false}
        />
        <Box>
          <IconButton
            onClick={handleOrderChange}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.SECONDARY}
            size={IconButtonSize.LARGE}
            icon={
              values.order === 'asc' ? (
                <BarsArrowDownIcon />
              ) : (
                <BarsArrowUpIcon />
              )
            }
          />
        </Box>
      </Box>
      <Button
        size={ButtonSize.MEDIUM}
        sx={stylesAdmin.button}
        text="Створити"
        href="/admin/questions/create"
      />
    </Box>
  );
};

export default QuestionsAdminSearch;
