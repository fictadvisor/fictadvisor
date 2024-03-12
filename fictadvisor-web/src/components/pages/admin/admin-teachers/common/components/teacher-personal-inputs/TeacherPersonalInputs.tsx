'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Avatar, Box, SelectChangeEvent, Stack } from '@mui/material';
import { isAxiosError } from 'axios';

import CheckboxesDropdown from '@/components/common/ui/form/checkboxes-dropdown/CheckboxesDropdown';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import { InputSize } from '@/components/common/ui/form/input-mui/types';
import TextArea from '@/components/common/ui/form/text-area-mui';
import Progress from '@/components/common/ui/progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import { TeacherCathedra } from '@/types/teacher';

import { PersonalInfo } from '../../../create-teacher-admin-page/types';

import ChangeAvatar from './components/change-avatar-window/ChangeAvatar';
import * as styles from './TeacherPersonalInputs.styles';

interface TeacherPersonalInputsProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  selectedCathedras: CheckboxesDropdownOption[];
  setSelectedCathedras: React.Dispatch<
    React.SetStateAction<CheckboxesDropdownOption[]>
  >;
}

const TeacherPersonalInputs: FC<TeacherPersonalInputsProps> = ({
  personalInfo,
  setPersonalInfo,
  selectedCathedras,
  setSelectedCathedras,
}) => {
  const toast = useToastError();
  const [firstName, setFirstName] = useState<string>(personalInfo.firstName);
  const [lastName, setLastName] = useState<string>(personalInfo.lastName);
  const [middleName, setMiddleName] = useState<string>(personalInfo.middleName);
  const [description, setDescription] = useState<string>(
    personalInfo.description,
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(personalInfo.avatar);

  const [popupOpen, setPopupOpen] = useState(false);

  const { data: cathedrasData, isLoading } = useQuery(
    'cathedras',
    () => CathedraAPI.getAll(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error);
        }
      },
    },
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setPersonalInfo(prev => ({
        ...prev,
        firstName,
        lastName,
        middleName,
        description,
        avatar: avatarUrl,
      }));
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [firstName, lastName, middleName, description, avatarUrl]);

  if (!cathedrasData || isLoading) return <Progress />;

  const cathedrasOptions = cathedrasData.cathedras.map(
    (cathedra: TeacherCathedra) => ({
      id: cathedra.id,
      label: cathedra.abbreviation,
      value: cathedra.name,
    }),
  );

  const handleCathedraChange = (event: SelectChangeEvent) => {
    const cathedras = [...(event.target.value as unknown as string[])];

    setSelectedCathedras(() => {
      return cathedras.map(cathedra => {
        const foundCathedra = cathedrasOptions.find(
          option => option.value === cathedra,
        );
        return {
          id: foundCathedra!.id,
          value: foundCathedra!.value,
          label: foundCathedra!.label,
        };
      });
    });
  };

  return (
    <Stack sx={styles.wrapper}>
      <Stack flexDirection="row" gap="36px">
        <Stack maxWidth={308} flexDirection="column" gap="16px">
          <Input
            size={InputSize.MEDIUM}
            sx={styles.input}
            label="Ім'я"
            value={firstName}
            onChange={setFirstName}
          />
          <Input
            size={InputSize.MEDIUM}
            sx={styles.input}
            label="Прізвище"
            value={lastName}
            onChange={setLastName}
          />
          <Input
            size={InputSize.MEDIUM}
            sx={styles.input}
            label="По-батькові"
            value={middleName}
            onChange={setMiddleName}
          />
          <CheckboxesDropdown
            values={cathedrasOptions}
            selected={selectedCathedras}
            handleChange={handleCathedraChange}
            size={FieldSize.MEDIUM}
            label="Кафедри"
          />
        </Stack>

        <Box sx={styles.avatarInfo}>
          <Box onClick={() => setPopupOpen(true)} sx={styles.avatar}>
            <Avatar
              src={personalInfo.avatar}
              sx={{ width: 160, height: 160 }}
            />
            <Box>
              <PencilIcon />
            </Box>
          </Box>
        </Box>
        {popupOpen && (
          <ChangeAvatar
            setPopupOpen={setPopupOpen}
            setAvatarUrl={setAvatarUrl}
          />
        )}
      </Stack>
      <TextArea
        label="Опис викладача"
        value={description}
        sx={styles.textArea}
        onChange={setDescription}
      />
    </Stack>
  );
};

export default TeacherPersonalInputs;
