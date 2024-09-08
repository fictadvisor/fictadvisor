import { Fragment, useEffect, useMemo, useState } from 'react';
import { CurrentSemester } from '@fictadvisor/utils/responses';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import { formValidationSchema } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/schedule-form/validation';
import ScheduleInfoCard from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/schedule-info-card';
import { prepareData } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/utils/prepareData';
import { transformDetailedEvent } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/utils/transformDetailedEvent';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ScheduleAPI from '@/lib/api/schedule/ScheduleAPI';
import { EventResponse } from '@/lib/api/schedule/types/EventResponse';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { useSchedule } from '@/store/schedule/useSchedule';
import { getWeekByDate } from '@/store/schedule/utils/getWeekByDate';

import { ScheduleEventForm } from './schedule-form/ScheduleEventForm';

//TODO:ADD ERROR HANDLING
export const ScheduleEventEdit = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { openedEvent, semester, handleWeekChange } = useSchedule(state => ({
    openedEvent: state.openedEvent,
    semester: state.semester,
    handleWeekChange: state.handleWeekChange,
  }));
  const { displayError } = useToastError();

  const week = useMemo(
    () =>
      getWeekByDate(
        semester as CurrentSemester,
        moment(openedEvent?.startTime as string),
      ),
    [openedEvent],
  );

  const { isLoading, data, isSuccess, error, isError } = useQuery({
    queryKey: ['event', openedEvent?.id, week],
    queryFn: () => ScheduleAPI.getEventInfo(openedEvent?.id as string, week),

    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setDetailedEvent(data);
    }
    if (isError) {
      displayError(error);
      useSchedule.setState(state => ({ openedEvent: undefined }));
    }
  }, [data]);

  const [detailedEvent, setDetailedEvent] = useState<undefined | EventResponse>(
    data,
  );

  const { user } = useAuthentication();

  const closeWindow = () => {
    setIsEditOpen(false);
    useSchedule.setState({ openedEvent: undefined });
  };

  const handleEventEdited = async (values: SharedEventBody) => {
    const body = prepareData(
      values,
      transformDetailedEvent(detailedEvent as EventResponse),
      week,
    );

    try {
      const data = await ScheduleAPI.editEvent(
        user.group?.id as string,
        openedEvent?.id as string,
        body,
      );
      setDetailedEvent(data);
      setIsEditOpen(false);
      useSchedule.setState(state => ({ eventsBody: [] }));
      await handleWeekChange();
    } catch (error) {
      displayError(error);
    }
  };

  const handleEventDelete = async () => {
    try {
      const data = await ScheduleAPI.deleteEventById(
        user.group?.id as string,
        openedEvent?.id as string,
      );
      setIsEditOpen(false);
      useSchedule.setState(state => ({
        eventsBody: [],
        openedEvent: undefined,
      }));
      await handleWeekChange();
    } catch (error) {
      displayError(error);
    }
  };

  const handleEventEditClick = () => {
    setIsEditOpen(true);
  };

  useEffect(() => {
    setIsEditOpen(false);
  }, [openedEvent?.id, week]);

  return (
    <Fragment>
      {!isEditOpen && (
        <ScheduleInfoCard
          onCloseButtonClick={closeWindow}
          onEventEditButtonClick={handleEventEditClick}
          loading={isLoading}
          event={detailedEvent}
        />
      )}
      {isEditOpen && detailedEvent && (
        <ScheduleEventForm
          validationSchema={formValidationSchema}
          onDeleteButtonClick={handleEventDelete}
          onCancelButtonClick={() => setIsEditOpen(false)}
          onCloseButtonClick={closeWindow}
          onSubmit={handleEventEdited}
          initialValues={transformDetailedEvent(detailedEvent)}
        />
      )}
    </Fragment>
  );
};

export default ScheduleEventEdit;
