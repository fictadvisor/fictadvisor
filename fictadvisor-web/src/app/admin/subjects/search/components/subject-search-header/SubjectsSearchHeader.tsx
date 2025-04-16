import React, { FC, useState } from 'react';
import { SortQASParam } from '@fictadvisor/utils/enums';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

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
  values: SearchFormFields;
}
const SubjectsSearchHeader: FC<SubjectsSearchHeaderProps> = ({
  onSubmit,
  values,
}) => {
  const [search, setSearch] = useState<string>(values.search);
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order);
  const handleSubmit = () => {
    onSubmit({
      search,
      order,
      sort: SortQASParam.NAME,
    } as SearchFormFields);
  };

  const handleSortButtonClick = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

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
