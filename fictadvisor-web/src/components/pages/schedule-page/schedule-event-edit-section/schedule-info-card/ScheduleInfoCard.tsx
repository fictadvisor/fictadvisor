import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { PERMISSION } from '@fictadvisor/utils/security';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import Link from '@/components/common/ui/custom-link/CustomLink';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { CloseButton } from '@/components/common/ui/icon-button-mui/variants';
import { Tab, TabContext, TabList, TabPanel } from '@/components/common/ui/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import Tag from '@/components/common/ui/tag';
import { TagColor } from '@/components/common/ui/tag/types';
import TextWithLinks from '@/components/pages/schedule-page/schedule-event-edit-section/schedule-info-card/components/TextWithLinks';
import { InfoCardTabs } from '@/components/pages/schedule-page/schedule-event-edit-section/types';
import { getStringTime } from '@/components/pages/schedule-page/utils/getStringTime';
import useAuthentication from '@/hooks/use-authentication';
import { DetailedEventBody } from '@/lib/api/schedule/types/DetailedEventBody';
import PermissionService from '@/lib/services/permisson/PermissionService';
import { PermissionData } from '@/lib/services/permisson/types';
import { TEvent } from '@/types/schedule';

import { skeletonProps } from '../utils/skeletonProps';

import * as styles from './ScheduleInfoCard.styles';

const TagLabelMapper: Record<string, string> = {
  [TEvent.LABORATORY]: 'Лабораторна',
  [TEvent.EXAM]: 'Екзамен',
  [TEvent.WORKOUT]: 'Відпрацювання',
  [TEvent.PRACTICE]: 'Практика',
  [TEvent.LECTURE]: 'Лекція',
  [TEvent.CONSULTATION]: 'Консультація',
  [TEvent.OTHER]: 'Інша подія',
};

const TagColorMapper: Record<string, TagColor> = {
  [TEvent.LABORATORY]: TagColor.MINT,
  [TEvent.EXAM]: TagColor.VIOLET,
  [TEvent.WORKOUT]: TagColor.PRIMARY,
  [TEvent.PRACTICE]: TagColor.ORANGE,
  [TEvent.LECTURE]: TagColor.INDIGO,
  [TEvent.CONSULTATION]: TagColor.SUCCESS,
  [TEvent.OTHER]: TagColor.SECONDARY,
};

interface ScheduleInfoCardProps {
  onEventEditButtonClick: () => void;
  onCloseButtonClick: () => void;
  loading: boolean;
  event?: DetailedEventBody;
}

const ScheduleInfoCard: FC<ScheduleInfoCardProps> = ({
  onEventEditButtonClick,
  onCloseButtonClick,
  event,
  loading,
}) => {
  const [tabValue, setTabValue] = useState<InfoCardTabs>(InfoCardTabs.EVENT);
  const { user } = useAuthentication();
  const isDisciplineRelatedType = (eventType: string | TEvent | undefined) => {
    return eventType !== TEvent.OTHER;
  };

  const permissionValues: PermissionData = {
    groupId: user.group?.id,
  };

  const { data } = useQuery(
    [],
    () => PermissionService.getPermissionList(user.id, permissionValues),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const validPrivilege =
    data?.[PERMISSION.GROUPS_$GROUPID_EVENTS_DELETE] &&
    data?.[PERMISSION.GROUPS_$GROUPID_EVENTS_UPDATE];

  if (!event) return null;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        {loading ? (
          <Skeleton {...skeletonProps} width={350} height={50} />
        ) : (
          <Typography variant="h5" paragraph>
            {event?.name}
          </Typography>
        )}
        <Box sx={{ display: 'flex' }}>
          {validPrivilege && (
            <IconButton
              color={IconButtonColor.TRANSPARENT}
              icon={<PencilSquareIcon width={36} height={36} />}
              onClick={loading ? () => {} : onEventEditButtonClick}
            />
          )}
          <CloseButton onClick={onCloseButtonClick} />
        </Box>
      </Box>
      <Box sx={styles.content}>
        <Typography variant="body1Medium">Тип</Typography>
        {loading ? (
          <Skeleton {...skeletonProps} width={100} height={25} />
        ) : (
          <Tag
            text={TagLabelMapper[event.eventType]}
            color={TagColorMapper[event.eventType]}
          />
        )}
        {isDisciplineRelatedType(event.eventType) ? (
          <>
            <Typography variant="body1Medium">Викладач</Typography>
            <Box sx={styles.teachersContainer}>
              {loading ? (
                <Skeleton {...skeletonProps} width={200} height={45} />
              ) : !event!.teachers || event!.teachers.length === 0 ? (
                <Typography variant="body1Medium">
                  Інформація про викладачів відсутня
                </Typography>
              ) : (
                event?.teachers.map(teacher => (
                  <Link
                    key={teacher.id}
                    href={`/teachers/${teacher.id}`}
                    text={`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}
                    target={'_blank'}
                  />
                ))
              )}
            </Box>
          </>
        ) : (
          ''
        )}
        <Typography variant="body1Medium">Час</Typography>
        {loading ? (
          <Skeleton {...skeletonProps} width={50} height={25} />
        ) : (
          <Typography>
            {`${getStringTime(event!.startTime)} -  
            ${getStringTime(event!.endTime)}`}
          </Typography>
        )}
        <Typography variant="body1Medium">Конференція</Typography>
        {loading ? (
          <Skeleton {...skeletonProps} width={250} height={20} />
        ) : event?.url ? (
          <Link
            sx={styles.linkContainer}
            href={event?.url as string}
            text={event?.url}
            target={'_blank'}
          />
        ) : (
          <Typography>Посилання відсутнє</Typography>
        )}
      </Box>

      <Box sx={styles.infoContainer}>
        <TabContext value={tabValue}>
          <TabList onChange={(_, value) => setTabValue(value)}>
            <Tab
              disableRipple
              label="Про подію"
              textPosition={TabTextPosition.CENTER}
              value={InfoCardTabs.EVENT}
            />
            {isDisciplineRelatedType(event.eventType) ? (
              <Tab
                disableRipple
                label="Про дисципліну"
                textPosition={TabTextPosition.CENTER}
                value={InfoCardTabs.DISCIPLINE}
              />
            ) : (
              ''
            )}
          </TabList>

          <TabPanel value={InfoCardTabs.EVENT}>
            {loading ? (
              <Skeleton {...skeletonProps} width={400} height={25} />
            ) : (
              <TextWithLinks
                infoText={event?.eventInfo}
                defaultText="Інформація про подію відсутня"
              />
            )}
          </TabPanel>
          <TabPanel value={InfoCardTabs.DISCIPLINE}>
            {loading ? (
              <Skeleton {...skeletonProps} width={400} height={25} />
            ) : (
              <TextWithLinks
                infoText={event?.disciplineInfo}
                defaultText="Інформація про дисципліну відсутня"
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ScheduleInfoCard;
