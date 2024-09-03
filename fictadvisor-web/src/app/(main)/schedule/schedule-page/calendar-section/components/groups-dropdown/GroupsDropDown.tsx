'use client';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';

import { Dropdown } from '@/components/common/ui/form';
import { useSchedule } from '@/store/schedule/useSchedule';

export interface DropDownSectionProps {
  groups: MappedGroupResponse[];
}

export const GroupsDropDown: FC<DropDownSectionProps> = ({ groups }) => {
  const { useSetGroupId, groupId } = useSchedule(state => ({
    useSetGroupId: state.useSetGroupId,
    groupId: state.groupId,
  }));
  const setGroupId = useSetGroupId();

  const memoGroups = useMemo(
    () =>
      groups.map(group => ({
        id: group.id,
        label: group.code,
      })),
    [groups.length],
  );

  const onChangeMemo = useCallback(
    (id: string) => {
      useSchedule.setState(state => ({ isNewEventAdded: false }));
      setGroupId(id);
    },
    [setGroupId],
  );

  return (
    <Dropdown
      options={memoGroups}
      label="Група"
      placeholder="Оберіть групу"
      showRemark={false}
      onChange={onChangeMemo}
      value={groupId}
      disableClearable
    />
  );
};
