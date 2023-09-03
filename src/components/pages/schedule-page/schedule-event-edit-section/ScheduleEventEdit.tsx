import { Fragment, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { editFormValidationSchema } from '@/components/pages/schedule-page/schedule-event-edit-section/schedule-form/validation';
import ScheduleInfoCard from '@/components/pages/schedule-page/schedule-event-edit-section/schedule-info-card';
import { prepareData } from '@/components/pages/schedule-page/schedule-event-edit-section/utils/prepareData';
import { transformDetailedEvent } from '@/components/pages/schedule-page/schedule-event-edit-section/utils/transformDetailedEvent';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import ScheduleAPI from '@/lib/api/schedule/ScheduleAPI';
import { DetailedEventBody } from '@/lib/api/schedule/types/DetailedEventBody';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { useSchedule } from '@/store/schedule/useSchedule';
import { getWeekByDate } from '@/store/schedule/utils/getWeekByDate';
import { UserGroupRole } from '@/types/user';

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
        semester as GetCurrentSemester,
        new Date(openedEvent?.startTime as string),
      ),
    [openedEvent],
  );

  const { isLoading, data } = useQuery(
    ['event', openedEvent?.id, week],
    () => ScheduleAPI.getEventInfo(openedEvent?.id as string, week),
    {
      onSuccess: data => {
        setDetailedEvent(data);
      },
      onError: err => {
        displayError(err);
        useSchedule.setState(state => ({ openedEvent: undefined }));
      },
      retry: false,
    },
  );

  const [detailedEvent, setDetailedEvent] = useState<
    undefined | DetailedEventBody
  >(data);

  const { user } = useAuthentication();

  const closeWindow = () => {
    setIsEditOpen(false);
    useSchedule.setState({ openedEvent: undefined });
  };

  const handleEventEdited = async (values: SharedEventBody) => {
    const body = prepareData(
      values,
      transformDetailedEvent(detailedEvent as DetailedEventBody),
      week,
    );

    try {
      const data = await ScheduleAPI.editEvent(
        body,
        user.group?.id as string,
        openedEvent?.id as string,
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
    if (user.group?.role !== UserGroupRole.STUDENT) setIsEditOpen(true);
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
          validationSchema={editFormValidationSchema}
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
