'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { CommentsSortBy } from '@fictadvisor/utils/enums';
import { QueryAllCommentsDTO } from '@fictadvisor/utils/requests';
import {
  SemestersResponse,
  StudyingSemester,
} from '@fictadvisor/utils/responses';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import {
  initialValues,
  sortOptions,
} from '@/app/admin/comments/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
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

interface AdminCommentsSearch {
  onSubmit: (values: QueryAllCommentsDTO) => void;
  dates: SemestersResponse;
}

const AnswersAdminSearch: FC<AdminCommentsSearch> = ({ onSubmit, dates }) => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('username');
  const [semesters, setSemesters] = useState<typeof semestersOptions>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [values, setValues] = useState<QueryAllCommentsDTO>(initialValues);

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
    setValues((values: QueryAllCommentsDTO) => ({
      ...values,
      search: value,
    }));
  };

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    setValues((values: QueryAllCommentsDTO) => ({
      ...values,
      order: order,
    }));
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setValues((values: QueryAllCommentsDTO) => ({
      ...values,
      sort: value as CommentsSortBy,
    }));
  };

  const handleSemestersChange = (event: SelectChangeEvent) => {
    const value = (event.target.value as unknown as StudyingSemester[]).filter(
      Boolean,
    );
    const selectedSemestersOptions = value.reduce(
      (acc: typeof semestersOptions, semester: StudyingSemester) => {
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
    setValues((values: QueryAllCommentsDTO) => ({
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
