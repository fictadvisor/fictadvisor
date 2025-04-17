'use client';
import React, { FC, useState } from 'react';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { QueryAllTeachersDTO } from '@fictadvisor/utils/requests';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { teacherRoles } from '@/app/admin/teachers/search/constants';
import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { TagText } from '@/components/common/ui/cards/card-discipline-types/CardDisciplineTypes';
import { InputSize, InputType } from '@/components/common/ui/form';
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

const tags = teacherRoles.map(role => ({
  value: TagText[role],
  label: TagText[role],
  id: role,
}));

interface TeachersAdminSearchProps {
  onSubmit: (values: QueryAllTeachersDTO) => void;
  values: QueryAllTeachersDTO;
}

const TeachersAdminSearch: FC<TeachersAdminSearchProps> = ({
  onSubmit,
  values,
}) => {
  const { displayError } = useToastError();
  const [search, setSearch] = useState<string>(values.search ?? '');
  const [order, setOrder] = useState<'asc' | 'desc'>(values.order ?? 'asc');

  const {
    data: dataCathedras,
    isLoading: isLoadingCathedras,
    error: errorCathedras,
  } = useQuery({
    queryKey: ['cathedras'],
    queryFn: () => CathedraAPI.getAll(),
    ...useQueryAdminOptions,
  });

  const cathedras = dataCathedras?.cathedras.map(cathedra => ({
    label: cathedra.abbreviation,
    value: cathedra.name,
    id: cathedra.id,
  }));

  const newCathedrasIds = values.cathedrasId?.map(cathedraId =>
    cathedras?.find(({ id }) => id === cathedraId),
  ) as CheckboxesDropdownOption[];
  const [cathedrasId, setCathedrasId] =
    useState<CheckboxesDropdownOption[]>(newCathedrasIds);

  const newRoles = values.disciplineTypes?.map(role =>
    tags.find(({ value }) => value === TagText[role]),
  ) as CheckboxesDropdownOption[];
  const [roles, setRoles] = useState<CheckboxesDropdownOption[]>(newRoles);

  const handleFormSubmit = () => {
    onSubmit({
      search,
      order,
      disciplineTypes: roles.map(role => role.id as DisciplineTypeEnum),
      cathedrasId: cathedrasId.map(cathedra => cathedra.id) as string[],
    });
  };

  const handleOrderChange = () =>
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));

  const handleCathedrasChange = (event: SelectChangeEvent) => {
    if (!cathedras) return;

    setCathedrasId(
      cathedras?.filter(cathedra =>
        event.target.value.includes(cathedra.value),
      ),
    );
  };

  const handleRolesChange = (event: SelectChangeEvent) =>
    setRoles(tags.filter(tag => event.target.value.includes(tag.value)));

  if (errorCathedras) {
    displayError(errorCathedras);
    throw new Error('error cathedras data');
  }

  return (
    <form>
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
          <Box sx={{ width: '120px' }}>
            {isLoadingCathedras ? (
              <Progress />
            ) : (
              <CheckboxesDropdown
                label="Кафедри"
                values={cathedras ?? []}
                selected={cathedrasId}
                size={FieldSize.MEDIUM}
                handleChange={handleCathedrasChange}
              />
            )}
          </Box>
          <Box sx={{ width: '120px' }}>
            <CheckboxesDropdown
              label="Теги"
              values={tags}
              selected={roles}
              size={FieldSize.MEDIUM}
              handleChange={handleRolesChange}
            />
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
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
          sx={stylesAdmin.button}
          text="Створити"
          href="/admin/teachers/create"
        />
      </Box>
    </form>
  );
};

export default TeachersAdminSearch;
