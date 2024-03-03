'use client';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';
import { isAxiosError } from 'axios';

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
import {
  initialValues,
  sortOptions,
} from '@/components/pages/admin/disciplines-admin-page/components/disciplines-admin-search/constants';
import { DisciplinesAdminSearchFormFields } from '@/components/pages/admin/disciplines-admin-page/components/disciplines-admin-search/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineApi from '@/lib/api/discipline/DisciplineAPI';

import * as styles from './DisciplinesAdminSearch.styles';

interface DisciplinesAdminSearchProps {
  onSubmit: (values: DisciplinesAdminSearchFormFields) => void;
}

interface Semester {
  year: number;
  semester: number;
}

const DisciplinesAdminSearch: FC<DisciplinesAdminSearchProps> = ({
  onSubmit,
}) => {
  const [values, setValues] =
    useState<DisciplinesAdminSearchFormFields>(initialValues);
  const [search, setSearchFilter] = useState<string>(initialValues.search);
  const [groupId, setGroupsFilter] = useState<CheckboxesDropdownOption[]>([]);
  const [semesterId, setSemestersFilter] = useState<CheckboxesDropdownOption[]>(
    [],
  );
  const [teacherId, setTeachersFilter] = useState<CheckboxesDropdownOption[]>(
    [],
  );
  const [sortBy, setSortByFilter] = useState<string>(initialValues.sort);
  const [order, setOrderFilter] = useState<'asc' | 'desc'>(initialValues.order);
  const [groups, setGroups] = useState<CheckboxesDropdownOption[]>();
  const [semesters, setSemesters] = useState<CheckboxesDropdownOption[]>();
  const [teachers, setTeachers] = useState<CheckboxesDropdownOption[]>();
  const toast = useToastError();

  const handleFormSubmit = () => {
    const newGroups = groupId.map(group => group.id) as string[];
    const newSemesters = semesterId.map(semester => {
      return {
        semester: parseInt(semester.value.split(' ')[0]),
        year: parseInt(semester.value.split(' ')[1]),
      };
    }) as Semester[];
    const newTeachers = teacherId.map(teacher => teacher.id) as string[];
    setValues({
      ...values,
      search,
      order,
      sort: sortBy as 'name' | 'semester' | 'group',
      groups: newGroups,
      semesters: newSemesters,
      teachers: newTeachers,
    });
    onSubmit(values);
  };

  useEffect(() => {
    handleFormSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, order, groupId, semesterId, teacherId]);

  const { data: disciplineData, isLoading: isDisciplineLoading } = useQuery(
    'discipline',
    () => DisciplineApi.getAllDisciplines(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error.response?.data.message);
        }
      },
      onSuccess(data) {
        setGroups(
          data.disciplines
            .map(discipline => ({
              label: discipline.group.code,
              value: discipline.group.code,
              id: discipline.group.id,
            }))
            .filter(
              (
                items =>
                ({ label }) =>
                  !items.has(label) && items.add(label)
              )(new Set()),
            )
            .sort((a, b) => a.label.localeCompare(b.label)),
        );

        setSemesters(
          data.disciplines
            .map(discipline => ({
              label: `${discipline.semester} семестр ${discipline.year} - ${
                discipline.year + 1
              }`,
              value: `${discipline.semester} ${discipline.year}`,
            }))
            .filter(
              (
                items =>
                ({ label }) =>
                  !items.has(label) && items.add(label)
              )(new Set()),
            )
            .sort((a, b) =>
              b.value.split(' ')[1].localeCompare(a.value.split(' ')[1]),
            ),
        );

        const teachersTmp: {
          id: string;
          firstName: string;
          middleName: string;
          lastName: string;
        }[] = [];
        data.disciplines.forEach(discipline =>
          discipline.teachers.forEach(teacher => teachersTmp.push(teacher)),
        );
        setTeachers(
          teachersTmp
            .filter(teacher => teacher.lastName)
            .map(teacher => ({
              label: `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.lastName[0]}.`,
              value: `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.lastName[0]}.`,
              id: teacher.id,
            }))
            .filter(
              (
                items =>
                ({ id }) =>
                  !items.has(id) && items.add(id)
              )(new Set()),
            )
            .sort((a, b) => a.label.localeCompare(b.label)),
        );
      },
    },
  );

  const handleOrderChange = () => {
    setOrderFilter(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortByChange = (value: string) => {
    setSortByFilter(value);
  };

  const handleGroupsChange = (event: SelectChangeEvent) => {
    setGroupsFilter(
      groups?.filter(group =>
        event.target.value.includes(group.value),
      ) as CheckboxesDropdownOption[],
    );
  };

  const handleSemestersChange = (event: SelectChangeEvent) => {
    setSemestersFilter(
      semesters?.filter(semester =>
        event.target.value.includes(semester.value),
      ) as CheckboxesDropdownOption[],
    );
  };

  const handleTeachersChange = (event: SelectChangeEvent) => {
    setTeachersFilter(
      teachers?.filter(teacher =>
        event.target.value.includes(teacher.value),
      ) as CheckboxesDropdownOption[],
    );
  };

  if (
    isDisciplineLoading ||
    !disciplineData ||
    !groups ||
    !semesters ||
    !teachers
  ) {
    return <div>Loading...</div>;
  }

  return (
    <form>
      <Box sx={styles.header}>
        <Box sx={styles.form}>
          <Box>
            <Input
              sx={styles.input}
              value={search}
              onChange={setSearchFilter}
              onDeterredChange={() => handleFormSubmit()}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
            />
          </Box>
          <Divider orientation="vertical" sx={styles.divider} />
          <CheckboxesDropdown
            sx={styles.checkboxDropdown}
            label="Група"
            values={groups as unknown as CheckboxesDropdownOption[]}
            selected={groupId}
            size={FieldSize.MEDIUM}
            handleChange={handleGroupsChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '200px' }}
          />
          <CheckboxesDropdown
            sx={styles.checkboxDropdown}
            label="Рік і семестр"
            values={semesters as unknown as CheckboxesDropdownOption[]}
            selected={semesterId}
            size={FieldSize.MEDIUM}
            handleChange={handleSemestersChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '200px' }}
          />
          <CheckboxesDropdown
            sx={styles.checkboxDropdown}
            label="Викладач"
            values={teachers as unknown as CheckboxesDropdownOption[]}
            selected={teacherId}
            size={FieldSize.MEDIUM}
            handleChange={handleTeachersChange}
            menuSx={{ backgroundColor: 'backgroundDark.100', width: '200px' }}
          />
          <Divider orientation="vertical" sx={styles.divider} />
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
          sx={styles.button}
          text="Створити"
          href="/admin/disciplines/create"
        />
      </Box>
    </form>
  );
};

export default DisciplinesAdminSearch;
