import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import ModeratorDropdown from './components/moderator-dropdowns/ModeratorDropdown';
import * as styles from './CreateModerators.styles';

interface EditModeratorsProps {
  students: OrdinaryStudentResponse[];
  moderatorIds: string[];
  setModeratorIds: Dispatch<SetStateAction<string[]>>;
}

const EditModerators: FC<EditModeratorsProps> = ({
  students,
  moderatorIds,
  setModeratorIds,
}) => {
  const [currentsModerators, setCurrentsModerators] = useState(
    students.filter(student => moderatorIds.includes(student.id)),
  );
  const [isAddingModerator, setIsAddingModerator] = useState(false);
  const [studentsOptions, setStudentsOptions] = useState<DropDownOption[]>(
    students.map(student => ({
      label: `${student.lastName} ${student.firstName} ${student.middleName}`,
      id: student.id,
    })),
  );

  const handleModeratorChange = (
    newValue: string,
    oldValue: DropDownOption,
  ) => {
    const newModerator = students.find(option => option.id === newValue)!;
    setCurrentsModerators(prev => [
      ...prev.filter(moderator => moderator.id !== oldValue.id),
      newModerator,
    ]);
    setModeratorIds(prev => {
      return [...prev.filter(student => student !== oldValue.id), newValue];
    });
    const newStudentsOptions = studentsOptions.filter(
      students => students.id !== newValue,
    );
    newStudentsOptions.push(oldValue);
    setStudentsOptions(newStudentsOptions);
  };

  const handleModeratorAdd = (newValue: string) => {
    const newModerator = students.find(student => student.id === newValue)!;
    setCurrentsModerators(prev => [...prev, newModerator]);
    setModeratorIds(prev => [...prev, newValue]);
    setStudentsOptions(options =>
      options.filter(student => student.id !== newValue),
    );
    setIsAddingModerator(false);
  };

  const handleModeratorRemove = (value: DropDownOption) => {
    setCurrentsModerators(moderators =>
      moderators.filter(moderator => moderator.id !== value.id),
    );
    setModeratorIds(moderators =>
      moderators.filter(moderator => moderator !== value.id),
    );
    setStudentsOptions(options => [...options, value]);
    setIsAddingModerator(false);
  };

  return (
    <Box sx={styles.moderatorsWrapper}>
      <Box sx={styles.inputsWrapper}>
        {!!currentsModerators.length &&
          currentsModerators.map(currentModerator => (
            <ModeratorDropdown
              key={currentModerator.username}
              options={studentsOptions}
              handleModeratorChange={handleModeratorChange}
              moderator={currentModerator}
              handleModeratorRemove={handleModeratorRemove}
            />
          ))}
        {!isAddingModerator ? (
          <Box sx={styles.addButton}>
            <Button
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.OUTLINE}
              size={ButtonSize.SMALL}
              text="Додати зам старосту"
              startIcon={<PlusIcon />}
              onClick={() => setIsAddingModerator(true)}
            />
          </Box>
        ) : (
          <Box sx={{ maxWidth: '308px' }}>
            <Dropdown
              size={FieldSize.MEDIUM}
              options={studentsOptions}
              showRemark={false}
              onChange={handleModeratorAdd}
              value=""
              label=""
              placeholder="Додай зам старосту"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default EditModerators;
