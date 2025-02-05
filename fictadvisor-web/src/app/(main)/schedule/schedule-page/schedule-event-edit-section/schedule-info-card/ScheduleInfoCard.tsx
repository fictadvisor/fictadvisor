import React, { useState } from 'react';
import { EventTypeEnum } from '@fictadvisor/utils/enums';
import { PERMISSION } from '@fictadvisor/utils/security';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';

import TextWithLinks from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/schedule-info-card/components/TextWithLinks';
import { InfoCardTabs } from '@/app/(main)/schedule/schedule-page/schedule-event-edit-section/types';
import { getStringTime } from '@/app/(main)/schedule/schedule-page/utils/getStringTime';
import Link from '@/components/common/ui/custom-link/CustomLink';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { CloseButton } from '@/components/common/ui/icon-button-mui/variants';
import { Tab, TabContext, TabList, TabPanel } from '@/components/common/ui/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import Tag from '@/components/common/ui/tag';
import { TagColor } from '@/components/common/ui/tag/types';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import PermissionApi from '@/lib/api/permission/PermissionApi';
import { EventResponse } from '@/lib/api/schedule/types/EventResponse';

import { skeletonProps } from '../utils/skeletonProps';

import * as styles from './ScheduleInfoCard.styles';

const TagLabelMapper: Record<string, string> = {
  [EventTypeEnum.LABORATORY]: 'Лабораторна',
  [EventTypeEnum.EXAM]: 'Екзамен',
  [EventTypeEnum.WORKOUT]: 'Відпрацювання',
  [EventTypeEnum.PRACTICE]: 'Практика',
  [EventTypeEnum.LECTURE]: 'Лекція',
  [EventTypeEnum.CONSULTATION]: 'Консультація',
  [EventTypeEnum.OTHER]: 'Інша подія',
};

const TagColorMapper: Record<string, TagColor> = {
  [EventTypeEnum.LABORATORY]: TagColor.MINT,
  [EventTypeEnum.EXAM]: TagColor.VIOLET,
  [EventTypeEnum.WORKOUT]: TagColor.PRIMARY,
  [EventTypeEnum.PRACTICE]: TagColor.ORANGE,
  [EventTypeEnum.LECTURE]: TagColor.INDIGO,
  [EventTypeEnum.CONSULTATION]: TagColor.SUCCESS,
  [EventTypeEnum.OTHER]: TagColor.SECONDARY,
};

interface ScheduleInfoCardProps {
  onEventEditButtonClick: () => void;
  onCloseButtonClick: () => void;
  loading: boolean;
  event?: EventResponse;
}

const ScheduleInfoCard = ({
  onEventEditButtonClick,
  onCloseButtonClick,
  event,
  loading,
}: ScheduleInfoCardProps) => {
  const [tabValue, setTabValue] = useState<InfoCardTabs>(InfoCardTabs.EVENT);
  const { user } = useAuthentication();

  const isDisciplineRelatedType = (
    eventType: string | EventTypeEnum | undefined,
  ) => {
    return eventType !== EventTypeEnum.OTHER;
  };

  const requiredPermissions = [
    PERMISSION.GROUPS_$GROUPID_EVENTS_DELETE,
    PERMISSION.GROUPS_$GROUPID_EVENTS_UPDATE,
  ];

  const { data: validPrivilege } = useQuery({
    queryKey: [user?.group?.id, ...requiredPermissions],
    queryFn: () =>
      PermissionApi.check({
        permissions: [...requiredPermissions],
        values: {
          groupId: user?.group?.id,
        },
      }),
    retry: false,
    select({ permissions }) {
      return requiredPermissions
        .map(permission => permissions[permission])
        .every(value => value);
    },
    refetchOnWindowFocus: false,
    enabled: !!user && !!user.group,
  });

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
