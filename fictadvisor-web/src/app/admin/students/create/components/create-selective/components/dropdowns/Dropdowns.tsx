import React, { FC, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { transformSelectivesDefault } from '@/app/admin/students/common/utils/transformToOptions';
import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import SelectiveDropdown from './components/SelectiveDropdown';
import * as styles from './Dropdowns.styles';

interface DropdownsProps {
  remainingSelective: {
    year: number;
    semester: 1 | 2;
    selective: Array<{
      id: string;
      name: string;
    }>;
    amount: number;
  };
  setConnectedSelective: React.Dispatch<React.SetStateAction<string[]>>;
}

const Dropdowns: FC<DropdownsProps> = ({
  remainingSelective,
  setConnectedSelective,
}) => {
  const [selectiveOptions, setSelectiveOptions] = useState<DropDownOption[]>(
    transformSelectivesDefault(remainingSelective.selective),
  );

  const [pickedSelectives, setPickedSelectives] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const [availableAmount, setAvailableAmount] = useState(
    remainingSelective.amount,
  );
  const [isAddingSelective, setIsAddingSelective] = useState(false);

  function deleteSelective(currentDiscipline: DropDownOption) {
    setPickedSelectives(prev => {
      return prev.filter(selective => selective.id !== currentDiscipline.id);
    });
    setConnectedSelective(prev => {
      return prev.filter(selective => selective !== currentDiscipline.id);
    });
    setSelectiveOptions(options => [...options, currentDiscipline]);
    setAvailableAmount(prev => prev + 1);
  }

  const editSelective = (newValue: string, oldValue: DropDownOption) => {
    setConnectedSelective(prev => [
      ...prev.filter(selective => selective !== oldValue.id),
      newValue,
    ]);
    const newRemainingSelectives = selectiveOptions.filter(
      selective => selective.id !== newValue,
    );
    newRemainingSelectives.push(oldValue);
    setSelectiveOptions(newRemainingSelectives);
  };

  const handleSelectiveAdd = (newValue: string) => {
    const newSelective = remainingSelective.selective.find(
      discipline => discipline.id === newValue,
    );
    setPickedSelectives(selectives => [...selectives, newSelective!]);
    setConnectedSelective(prev => {
      return [...prev, newValue];
    });
    setSelectiveOptions(options =>
      options.filter(selective => selective.id !== newValue),
    );
    setAvailableAmount(prev => prev - 1);
    setIsAddingSelective(false);
  };

  return (
    <Box sx={stylesAdmin.inputsWrapper}>
      {pickedSelectives &&
        pickedSelectives.map(discipline => (
          <SelectiveDropdown
            key={discipline.id}
            options={selectiveOptions}
            discipline={discipline}
            editSelective={editSelective}
            deleteSelective={deleteSelective}
          />
        ))}
      {!!availableAmount &&
        (!isAddingSelective ? (
          <Box sx={styles.addButton}>
            <Button
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.OUTLINE}
              size={ButtonSize.SMALL}
              text="Додати"
              startIcon={<PlusIcon width={24} height={24} />}
              onClick={() => setIsAddingSelective(true)}
            />
          </Box>
        ) : (
          <Dropdown
            size={FieldSize.SMALL}
            options={selectiveOptions}
            showRemark={false}
            onChange={(value: string) => {
              handleSelectiveAdd(value);
            }}
            value=""
            label=""
            placeholder="Обери вибіркову"
          />
        ))}
    </Box>
  );
};
export default Dropdowns;
