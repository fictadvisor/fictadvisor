'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import { GroupEditBody } from '@/app/admin/groups/common/types';
import GroupsInfoEdit from '@/app/admin/groups/edit/[groupId]/components/groups-info-edit';
import HeaderEdit from '@/app/admin/groups/edit/[groupId]/components/header-edit';
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { getChangedValues } from '@/lib/utils/getChangedValues';

interface AdminGroupEditBodyPageProps {
  params: {
    groupId: string;
  };
}
const AdminGroupEditBodyPage: FC<AdminGroupEditBodyPageProps> = ({
  params,
}) => {
  const {
    data: group,
    isSuccess,
    isLoading,
  } = useQuery(
    ['getAdminGroup', params.groupId],
    () => GroupAPI.get(params.groupId),
    useQueryAdminOptions,
  );

  if (!isSuccess)
    throw new Error(
      `An error has occurred while editing ${params.groupId} group`,
    );

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

  if (isLoading) return <LoadPage />;

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

export default AdminGroupEditBodyPage;
