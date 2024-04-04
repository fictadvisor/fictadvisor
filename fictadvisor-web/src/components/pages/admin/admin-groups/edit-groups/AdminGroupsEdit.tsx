'use client';
import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { getChangedValues } from '@/lib/utils/getChangedValues';
import { Group } from '@/types/group';

import { GroupEditBody } from '../common/types';

import GroupsInfoEdit from './components/groups-info-edit';
import HeaderEdit from './components/header-edit';

interface AdminGroupsEditProps {
  group: Group;
}

const AdminGroupsEdit: FC<AdminGroupsEditProps> = ({ group }) => {
  const initialValues: GroupEditBody = {
    code: group.code,
    admissionYear: group.admissionYear,
    captainId: group.captain.id,
    moderatorIds: [],
    eduProgramId: group.educationalProgramId,
    cathedraId: group.cathedra.id,
  };
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [groupInfo, setGroupInfo] = useState<GroupEditBody>(initialValues);

  const handleEditSubmit = async () => {
    try {
      const body: Partial<GroupEditBody> = getChangedValues(
        groupInfo,
        initialValues,
      );
      await GroupAPI.editGroup(body, group.id);
      toast.success('Група успішно змінена!', '', 4000);
      router.replace('/admin/groups');
    } catch (e) {
      displayError(e);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await GroupAPI.delete(group.id);
      toast.success('Група успішно видалена!', '', 4000);
      router.replace('/admin/groups');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <HeaderEdit
        group={group}
        handleEditSubmit={handleEditSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
      />
      <GroupsInfoEdit
        groupId={group.id}
        groupInfo={groupInfo}
        setGroupInfo={setGroupInfo}
      />
    </Box>
  );
};

export default AdminGroupsEdit;
