'use client';
import { FC } from 'react';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import { CalendarSection } from '@/app/schedule/schedule-page/calendar-section/CalendarSection';
import { ButtonIcons } from '@/app/schedule/schedule-page/calendar-section/components/mobile/buttonIcons/ButtonIcons';
import { CalendarSectionMobile } from '@/app/schedule/schedule-page/calendar-section/components/mobile/CalendarSectionMobile';
import { initialValues } from '@/app/schedule/schedule-page/schedule-event-edit-section/schedule-form/constants';
import { ScheduleEventForm } from '@/app/schedule/schedule-page/schedule-event-edit-section/schedule-form/ScheduleEventForm';
import { formValidationSchema } from '@/app/schedule/schedule-page/schedule-event-edit-section/schedule-form/validation';
import ScheduleEventEdit from '@/app/schedule/schedule-page/schedule-event-edit-section/ScheduleEventEdit';
import { ScheduleSection } from '@/app/schedule/schedule-page/schedule-section/ScheduleSection';
import ScheduleSectionMobile from '@/app/schedule/schedule-page/schedule-section/ScheduleSectionMobile';
import { makeNegativeValuesUndefined } from '@/app/schedule/schedule-page/utils/undefineNegativeValues';
import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import ScheduleAPI from '@/lib/api/schedule/ScheduleAPI';
import { PostEventBody } from '@/lib/api/schedule/types/PostEventBody';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { useSchedule } from '@/store/schedule/useSchedule';
import theme from '@/styles/theme';
import { Group } from '@/types/group';

import * as styles from './SchedulePage.styles';
export interface SchedulePageProps {
  groups: Group[];
  semester: GetCurrentSemester | null;
}

/*
 * TODO:
 * [] Optimise components for mobile and for desktop using dynamic imports
 * [] Add global state for maximum week number
 * */
const SchedulePage: FC<SchedulePageProps> = ({ semester, groups }) => {
  const [
    useInitialise,
    handleWeekChange,
    groupId,
    openedEvent,
    isNewEventAdded,
  ] = useSchedule(state => [
    state.useInitialise,
    state.handleWeekChange,
    state.groupId,
    state.openedEvent,
    state.isNewEventAdded,
  ]);

  useInitialise(semester, groups);

  const { displayError } = useToastError();
  const closeForm = () => {
    useSchedule.setState({ isNewEventAdded: false });
  };

  const handleFormSubmit = async (values: SharedEventBody) => {
    await formValidationSchema.validate(values, { abortEarly: false });

    const finalValues: PostEventBody = makeNegativeValuesUndefined(values);
    finalValues.groupId = groupId;
    try {
      await ScheduleAPI.addEvent(finalValues, groupId);
      useSchedule.setState(state => ({
        eventsBody: [],
        isNewEventAdded: false,
      }));
      await handleWeekChange();
    } catch (e) {
      displayError(e);
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <PageLayout>
      <Box sx={styles.schedulePage}>
        {isMobile ? (
          <CalendarSectionMobile groups={groups} />
        ) : (
          <CalendarSection groups={groups} />
        )}
        {isMobile && <ButtonIcons />}

        {isMobile ? <ScheduleSectionMobile /> : <ScheduleSection />}
      </Box>
      {openedEvent && <ScheduleEventEdit />}
      {isNewEventAdded && (
        <ScheduleEventForm
          onCloseButtonClick={closeForm}
          onCancelButtonClick={closeForm}
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          onSubmit={handleFormSubmit}
          isNewEvent
        />
      )}
    </PageLayout>
  );
};

export default SchedulePage;
