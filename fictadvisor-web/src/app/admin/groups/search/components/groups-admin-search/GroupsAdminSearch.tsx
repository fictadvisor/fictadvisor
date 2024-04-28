'use client';
import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { QueryAllGroupsDTO } from '@fictadvisor/utils/requests';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import {
  courseOptions,
  sortOptions,
} from '@/app/admin/groups/common/constants';
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
import LoadPage from '@/components/common/ui/load-page';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import SpecialitiesAPI from '@/lib/api/specialities/SpecialitiesAPI';

interface GroupsAdminSearchProps {
  setParams: React.Dispatch<React.SetStateAction<QueryAllGroupsDTO>>;
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

  const { data: cathedrasData, isLoading: isLoadingCathedras } = useQuery(
    ['cathedras'],
    () => CathedraAPI.getAll(),
    useQueryAdminOptions,
  );
  const { data: specialitiesData, isLoading: isLoadingSpecialities } = useQuery(
    ['specialities'],
    () => SpecialitiesAPI.getAll(),
    useQueryAdminOptions,
  );

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
          }) as QueryAllGroupsDTO,
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [search, order, sortBy, cathedras, courses, specialities]);

  if (isLoadingCathedras || isLoadingSpecialities) return <LoadPage />;

  if (!cathedrasData || !specialitiesData)
    throw new Error('Error loading data');

  const cathedrasOptions = cathedrasData.cathedras.map(cathedra => ({
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
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.form}>
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
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Box sx={{ width: '98px', flex: '0 0 98px' }}>
            <CheckboxesDropdown
              values={courseOptions}
              selected={courses}
              size={FieldSize.MEDIUM}
              handleChange={handleCoursesChange}
              label="Курс"
            />
          </Box>
          <Box sx={{ width: '150px' }}>
            <CheckboxesDropdown
              label="Спеціальність"
              values={specialitiesOptions}
              selected={specialities}
              size={FieldSize.MEDIUM}
              handleChange={handleSpecialitiesChange}
            />
          </Box>
          <Box sx={{ width: '112px' }}>
            <CheckboxesDropdown
              dropdownSx={{ width: '112px' }}
              label="Кафедри"
              values={cathedrasOptions}
              selected={cathedras}
              size={FieldSize.MEDIUM}
              handleChange={handleCathedrasChange}
            />
          </Box>
        </Box>
        <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
        <Box sx={{ width: '195px' }}>
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
        sx={stylesAdmin.button}
        text="Створити"
        href="/admin/groups/create"
      />
    </Box>
  );
};

export default GroupsAdminSearch;
