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
import { TagText } from '@/components/common/ui/cards/card-roles/CardRoles';
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
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

import { initialValues, teacherRoles } from '../../constants';
import { AdminSearchFormFields } from '../../types';

import * as styles from './TeachersAdminSearch.styles';

interface TeachersAdminSearchProps {
  onSubmit: (values: AdminSearchFormFields) => void;
}

const TeachersAdminSearch: FC<TeachersAdminSearchProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<AdminSearchFormFields>(initialValues);
  const [search, setSearch] = useState<string>('');
  const [cathedrasId, setCathedrasId] = useState<CheckboxesDropdownOption[]>(
    [],
  );
  const [roles, setRoles] = useState<CheckboxesDropdownOption[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const toast = useToastError();

  const handleFormSubmit = () => {
    const newCathedrasId = cathedrasId.map(cathedra => cathedra.id) as string[];
    const newRoles = roles.map(role => role.id) as string[];
    setValues({
      ...values,
      search,
      order,
      cathedrasId: newCathedrasId,
      roles: newRoles,
    });
    onSubmit(values);
  };

  useEffect(() => {
    handleFormSubmit();
  }, [search, order, roles, cathedrasId]);

  const { data, isLoading } = useQuery(
    'cathedras',
    () => CathedraAPI.getAll(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error);
        }
      },
    },
  );

  if (isLoading || !data) return <Progress />;

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

  const handleOrderChange = () => {
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleCathedrasChange = (event: SelectChangeEvent) => {
    setCathedrasId(
      cathedras.filter(cathedra => event.target.value.includes(cathedra.value)),
    );
  };

  const handleRolesChange = (event: SelectChangeEvent) => {
    setRoles(tags.filter(tag => event.target.value.includes(tag.value)));
  };

  return (
    <form>
      <Box sx={styles.header}>
        <Box sx={styles.form}>
          <Box>
            <Input
              sx={styles.input}
              value={search}
              onChange={setSearch}
              onDeterredChange={() => handleFormSubmit()}
              size={InputSize.MEDIUM}
              type={InputType.SEARCH}
              placeholder="Пошук"
              showRemark={false}
            />
          </Box>
          <Divider orientation="vertical" sx={styles.divider} />
          <CheckboxesDropdown
            dropdownSx={styles.dropdown}
            label="Кафедри"
            values={cathedras}
            selected={cathedrasId}
            size={FieldSize.MEDIUM}
            handleChange={handleCathedrasChange}
          />
          <CheckboxesDropdown
            dropdownSx={styles.dropdown}
            label="Теги"
            values={tags}
            selected={roles}
            size={FieldSize.MEDIUM}
            handleChange={handleRolesChange}
          />
          <Divider orientation="vertical" sx={styles.divider} />
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
          href="/admin/teachers/create"
        />
      </Box>
    </form>
  );
};

export default TeachersAdminSearch;
