import React, { FC } from 'react';

import { useSchedule } from '@/store/schedule/useSchedule';
import { Group } from '@/types/group';

import Dropdown from '../../../../../common/ui/form/dropdown';
export interface DropDownSectionProps {
  groups: Group[];
}
export const GroupsDropDown: FC<DropDownSectionProps> = ({ groups }) => {
  const { useSetGroupId, groupId } = useSchedule(state => ({
    useSetGroupId: state.useSetGroupId,
    groupId: state.groupId,
  }));
  const setGroupId = useSetGroupId();

  return (
    <Dropdown
      options={
        groups
          ? groups?.map(group => ({
              id: group.id,
              label: group.code,
            }))
          : []
      }
      label="Група"
      placeholder="Оберіть групу"
      showRemark={false}
      onChange={id => {
        useSchedule.setState(state => ({ isNewEventAdded: false }));
        setGroupId(id);
      }}
      value={groupId}
      disableClearable
    />
  );
};
