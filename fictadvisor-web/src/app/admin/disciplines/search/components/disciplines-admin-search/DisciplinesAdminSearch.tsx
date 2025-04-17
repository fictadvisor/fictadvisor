'use client';
import React, { FC, useState } from 'react';
import { QueryAllDisciplinesDTO } from '@fictadvisor/utils/requests';
import { SemesterResponse } from '@fictadvisor/utils/responses';
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

import { sortOptions } from '../../constants';

import * as styles from './DisciplinesAdminSearch.styles';

interface DisciplinesAdminSearchProps {
  onSumbit: React.Dispatch<React.SetStateAction<QueryAllDisciplinesDTO>>;
  values: QueryAllDisciplinesDTO;
}

const DisciplinesAdminSearch: FC<DisciplinesAdminSearchProps> = ({
  onSumbit,
  values,
}) => {
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [sortBy, setSortBy] = useState<string>(values.sort ?? '');
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'desc');
  const [groups, setGroups] = useState<CheckboxesDropdownOption[]>([]);
  const [semesters, setSemesters] = useState<CheckboxesDropdownOption[]>([]);
  const [teachers, setTeachers] = useState<CheckboxesDropdownOption[]>([]);

  const handleFormSubmit = () => {
    const newGroups = groups.map(({ value }) => value) as string[];
    const newTeachers = teachers.map(({ value }) => value) as string[];

    const newSemestersFilter = semesters.map(semester => ({
      semester: parseInt(semester.value.split(' ')[1]),
      year: parseInt(semester.value.split(' ')[0]),
    })) as SemesterResponse[];

    onSumbit({
      search,
      sort: sortBy as 'name' | 'semester' | 'group',
      order,
      semesters: newSemestersFilter,
      groups: newGroups,
      teachers: newTeachers,
    });
  };

  const {
    groupsOptions,
    isLoading,
    isError,
    semesterOptions,
    teachersOptions,
  } = useDisciplines();

  const groupsMultiOptions = transferToMulti(groupsOptions ?? []);
  const semestersMultiOptions = transferToMulti(semesterOptions ?? []);
  const teachersMultiOptions = transferToMulti(teachersOptions ?? []);

  const handleOrderChange = () => {
    setOrder(order => (order === 'asc' ? 'desc' : 'asc'));
  };

  const handleGroupsChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newGroups = value.map(
      value => groupsMultiOptions.find(group => group.value === value)!,
    );
    setGroups(newGroups);
  };

  const handleSemestersChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newSemesters = value.map(
      value =>
        semestersMultiOptions.find(semester => semester.value === value)!,
    );
    setSemesters(newSemesters);
  };

  const handleTeachersChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newTeachers = value.map(
      value => teachersMultiOptions.find(teacher => teacher.value === value)!,
    );
    setTeachers(newTeachers);
  };

  if (isError) throw new Error('an error has occured while fetching data');

  return (
    <form>
      <Box sx={stylesAdmin.header}>
        <Box sx={styles.form}>
          <Box>
            <Input
              sx={stylesAdmin.input}
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
          {isLoading ? (
            <Progress />
          ) : (
            <>
              <CheckboxesDropdown
                sx={styles.checkboxDropdown}
                label="Група"
                values={groupsMultiOptions}
                selected={groups}
                size={FieldSize.MEDIUM}
                handleChange={handleGroupsChange}
                menuSx={{
                  backgroundColor: 'backgroundDark.100',
                  width: '200px',
                }}
              />
              <CheckboxesDropdown
                sx={styles.checkboxDropdown}
                label="Рік і семестр"
                values={semestersMultiOptions}
                selected={semesters}
                size={FieldSize.MEDIUM}
                handleChange={handleSemestersChange}
                menuSx={{
                  backgroundColor: 'backgroundDark.100',
                  width: '200px',
                }}
              />
              <CheckboxesDropdown
                sx={styles.checkboxDropdown}
                label="Викладач"
                values={teachersMultiOptions}
                selected={teachers}
                size={FieldSize.MEDIUM}
                handleChange={handleTeachersChange}
                menuSx={{
                  backgroundColor: 'backgroundDark.100',
                  width: '200px',
                }}
              />
            </>
          )}
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Box sx={styles.dropdown}>
            <Dropdown
              label="Сортування"
              size={FieldSize.MEDIUM}
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
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
