'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { UpdateGroupDTO } from '@fictadvisor/utils/requests';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Progress from '@/components/common/ui/progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import EditModerators from './components/edit-moderators';
import GroupInfoInputs from './components/group-info-inputs/GroupInfoInputs';

interface GroupsInfoEditProps {
  groupId: string;
  groupInfo: UpdateGroupDTO;
  setGroupInfo: React.Dispatch<React.SetStateAction<UpdateGroupDTO>>;
}

const GroupsInfoEdit: FC<GroupsInfoEditProps> = ({
  groupInfo,
  setGroupInfo,
  groupId,
}) => {
  const { displayError } = useToastError();

  const [moderatorIds, setModeratorIds] = useState<string[]>(
    groupInfo.moderatorIds as string[],
  );

  useEffect(() => {
    setGroupInfo(prev => ({
      ...prev,
      moderatorIds,
    }));
  }, [moderatorIds]);

  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    error,
  } = useQuery({
    queryKey: ['studentsByGroupId', groupId],
    queryFn: () => GroupAPI.getGroupStudents(groupId),
  });

  if (isLoadingStudents) return <Progress />;

  if (error) displayError(error);
  if (!studentsData) throw new Error('Error loading group data');

  return (
    <Stack sx={{ flexDirection: 'column', gap: '16px' }}>
      <Stack maxWidth={372} flexDirection="column" gap="16px">
        <GroupInfoInputs
          students={studentsData.students}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
        />
        <EditModerators
          students={studentsData.students}
          moderatorIds={moderatorIds}
          setModeratorIds={setModeratorIds}
        />
      </Stack>
    </Stack>
  );
};

export default GroupsInfoEdit;
