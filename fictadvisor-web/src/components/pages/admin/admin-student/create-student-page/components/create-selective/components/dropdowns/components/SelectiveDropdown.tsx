import React, { FC, useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import { Dropdown, InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  IconButton,
  IconButtonColor,
} from '@/components/common/ui/icon-button';

import * as styles from './SelectiveDropdown.styles';

interface SelectiveDropdownProps {
  discipline: { id: string; name: string };
  options: DropDownOption[];
  editSelective: (newValue: string, oldValue: DropDownOption) => void;
  deleteSelective: (currentDiscipline: DropDownOption) => void;
}

const SelectiveDropdown: FC<SelectiveDropdownProps> = ({
  discipline,
  options,
  editSelective,
  deleteSelective,
}) => {
  const [currentDiscipline, setCurrentDiscipline] = useState<DropDownOption>({
    id: discipline.id,
    label: discipline.name,
  });

  return (
    <Box key={discipline.id} sx={styles.selectedSelective}>
      <Dropdown
        disableClearable
        size={FieldSize.SMALL}
        options={[...options, currentDiscipline]}
        showRemark={false}
        onChange={(value: string) => {
          editSelective(value, currentDiscipline);
          const newOption = options.find(option => option.id === value);
          setCurrentDiscipline(newOption!);
        }}
        value={currentDiscipline.id}
        label=""
        placeholder=""
      />
      <IconButton
        icon={<TrashIcon width={24} height={24} />}
        color={IconButtonColor.SECONDARY}
        onClick={() => deleteSelective(currentDiscipline)}
      />
    </Box>
  );
};
export default SelectiveDropdown;
