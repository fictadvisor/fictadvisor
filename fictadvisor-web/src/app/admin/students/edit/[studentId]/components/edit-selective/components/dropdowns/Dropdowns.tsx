import React, { FC, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { transformSelectives } from '@/app/admin/students/common/utils/transformToOptions';
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
import { DropdownsProps } from './types/DropdownsProps';
import * as styles from './Dropdowns.styles';

const Dropdowns: FC<DropdownsProps> = ({
  currentSelective,
  remainingSelective,
  setConnectedSelectives,
  setDisconnectedSelectives,
  connectedSelectives,
}) => {
  const [selectiveOptions, setSelectiveOptions] = useState<DropDownOption[]>(
    transformSelectives(remainingSelective.remainingSelectives),
  );
  const [availableAmount, setAvailableAmount] = useState(
    remainingSelective.availableSelectiveAmount,
  );
  const [isAddingSelective, setIsAddingSelective] = useState(false);
  const [pickedSelectives, setPickedSelectives] = useState<
    Array<{ id: string; name: string }>
  >(currentSelective?.disciplines || []);

  const editSelective = (newValue: string, oldValue: DropDownOption) => {
    setConnectedSelectives(prev => [
      ...prev.filter(selective => selective !== oldValue.id),
      newValue,
    ]);
    setDisconnectedSelectives(prev => {
      if (connectedSelectives.includes(oldValue.id)) {
        return prev;
      } else {
        return [
          ...prev.filter(selective => selective !== newValue),
          oldValue.id,
        ];
      }
    });
    const newSelectiveOptions = selectiveOptions.filter(
      selective => selective.id !== newValue,
    );
    newSelectiveOptions.push(oldValue);
    setSelectiveOptions(newSelectiveOptions);
  };

  const handleSelectiveAdd = (newValue: string) => {
    setPickedSelectives(selectives => {
      const newSelective = remainingSelective.remainingSelectives.find(
        discipline => discipline.disciplineId === newValue,
      );
      const oldSelective = currentSelective?.disciplines.find(
        discipline => discipline.id === newValue,
      );
      return newSelective
        ? [
            ...selectives,
            { id: newSelective.disciplineId, name: newSelective.subjectName },
          ]
        : [...selectives, { id: oldSelective!.id, name: oldSelective!.name }];
    });
    setDisconnectedSelectives(prev =>
      prev.filter(selective => selective !== newValue),
    );
    setConnectedSelectives(prev => [...prev, newValue]);
    setSelectiveOptions(options =>
      options.filter(selective => selective.id !== newValue),
    );
    setAvailableAmount(prev => prev - 1);
    setIsAddingSelective(false);
  };

  const handleSelectiveDelete = (value: DropDownOption) => {
    setPickedSelectives(selectives =>
      selectives.filter(selective => selective.id !== value.id),
    );
    setConnectedSelectives(selectives =>
      selectives.filter(selective => selective !== value.id),
    );
    setDisconnectedSelectives(prev =>
      connectedSelectives.includes(value.id) ? prev : [...prev, value.id],
    );
    setSelectiveOptions(options => [...options, value]);
    setAvailableAmount(prev => prev + 1);
    setIsAddingSelective(false);
  };
  return (
    <Box sx={stylesAdmin.inputsWrapper}>
      {!!pickedSelectives.length &&
        pickedSelectives.map(discipline => (
          <SelectiveDropdown
            key={discipline.id}
            options={selectiveOptions}
            discipline={discipline}
            editSelective={editSelective}
            handleSelectiveDelete={handleSelectiveDelete}
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
            onChange={handleSelectiveAdd}
            value=""
            label=""
            placeholder="Обери вибіркову"
          />
        ))}
    </Box>
  );
};
export default Dropdowns;
