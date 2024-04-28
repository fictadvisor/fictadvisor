import React, { FC, Fragment } from 'react';
import { useQuery } from 'react-query';
import { CurrentSemester } from '@fictadvisor/utils/responses';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { AddDeleteTeachers } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/schedule-form/components/add-delete-teachers/AddDeleteTeachers';
import { ScheduleFormikDropdown } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/schedule-form/components/schedule-dropdown/ScheduleDropdown';
import { skeletonProps } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/utils/skeletonProps';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ScheduleAPI from '@/lib/api/schedule/ScheduleAPI';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { useSchedule } from '@/store/schedule/useSchedule';

import {
  getDisciplineOptions,
  getTeacherOptions,
} from '../add-delete-teachers/utils';

export interface DisciplineRelatedFieldsProps {
  values: SharedEventBody;
}

export const DisciplineRelatedFields: FC<DisciplineRelatedFieldsProps> = ({
  values,
}) => {
  const groupId = useSchedule(state => state.groupId);
  const semester = useSchedule(state => state.semester);
  const { displayError } = useToastError();

  const { isLoading, data } = useQuery(
    'dataAboutGroup',
    () =>
      ScheduleAPI.getDisciplinesAndTeachers(
        groupId,
        semester as CurrentSemester,
      ),
    {
      onError: err => displayError(err),
    },
  );

  return (
    <Fragment>
      <Typography variant="body1Medium" alignSelf="start">
        Викладач
      </Typography>
      {isLoading || !data ? (
        <Skeleton {...skeletonProps} width={300} height={50} />
      ) : (
        <AddDeleteTeachers
          name={'teachers'}
          teacherOptions={getTeacherOptions(data?.teachers)}
        />
      )}
      <Typography variant="body1Medium">Дисципліна</Typography>
      {isLoading || !data ? (
        <Skeleton {...skeletonProps} width={300} height={50} />
      ) : (
        <ScheduleFormikDropdown
          name={'disciplineId'}
          options={getDisciplineOptions(data.disciplines)}
          placeholder={'Оберіть дисципліну'}
          icon={<BriefcaseIcon width={24} height={24} />}
        />
      )}
    </Fragment>
  );
};
