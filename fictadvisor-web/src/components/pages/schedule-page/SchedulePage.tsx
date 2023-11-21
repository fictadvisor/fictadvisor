import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import ScheduleEventEdit from '@/components/pages/schedule-page/schedule-event-edit-section/ScheduleEventEdit';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import ScheduleAPI from '@/lib/api/schedule/ScheduleAPI';
import { PostEventBody } from '@/lib/api/schedule/types/PostEventBody';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { useSchedule } from '@/store/schedule/useSchedule';
import theme from '@/styles/theme';
import { Group } from '@/types/group';

import { CalendarSection } from './calendar-section/CalendarSection';
import { ButtonIcons } from './calendar-section/components/mobile/buttonIcons/ButtonIcons';
import { CalendarSectionMobile } from './calendar-section/components/mobile/CalendarSectionMobile';
import { initialValues } from './schedule-event-edit-section/schedule-form/constants';
import { ScheduleEventForm } from './schedule-event-edit-section/schedule-form/ScheduleEventForm';
import { formValidationSchema } from './schedule-event-edit-section/schedule-form/validation';
import { ScheduleSection } from './schedule-section/ScheduleSection';
import ScheduleSectionMobile from './schedule-section/ScheduleSectionMobile';
import { makeNegativeValuesUndefined } from './utils/undefineNegativeValues';
import * as styles from './SchedulePage.styles';
export interface SchedulePageProps {
  groups: Group[];
  semester: GetCurrentSemester | null;
}

/*
 * TODO:
 * [x] Make schedule responsive for tablet users
 * [x] Make red button show current time, but not chosen day
 * [x] Merge all prs into schedule to work on 1 repo
 * [x] Start developing side panel
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

  const getEvents = async () => {
    await handleWeekChange();
  };

  useInitialise(semester, groups);
  useEffect(() => {
    getEvents();
  }, []);
  const { displayError } = useToastError();
  const closeForm = () => {
    useSchedule.setState({ isNewEventAdded: false });
  };

  const handleFormSubmit = async (values: SharedEventBody) => {
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
    <PageLayout
      title={'Розклад'}
      description="FICT Advisor представляє оновлений розклад занять для студентів ФІОТу КПІ. Переглядай та фільтруй
       пари, переходь до конференцій, додавай власні та змінюй вже наявні події."
    >
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
