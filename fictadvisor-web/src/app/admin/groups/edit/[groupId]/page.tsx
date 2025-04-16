'use client';
import React, { FC, useCallback, useState } from 'react';
import { UpdateGroupDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
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
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getAdminGroup', params.groupId],
    queryFn: () => GroupAPI.get(params.groupId),
    ...useQueryAdminOptions,
  });

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [groupInfo, setGroupInfo] = useState<UpdateGroupDTO>({});

  const handleEditSubmit = async () => {
    if (!groupInfo || !group) return;

    const initialValues: UpdateGroupDTO = {
      code: group.code,
      admissionYear: group.admissionYear,
      eduProgramId: group.educationalProgramId,
      cathedraId: group.cathedra.id,
      captainId: group.captain.id,
      moderatorIds: [],
    };

    try {
      const body: Partial<UpdateGroupDTO> = getChangedValues(
        groupInfo,
        initialValues,
      );
      await GroupAPI.editGroup(params.groupId, body);
      toast.success('Група успішно змінена!', '', 4000);
      router.replace('/admin/groups');
    } catch (e) {
      displayError(e);
    }
  };

  const handleDeleteSubmit = useCallback(async () => {
    if (!groupInfo) return;

    try {
      await GroupAPI.delete(params.groupId);
      toast.success('Група успішно видалена!', '', 4000);
      router.replace('/admin/groups');
    } catch (e) {
      displayError(e);
    }
  }, [groupInfo]);

  if (isLoading) return <LoadPage />;

  if (error) {
    displayError(error);
    throw new Error(
      `An error has occurred while editing ${params.groupId} group`,
    );
  }

  return (
    <>
      {group && (
        <Box sx={{ p: '16px' }}>
          <HeaderEdit
            group={group}
            handleEditSubmit={handleEditSubmit}
            handleDeleteSubmit={handleDeleteSubmit}
          />
          <GroupsInfoEdit group={group} setGroupInfo={setGroupInfo} />
        </Box>
      )}
    </>
  );
};

export default AdminGroupEditBodyPage;
