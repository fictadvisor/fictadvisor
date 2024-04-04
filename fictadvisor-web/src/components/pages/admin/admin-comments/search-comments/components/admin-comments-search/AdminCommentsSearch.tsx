'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import { GetDates } from '@/lib/api/dates/types/GetDates';
import { Semester } from '@/types/dates';

import { initialValues, sortOptions } from '../../../common/constants';
import { CommentsAdminSearchFormFields } from '../../../common/types';

interface AdminCommentsSearch {
  onSubmit: (values: CommentsAdminSearchFormFields) => void;
  dates: GetDates;
}

const AnswersAdminSearch: FC<AdminCommentsSearch> = ({ onSubmit, dates }) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('username');
  const [semesters, setSemesters] = useState<typeof semestersOptions>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] =
    useState<CommentsAdminSearchFormFields>(initialValues);

  const semestersOptions = useMemo(
    () =>
      dates.semesters.map(({ semester, year }) => ({
        label: `${semester} семестр ${year}`,
        value: { semester, year },
      })),
    [dates],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setValues((values: CommentsAdminSearchFormFields) => ({
      ...values,
      search: value,
    }));
  };

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setValues((values: CommentsAdminSearchFormFields) => ({
      ...values,
      order: order,
    }));
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setValues((values: CommentsAdminSearchFormFields) => ({
      ...values,
      sort: value as 'teacher' | 'semester' | 'subject',
    }));
  };

  const handleSemestersChange = (event: SelectChangeEvent) => {
    const value = (event.target.value as unknown as Semester[]).filter(Boolean);
    const selectedSemestersOptions = value.reduce(
      (acc: typeof semestersOptions, semester: Semester) => {
        const semesterOption = semestersOptions.find(
          ({ value }) =>
            value.year === semester.year &&
            value.semester === semester.semester,
        )!;
        acc.push(semesterOption);
        return acc;
      },
      [],
    );
    setSemesters(selectedSemestersOptions);
    setValues((values: CommentsAdminSearchFormFields) => ({
      ...values,
      semesters: value,
    }));
  };

  useEffect(() => {
    onSubmit(values);
  }, [onSubmit, values]);

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.filterBar}>
        <Box sx={stylesAdmin.search}>
          <Input
            value={search}
            onChange={handleSearchChange}
            size={InputSize.MEDIUM}
            type={InputType.SEARCH}
            placeholder="Пошук"
            showRemark={false}
          />
        </Box>
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Box sx={stylesAdmin.dropdown}>
          <CheckboxesDropdown
            label="Рік і семестр"
            // @ts-expect-error CheckboxesDropdownOption[] requires string
            values={semestersOptions}
            // @ts-expect-error CheckboxesDropdownOption[] requires string
            selected={semesters}
            size={FieldSize.MEDIUM}
            handleChange={handleSemestersChange}
          />
        </Box>
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Box sx={stylesAdmin.dropdown}>
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
    </Box>
  );
};

export default AnswersAdminSearch;
