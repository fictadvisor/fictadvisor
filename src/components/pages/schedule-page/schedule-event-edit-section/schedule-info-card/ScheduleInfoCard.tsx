import React, { FC, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import Link from '@/components/common/ui/custom-link/CustomLink';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonSize,
} from '@/components/common/ui/icon-button-mui/types';
import { CloseButton } from '@/components/common/ui/icon-button-mui/variants';
import { Tab, TabContext, TabList, TabPanel } from '@/components/common/ui/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import Tag from '@/components/common/ui/tag';
import { TagColor } from '@/components/common/ui/tag/types';
import { InfoCardTabs } from '@/components/pages/schedule-page/schedule-event-edit-section/types';
import { getStringTime } from '@/components/pages/schedule-page/utils/getStringTime';
import { DetailedEventBody } from '@/lib/api/schedule/types/DetailedEventBody';
import { TDiscipline } from '@/types/schedule';

import { skeletonProps } from '../utils/skeletonProps';

import * as styles from './ScheduleInfoCard.styles';

const TagLabelMapper: Record<string, string> = {
  [TDiscipline.LECTURE]: 'Лекція',
  [TDiscipline.EXAM]: 'Екзмаен',
  [TDiscipline.LABORATORY]: 'Лабораторна',
  [TDiscipline.CONSULTATION]: 'Консультація',
  [TDiscipline.PRACTICE]: 'Практика',
  [TDiscipline.WORKOUT]: 'Тренування',
  ['null']: 'Інша подія',
};

const TagColorMapper: Record<string, TagColor> = {
  [TDiscipline.LECTURE]: TagColor.INDIGO,
  [TDiscipline.EXAM]: TagColor.VIOLET,
  [TDiscipline.LABORATORY]: TagColor.MINT,
  [TDiscipline.CONSULTATION]: TagColor.VIOLET,
  [TDiscipline.PRACTICE]: TagColor.ORANGE,
  [TDiscipline.WORKOUT]: TagColor.VIOLET,
  ['null']: TagColor.VIOLET,
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

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        {loading ? (
          <Skeleton {...skeletonProps} width={350} height={50} />
        ) : (
          <Typography variant="h5">{event?.name}</Typography>
        )}
        <Box sx={{ display: 'flex' }}>
          <IconButton
            color={IconButtonColor.TRANSPARENT}
            icon={<PencilSquareIcon width={36} height={36} />}
            onClick={loading ? () => {} : onEventEditButtonClick}
          />
          <CloseButton onClick={onCloseButtonClick} />
        </Box>
      </Box>
      <Box sx={styles.content}>
        <Typography variant="body1Medium">Тип</Typography>
        {loading ? (
          <Skeleton {...skeletonProps} width={100} height={25} />
        ) : (
          <Tag
            text={TagLabelMapper[event!.disciplineType]}
            color={TagColorMapper[event!.disciplineType]}
          />
        )}
        <Typography variant="body1Medium">Викладач</Typography>
        <Box sx={styles.teachersContainer}>
          {loading ? (
            <Skeleton {...skeletonProps} width={200} height={45} />
          ) : !event!.teachers || event!.teachers.length === 0 ? (
            <Typography variant="body1Medium">
              Інформація про викладачів відстуня
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
            <Tab
              disableRipple
              label="Про дисципліну"
              textPosition={TabTextPosition.CENTER}
              value={InfoCardTabs.DISCIPLINE}
            />
          </TabList>

          <TabPanel value={InfoCardTabs.EVENT}>
            {loading ? (
              <Skeleton {...skeletonProps} width={400} height={25} />
            ) : (
              <Typography sx={{ whiteSpace: 'pre-line' }}>
                {event?.eventInfo ?? 'Інформація про подію відстуня'}
              </Typography>
            )}
          </TabPanel>
          <TabPanel value={InfoCardTabs.DISCIPLINE}>
            {loading ? (
              <Skeleton {...skeletonProps} width={400} height={25} />
            ) : (
              <Typography sx={{ whiteSpace: 'pre-line' }}>
                {event?.disciplineInfo ?? 'Інформація про дисципліну відстуня'}
              </Typography>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ScheduleInfoCard;
