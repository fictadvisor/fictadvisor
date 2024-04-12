'use client';
import React, { FC, useEffect, useState } from 'react';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { transferToMulti } from '@/app/admin/disciplines/common/utils/transformToMulti';
import { useDisciplines } from '@/app/admin/disciplines/common/utils/useDisciplines';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
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
import Progress from '@/components/common/ui/progress/Progress';

import { initialValues, sortOptions } from '../../constants';
import { DisciplinesAdminSearchFormFields, Semester } from '../../types';

import * as styles from './DisciplinesAdminSearch.styles';

interface DisciplinesAdminSearchProps {
  setParams: React.Dispatch<
    React.SetStateAction<DisciplinesAdminSearchFormFields>
  >;
}

const DisciplinesAdminSearch: FC<DisciplinesAdminSearchProps> = ({
  setParams,
}) => {
  const [search, setSearch] = useState<string>(initialValues.search);
  const [sortBy, setSortBy] = useState<string>(initialValues.sort);
  const [order, setOrder] = useState<'asc' | 'desc'>(initialValues.order);
  const [groups, setGroups] = useState<CheckboxesDropdownOption[]>([]);
  const [semesters, setSemesters] = useState<CheckboxesDropdownOption[]>([]);
  const [teachers, setTeachers] = useState<CheckboxesDropdownOption[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams(prev => ({
        ...prev,
        search,
      }));
    }, 200);
    return () => clearTimeout(timer);
  }, [search]);

  const { groupsOptions, isLoading, semesterOptions, teachersOptions } =
    useDisciplines();

  if (isLoading) {
    return <Progress />;
  }

  if (!(groupsOptions && semesterOptions && teachersOptions))
    throw new Error('an error has occured while fetching data');

  const groupsMultiOptions = transferToMulti(groupsOptions);
  const semestersMultiOptions = transferToMulti(semesterOptions);
  const teachersMultiOptions = transferToMulti(teachersOptions);

  const handleOrderChange = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setParams(prev => ({
      ...prev,
      order: newOrder,
    }));
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setParams(prev => ({
      ...prev,
      sortBy: value,
    }));
  };

  const handleGroupsChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newGroups = value.map(
      value => groupsMultiOptions.find(group => group.value === value)!,
    );
    setGroups(newGroups);
    setParams(prev => ({
      ...prev,
      groups: value,
    }));
  };

  const handleSemestersChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newSemesters = value.map(
      value =>
        semestersMultiOptions.find(semester => semester.value === value)!,
    );
    setSemesters(newSemesters);
    const newSemestersFilter = semesters.map(semester => ({
      semester: parseInt(semester.value.split(' ')[1]),
      year: parseInt(semester.value.split(' ')[0]),
    })) as Semester[];
    setParams(prev => ({
      ...prev,
      semesters: newSemestersFilter,
    }));
  };

  const handleTeachersChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newTeachers = value.map(
      value => teachersMultiOptions.find(teacher => teacher.value === value)!,
    );
    setTeachers(newTeachers);
    setParams(prev => ({
      ...prev,
      teachers: value,
    }));
  };

  return (
    <form>
      <Box sx={stylesAdmin.header}>
        <Box sx={styles.form}>
          <Box>
            <Input
              sx={stylesAdmin.input}
              value={search}
              onChange={setSearch}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
            />
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <CheckboxesDropdown
            sx={styles.checkboxDropdown}
            label="Група"
            values={groupsMultiOptions}
            selected={groups}
            size={FieldSize.MEDIUM}
            handleChange={handleGroupsChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '200px' }}
          />
          <CheckboxesDropdown
            sx={styles.checkboxDropdown}
            label="Рік і семестр"
            values={semestersMultiOptions}
            selected={semesters}
            size={FieldSize.MEDIUM}
            handleChange={handleSemestersChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '200px' }}
          />
          <CheckboxesDropdown
            sx={styles.checkboxDropdown}
            label="Викладач"
            values={teachersMultiOptions}
            selected={teachers}
            size={FieldSize.MEDIUM}
            handleChange={handleTeachersChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '200px' }}
          />
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Box sx={styles.dropdown}>
            <Dropdown
              label="Сортування"
              size={FieldSize.MEDIUM}
              options={sortOptions}
              value={sortBy}
              onChange={handleSortByChange}
              showRemark={false}
              disableClearable
              width="150px"
            />
          </Box>
          <Box>
            <IconButton
              onClick={handleOrderChange}
              shape={IconButtonShape.SQUARE}
              color={IconButtonColor.SECONDARY}
              size={IconButtonSize.LARGE}
              icon={
                order === 'asc' ? <BarsArrowDownIcon /> : <BarsArrowUpIcon />
              }
            />
          </Box>
        </Box>
        <Button
          size={ButtonSize.MEDIUM}
          sx={stylesAdmin.button}
          text="Створити"
          href="/admin/disciplines/create"
        />
      </Box>
    </form>
  );
};

export default DisciplinesAdminSearch;
