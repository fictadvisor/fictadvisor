'use client';
import React, { FC, useState } from 'react';
import { SortQAGroupsParam } from '@fictadvisor/utils/enums';
import { QueryAllGroupsDTO } from '@fictadvisor/utils/requests';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

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
import Progress from '@/components/common/ui/progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import SpecialitiesAPI from '@/lib/api/specialities/SpecialitiesAPI';

interface GroupsAdminSearchProps {
  onSumbit: React.Dispatch<React.SetStateAction<QueryAllGroupsDTO>>;
  values: QueryAllGroupsDTO;
}

const GroupsAdminSearch: FC<GroupsAdminSearchProps> = ({
  onSumbit,
  values,
}) => {
  const { displayError } = useToastError();
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'asc');
  const [sortBy, setSortBy] = useState<string>(
    values.sort ?? SortQAGroupsParam.CODE,
  );

  const [cathedras, setCathedras] = useState<CheckboxesDropdownOption[]>([]);
  const [courses, setCourses] = useState<CheckboxesDropdownOption[]>([]);
  const [specialities, setSpecialities] = useState<CheckboxesDropdownOption[]>(
    [],
  );

  const handleFormSubmit = () => {
    onSumbit({
      search,
      order,
      sort: sortBy as SortQAGroupsParam,
      cathedras: cathedras.map(({ id }) => id) as string[],
      courses: courses.map(role => +role.value) as number[],
      specialities: specialities.map(role => role.id) as string[],
    });
  };

  const {
    data: cathedrasData,
    isLoading: isLoadingCathedras,
    error: errorCathedras,
  } = useQuery({
    queryKey: ['cathedras'],
    queryFn: () => CathedraAPI.getAll(),
    ...useQueryAdminOptions,
  });
  const {
    data: specialitiesData,
    isLoading: isLoadingSpecialities,
    error: errorSpecialities,
  } = useQuery({
    queryKey: ['specialities'],
    queryFn: () => SpecialitiesAPI.getAll(),
    ...useQueryAdminOptions,
  });

  const cathedrasOptions = cathedrasData?.cathedras.map(cathedra => ({
    label: cathedra.abbreviation,
    value: cathedra.name,
    id: cathedra.id,
  }));

  const specialitiesOptions = specialitiesData?.specialities.map(
    speciality => ({
      label: speciality.code,
      value: speciality.name,
      id: speciality.id,
    }),
  );

  const handleOrderChange = () => {
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCoursesChange = (event: SelectChangeEvent) => {
    const value = event.target.value as unknown as string[];
    const newCourses = value.map(
      value => courseOptions.find(course => course.value === value)!,
    );
    setCourses(newCourses);
  };

  const handleCathedrasChange = (event: SelectChangeEvent) => {
    if (!cathedrasOptions) return;

    const value = event.target.value as unknown as string[];
    const newCathedras = value.map(
      value => cathedrasOptions.find(cathedra => cathedra.value === value)!,
    );
    setCathedras(newCathedras);
  };

  const handleSpecialitiesChange = (event: SelectChangeEvent) => {
    if (!specialitiesOptions) return;

    const value = event.target.value as unknown as string[];
    const newSpecialities = value.map(
      value =>
        specialitiesOptions.find(speciality => speciality.value === value)!,
    );
    setSpecialities(newSpecialities);
  };

  if (errorCathedras) {
    displayError(errorCathedras);
    throw new Error('Error loading cathedras');
  }

  if (errorSpecialities) {
    displayError(errorSpecialities);
    throw new Error('Error loading specialities');
  }

  return (
    <Box sx={stylesAdmin.header}>
      <Box sx={stylesAdmin.form}>
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
            {isLoadingSpecialities || !specialitiesOptions ? (
              <Progress />
            ) : (
              <CheckboxesDropdown
                label="Спеціальність"
                values={specialitiesOptions}
                selected={specialities}
                size={FieldSize.MEDIUM}
                handleChange={handleSpecialitiesChange}
              />
            )}
          </Box>
          <Box sx={{ width: '112px' }}>
            {isLoadingCathedras || !cathedrasOptions ? (
              <Progress />
            ) : (
              <CheckboxesDropdown
                dropdownSx={{ width: '112px' }}
                label="Кафедри"
                values={cathedrasOptions}
                selected={cathedras}
                size={FieldSize.MEDIUM}
                handleChange={handleCathedrasChange}
              />
            )}
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
