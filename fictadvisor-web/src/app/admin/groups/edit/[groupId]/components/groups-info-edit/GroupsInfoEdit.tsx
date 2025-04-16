'use client';
import type { Dispatch, FC, SetStateAction } from 'react';
import { UpdateGroupDTO } from '@fictadvisor/utils/requests';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Progress from '@/components/common/ui/progress';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';

import EditModerators from './components/edit-moderators';
import GroupInfoInputs from './components/group-info-inputs/GroupInfoInputs';

interface GroupsInfoEditProps {
  group: MappedGroupResponse;
  setGroupInfo: Dispatch<SetStateAction<UpdateGroupDTO>>;
}

const GroupsInfoEdit: FC<GroupsInfoEditProps> = ({ group, setGroupInfo }) => {
  const { displayError } = useToastError();

  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    error,
  } = useQuery({
    queryKey: ['studentsByGroupId', group.id],
    queryFn: () => GroupAPI.getGroupStudents(group.id),
  });

  if (isLoadingStudents) return <Progress />;

  if (error) displayError(error);
  if (!studentsData) throw new Error('Error loading group data');

  return (
    <>
      {studentsData && (
        <Stack sx={{ flexDirection: 'column', gap: '16px' }}>
          <Stack maxWidth={372} flexDirection="column" gap="16px">
            <GroupInfoInputs
              students={studentsData.students}
              group={group}
              setGroupInfo={setGroupInfo}
            />
            <EditModerators
              students={studentsData.students}
              setGroupInfo={setGroupInfo}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default GroupsInfoEdit;
