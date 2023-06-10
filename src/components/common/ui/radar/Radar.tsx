import React, { FC } from 'react';
import { Radar } from 'react-chartjs-2';
import { Box, useMediaQuery } from '@mui/material';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import getData from '@/components/common/ui/radar/utils/drawData';
import getBackgroundImage from '@/components/common/ui/radar/utils/findImage';
import getOptions from '@/components/common/ui/radar/utils/getOptions';
import theme from '@/styles/theme';

import * as styles from './Radar.styles';

ChartJS.register(
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
interface RadarProps {
  info: {
    name: string;
    amount: number;
    type: string;
    mark: number;
  }[];
}

const RadarChart: FC<RadarProps> = ({ info }) => {
  const labels = info.map(a => a.name);
  const data = getData(info.map(({ mark }) => mark));
  const options = getOptions();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopSemiMedium'));
  return (
    <Box sx={styles.background(isMobile)}>
      <Radar options={options} data={data} />
      {getBackgroundImage(labels, isMobile, [
        'Lecturer',
        'Practician',
        'Laborant',
      ])}
    </Box>
  );
};

export default RadarChart;
