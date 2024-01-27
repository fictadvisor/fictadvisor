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
import Progress from '@/components/common/ui/progress/Progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import SpecialitiesAPI from '@/lib/api/specialities/SpecialitiesAPI';

import { courseOptions, sortOptions } from '../../../common/constants/Options';
import { GroupsSearchFormFields } from '../../../common/types';

import * as styles from './GroupsAdminSearch.styles';

interface GroupsAdminSearchProps {
  setParams: React.Dispatch<React.SetStateAction<GroupsSearchFormFields>>;
}

const GroupsAdminSearch: FC<GroupsAdminSearchProps> = ({ setParams }) => {
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<string>('code');

  const [cathedras, setCathedras] = useState<CheckboxesDropdownOption[]>([]);
  const [courses, setCourses] = useState<CheckboxesDropdownOption[]>([]);
  const [specialities, setSpecialities] = useState<CheckboxesDropdownOption[]>(
    [],
  );

  const toastError = useToastError();

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCathedras = cathedras.map(cathedra => cathedra.id) as string[];
      const newCourses = courses.map(role => +role.value) as number[];
      const newSpecialities = specialities.map(role => role.id) as string[];
      setParams(
        prevParams =>
          ({
            ...prevParams,
            search,
            order,
            sort: sortBy,
            cathedras: newCathedras,
            specialities: newSpecialities,
            courses: newCourses,
          }) as GroupsSearchFormFields,
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [search, order, sortBy, cathedras, courses, specialities]);

  const { data, isLoading } = useQuery(
    'cathedras',
    () => CathedraAPI.getAll(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
    },
  );
  const { data: specialitiesData, isLoading: isLoadingSpecialities } = useQuery(
    ['specialities'],
    () => SpecialitiesAPI.getAll(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
    },
  );

  if (isLoading || !data || isLoadingSpecialities || !specialitiesData)
    return <Progress />;

  const cathedrasOptions = data.cathedras.map(cathedra => ({
    label: cathedra.abbreviation,
    value: cathedra.name,
    id: cathedra.id,
  }));

  const specialitiesOptions = specialitiesData.specialities.map(speciality => ({
    label: speciality.code,
    value: speciality.name,
    id: speciality.id,
  }));

  const handleOrderChange = () => {
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCoursesChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newCourses = value.map(
      value => courseOptions.find(cathedra => cathedra.value === value)!,
    );
    setCourses(newCourses);
  };

  const handleCathedrasChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newCathedras = value.map(
      value => cathedrasOptions.find(cathedra => cathedra.value === value)!,
    );
    setCathedras(newCathedras);
  };

  const handleSpecialitiesChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newSpecialities = value.map(
      value =>
        specialitiesOptions.find(speciality => speciality.value === value)!,
    );
    setSpecialities(newSpecialities);
  };

  return (
    <Box sx={styles.header}>
      <Box sx={styles.form}>
        <Box>
          <Input
            sx={styles.input}
            value={search}
            onChange={setSearch}
            size={InputSize.MEDIUM}
            type={InputType.SEARCH}
            placeholder="Пошук"
            showRemark={false}
          />
        </Box>
        <Divider orientation="vertical" sx={styles.divider} />
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Box sx={styles.course}>
            <CheckboxesDropdown
              values={courseOptions}
              selected={courses}
              size={FieldSize.MEDIUM}
              handleChange={handleCoursesChange}
              label="Курс"
            />
          </Box>
          <Box sx={styles.specialty}>
            <CheckboxesDropdown
              label="Спеціальність"
              values={specialitiesOptions}
              selected={specialities}
              size={FieldSize.MEDIUM}
              handleChange={handleSpecialitiesChange}
            />
          </Box>
          <Box sx={styles.cathedra}>
            <CheckboxesDropdown
              dropdownSx={styles.cathedra}
              label="Кафедри"
              values={cathedrasOptions}
              selected={cathedras}
              size={FieldSize.MEDIUM}
              handleChange={handleCathedrasChange}
            />
          </Box>
        </Box>
        <Divider orientation="vertical" sx={styles.divider} />
        <Box sx={styles.sortBy}>
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
        <Box>
          <IconButton
            onClick={handleOrderChange}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.SECONDARY}
            size={IconButtonSize.LARGE}
            icon={order === 'asc' ? <BarsArrowDownIcon /> : <BarsArrowUpIcon />}
          />
        </Box>
      </Box>
      <Button
        size={ButtonSize.MEDIUM}
        sx={styles.button}
        text="Створити"
        href="/admin/groups/create"
      />
    </Box>
  );
};

export default GroupsAdminSearch;
