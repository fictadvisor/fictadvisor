'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Stack } from '@mui/material';

import Progress from '@/components/common/ui/progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { GroupEditBody } from '../../../common/types';
import { extractModeratorsIds } from '../../../common/utils/extractModeratorsIds';

import EditModerators from './components/edit-moderators';
import GroupInfoInputs from './components/group-info-inputs/GroupInfoInputs';

interface GroupsInfoEditProps {
  groupId: string;
  groupInfo: GroupEditBody;
  setGroupInfo: React.Dispatch<React.SetStateAction<GroupEditBody>>;
}

const GroupsInfoEdit: FC<GroupsInfoEditProps> = ({
  groupInfo,
  setGroupInfo,
  groupId,
}) => {
  const toastError = useToastError();

  const [moderatorIds, setModeratorIds] = useState<string[]>(
    groupInfo.moderatorIds,
  );

  useEffect(() => {
    setGroupInfo(prev => ({
      ...prev,
      moderatorIds,
    }));
  }, [moderatorIds]);

  const { data: studentsData, isLoading: isLoadingStudents } = useQuery(
    ['studentsByGroupId', groupId],
    () => GroupAPI.getGroupStudents(groupId),
    {
      onSettled(data, error) {
        if (error) {
          toastError.displayError(error);
        } else {
          if (data) setModeratorIds(extractModeratorsIds(data.students));
        }
      },
    },
  );

  if (isLoadingStudents || !studentsData) return <Progress />;

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
