import React, { FC, SetStateAction } from 'react';
import { GroupRoles } from '@fictadvisor/utils/enums';
import { Avatar, Box, Grid, Typography, useMediaQuery } from '@mui/material';

import * as gridStyles from '@/app/(main)/account/components/group-tab/components/table/grid.styles';
import * as styles from '@/app/(main)/account/components/group-tab/components/table/student-table/components/editing-column/EditingColumn.styles';
import { StudentsTableItem } from '@/app/(main)/account/components/group-tab/components/table/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import theme from '@/styles/theme';
interface TransferCaptainPopupProps {
  rows: StudentsTableItem[];
  newCaptain: string;
  setNewCaptain: React.Dispatch<SetStateAction<string>>;
}

const TransferCaptainPopup: FC<TransferCaptainPopupProps> = ({
  rows,
  newCaptain,
  setNewCaptain,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));

  return (
    <Box>
      <Box>Обери людину зі списку та підтвердь свою дію</Box>
      <Box sx={styles.gridWrapper}>
        <Grid container sx={mergeSx(gridStyles.studentsGrid, { mb: 0 })}>
          {rows
            .filter(row => row.role !== GroupRoles.CAPTAIN)
            .map((row, index) => (
              <Grid
                container
                key={index}
                sx={mergeSx(gridStyles.row, styles.row(row.id === newCaptain))}
                onClick={() => setNewCaptain(row.id)}
              >
                {row.imgSrc && (
                  <Grid item desktop={7} mobile={11}>
                    <Avatar src={row.imgSrc} alt="avatar" />
                    {!isMobile && (
                      <Typography className="name">{row.fullName}</Typography>
                    )}
                    {isMobile && (
                      <Box>
                        <Typography className="name">{row.fullName}</Typography>
                        <Typography className="email">{row.email}</Typography>
                      </Box>
                    )}
                  </Grid>
                )}

                <Grid item desktop={5}>
                  {!isMobile && (
                    <Typography className="email">{row.email}</Typography>
                  )}
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TransferCaptainPopup;
