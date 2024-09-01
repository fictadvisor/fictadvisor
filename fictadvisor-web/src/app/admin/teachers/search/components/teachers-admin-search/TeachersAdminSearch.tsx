'use client';
import React, { FC, useEffect, useState } from 'react';
import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Box, Divider, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
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
import Progress from '@/components/common/ui/progress/Progress';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

import { initialValues, teacherRoles } from '../../constants';

interface TeachersAdminSearchProps {
  onSubmit: (values: QueryAllTeacherDTO) => void;
}

const TeachersAdminSearch: FC<TeachersAdminSearchProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<QueryAllTeacherDTO>(initialValues);
  const [search, setSearch] = useState<string>('');
  const [cathedrasId, setCathedrasId] = useState<CheckboxesDropdownOption[]>(
    [],
  );
  const [roles, setRoles] = useState<CheckboxesDropdownOption[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleFormSubmit = () => {
    const newCathedrasId = cathedrasId.map(cathedra => cathedra.id) as string[];
    setValues({
      ...values,
      search,
      order,
      cathedrasId: newCathedrasId,
    });
    onSubmit(values);
  };

  useEffect(() => {
    handleFormSubmit();
  }, [search, order, roles, cathedrasId]);

  const { data, isLoading } = useQuery({
    queryKey: ['cathedras'],
    queryFn: () => CathedraAPI.getAll(),
    ...useQueryAdminOptions,
  });

  if (isLoading) return <Progress />;

  if (!data) throw new Error('error loading data');

  const cathedras = data.cathedras.map(cathedra => ({
    label: cathedra.abbreviation,
    value: cathedra.name,
    id: cathedra.id,
  }));
  const tags = teacherRoles.map(role => ({
    value: TagText[role],
    label: TagText[role],
    id: role,
  }));

  const handleOrderChange = () =>
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  const handleCathedrasChange = (event: SelectChangeEvent) =>
    setCathedrasId(
      cathedras.filter(cathedra => event.target.value.includes(cathedra.value)),
    );
  const handleRolesChange = (event: SelectChangeEvent) =>
    setRoles(tags.filter(tag => event.target.value.includes(tag.value)));

  return (
    <form>
      <Box sx={stylesAdmin.header}>
        <Box sx={stylesAdmin.form}>
          <Box>
            <Input
              sx={stylesAdmin.input}
              value={search}
              onChange={setSearch}
              onDeterredChange={() => handleFormSubmit()}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
            />
          </Box>
          <Divider orientation="vertical" sx={stylesAdmin.dividerVert} />
          <Box sx={{ width: '120px' }}>
            <CheckboxesDropdown
              label="Кафедри"
              values={cathedras}
              selected={cathedrasId}
              size={FieldSize.MEDIUM}
              handleChange={handleCathedrasChange}
            />
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
