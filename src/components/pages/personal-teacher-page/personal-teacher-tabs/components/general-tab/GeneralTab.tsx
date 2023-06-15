import React, { FC, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CircleDiagram from '@/components/common/ui/circle-diagram';
import ColumnChart from '@/components/common/ui/column-chart';
import LineGraph from '@/components/common/ui/line_graph';
import Radar from '@/components/common/ui/radar';
import FillerBox from '@/components/pages/personal-teacher-page/personal-teacher-tabs/components/general-tab/components';
import { TeacherRoles } from '@/lib/api/teacher/dto/GetTeacherDTO';
import {
  AmountMarkType,
  GetTeacherMarksDTO,
  RadarCircleMarkType,
} from '@/lib/api/teacher/dto/GetTeacherMarksDTO';
import theme from '@/styles/theme';

import * as styles from './GeneralTab.styles';

interface GeneralTabProps {
  marks: GetTeacherMarksDTO['marks'];
  roles: TeacherRoles[];
}

const GeneralTab: FC<GeneralTabProps> = ({ marks, roles }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  const isLargeDesktop = useMediaQuery(
    theme.breakpoints.up('desktopSemiLarge'),
  );

  const handleClick = () => {
    setOpen(!open);
  };

  const updatedMarks = Object.values(marks);

  const radarMarks = updatedMarks?.filter(
    mark => mark.type === 'RADAR',
  ) as RadarCircleMarkType[];

  const circleMarks = updatedMarks?.filter(
    mark => mark.type === 'CIRCLE',
  ) as RadarCircleMarkType[];

  const columnMarks = updatedMarks?.filter(
    mark => mark.type === 'AMOUNT',
  ) as AmountMarkType[];

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.marksNumber}>
        Кількість респондентів: {updatedMarks[0].amount}
      </Typography>
      <Box sx={styles.radarWrapper}>
        <Radar marks={radarMarks} roles={roles} />
      </Box>
      {isMobile && (
        <List sx={styles.list}>
          <ListItemButton onClick={handleClick} sx={styles.listButton(open)}>
            <ListItemText primary="Детальніше" />
            <ChevronUpIcon />
          </ListItemButton>
          <Collapse in={open} timeout="auto" sx={styles.collapse}>
            {radarMarks.map((mark, index) => (
              <List key={mark.name} component="div">
                <LineGraph
                  label={`${index + 1}. ${mark.name}`}
                  value={mark.mark}
                />
              </List>
            ))}
          </Collapse>
        </List>
      )}
      <Box sx={styles.circleWrapper}>
        {circleMarks.map(mark => (
          <Box key={mark.name} sx={styles.circleGraph}>
            <CircleDiagram value={mark.mark} />
            <Typography variant="body1" sx={styles.circleGraphNameWrapper}>
              {mark.name}
            </Typography>
          </Box>
        ))}
        {!isLargeDesktop && <FillerBox width={isMobile ? '150px' : '200px'} />}
      </Box>
      <Box sx={styles.columnWrapper}>
        {columnMarks.map(mark => (
          <ColumnChart key={mark.name} data={mark} />
        ))}
        {!isLargeDesktop && <FillerBox width="404px" />}
      </Box>
    </Box>
  );
};

export default GeneralTab;
