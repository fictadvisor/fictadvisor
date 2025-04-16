import React, { FC, useState } from 'react';
import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  IconButton,
  IconButtonColor,
} from '@/components/common/ui/icon-button';

import * as styles from './ModeratorDropdown.styles';

interface ModeratorDropdownProps {
  moderator: OrdinaryStudentResponse;
  options: DropDownOption[];
  handleModeratorRemove: (value: DropDownOption) => void;
  handleModeratorChange: (newValue: string, oldValue: DropDownOption) => void;
}

const ModeratorDropdown: FC<ModeratorDropdownProps> = ({
  moderator,
  options,
  handleModeratorRemove,
  handleModeratorChange,
}) => {
  const [currentModerator, setCurrentModerator] = useState<DropDownOption>({
    id: moderator.id,
    label: `${moderator.lastName} ${moderator.firstName} ${moderator.middleName}`,
  });

  return (
    <Box key={moderator.id} sx={styles.selected}>
      <Box sx={{ maxWidth: '308px', width: '100%' }}>
        <Dropdown
          disableClearable
          size={FieldSize.MEDIUM}
          options={[...options, currentModerator]}
          showRemark={false}
          onChange={(value: string) => {
            handleModeratorChange(value, currentModerator);
            const newOption = options.find(option => option.id === value);
            setCurrentModerator(newOption!);
          }}
          value={currentModerator.id}
          label="Заст. старости"
          placeholder="Заст. старости"
        />
      </Box>
      <IconButton
        icon={<TrashIcon width={24} height={24} />}
        color={IconButtonColor.SECONDARY}
        onClick={() => {
          handleModeratorRemove(currentModerator);
        }}
      />
    </Box>
  );
};
export default ModeratorDropdown;
