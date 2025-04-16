'use client';
import React, { FC, useState } from 'react';
import { CommentsSortBy } from '@fictadvisor/utils/enums';
import { QueryAllCommentsDTO } from '@fictadvisor/utils/requests';
import { SemesterResponse } from '@fictadvisor/utils/responses';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { sortOptions } from '@/app/admin/comments/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { transferToMulti } from '@/app/admin/disciplines/common/utils/transformToMulti';
import { useDisciplines } from '@/app/admin/disciplines/common/utils/useDisciplines';
import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import Progress from '@/components/common/ui/progress';

interface AdminCommentsSearch {
  onSubmit: (values: QueryAllCommentsDTO) => void;
  values: QueryAllCommentsDTO;
}

const AnswersAdminSearch: FC<AdminCommentsSearch> = ({ onSubmit, values }) => {
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [sortBy, setSortBy] = useState<string>(values.sort ?? 'username');
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'desc');
  const [semesters, setSemesters] = useState<CheckboxesDropdownOption[]>([]);

  const handleFormSubmit = () => {
    const newSemestersFilter = semesters.map(semester => ({
      semester: parseInt(semester.value.split(' ')[1]),
      year: parseInt(semester.value.split(' ')[0]),
    })) as SemesterResponse[];

    onSubmit({
      order,
      search,
      semesters: newSemestersFilter,
      sort: sortBy as CommentsSortBy,
    });
  };

  const { isLoading, isError, semesterOptions } = useDisciplines();

  const semestersMultiOptions = transferToMulti(semesterOptions ?? []);

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
  };

  const handleSemestersChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newSemesters = value.map(
      value =>
        semestersMultiOptions.find(semester => semester.value === value)!,
    );
    setSemesters(newSemesters);
  };

  if (isError) throw new Error('Error loading semesters');

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
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Box sx={stylesAdmin.dropdown}>
          {isLoading ? (
            <Progress />
          ) : (
            <CheckboxesDropdown
              label="Рік і семестр"
              values={semestersMultiOptions}
              selected={semesters}
              size={FieldSize.MEDIUM}
              handleChange={handleSemestersChange}
            />
          )}
        </Box>
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Box sx={stylesAdmin.dropdown}>
          <Dropdown
            label="Сортування"
            size={FieldSize.MEDIUM}
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
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
    </Box>
  );
};

export default AnswersAdminSearch;
