import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import { Captain } from '@/components/common/icons/Captain';
import { Moderator } from '@/components/common/icons/Moderator';
import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonShape } from '@/components/common/ui/icon-button-mui/types';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import roleNamesMapper from '@/components/pages/account-page/components/group-tab/components/table/constants';
import EditingColumn from '@/components/pages/account-page/components/group-tab/components/table/student-table/components/EditingColumn';
import { TextAreaPopup } from '@/components/pages/account-page/components/group-tab/components/text-area-popup';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';
import theme from '@/styles/theme';
import { UserGroupRole } from '@/types/user';

import * as gridStyles from '../grid.styles';
import { StudentsTableProps } from '../types';

import * as styles from './StudentsTable.styles';
const StudentsTable: React.FC<StudentsTableProps> = ({
  role,
  rows,
  refetch,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useAuthentication();
  const { displayError } = useToastError();
  const handleAddStudents = async (value: string) => {
    try {
      const emails = value
        .split(/[\n\r\t ,]+/)
        .map(line => line.trim())
        .filter(line => line !== '' && line !== '\n');

      if (typeof user.group?.id === 'string')
        await GroupAPI.addStudentsByMail(user.group?.id, { emails });

      setIsPopupOpen(false);

      await refetch();
    } catch (error) {
      displayError(error);
    }
  };
  return (
    <>
      {isPopupOpen && (
        <TextAreaPopup
          handleSubmit={handleAddStudents}
          closeFunction={() => setIsPopupOpen(false)}
        />
      )}
      {role !== UserGroupRole.STUDENT && (
        <Box sx={styles.dividerWrapper}>
          <Divider
            text="Студенти"
            textAlign={DividerTextAlign.LEFT}
            sx={{ flexGrow: 1 }}
          />
          {isMobile ? (
            <IconButton
              icon={<PlusIcon />}
              shape={IconButtonShape.SQUARE}
              onClick={() => setIsPopupOpen(true)}
            />
          ) : (
            <Button
              sx={styles.button}
              text={'Додати студента'}
              startIcon={<PlusIcon className={'icon'} />}
              onClick={() => setIsPopupOpen(true)}
            />
          )}
        </Box>
      )}

      <Grid container sx={gridStyles.studentsGrid}>
        {rows.map((row, index) => (
          <Grid container key={index} sx={gridStyles.row}>
            {row.imgSrc && (
              <Grid item desktop={4} mobile={9}>
                <img width={48} height={48} src={row.imgSrc} alt="avatar" />
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
            <Grid item desktop={2} mobile={1}>
              {row.role !== UserGroupRole.STUDENT && isMobile && (
                <Tag
                  size={TagSize.SMALL}
                  icon={
                    row.role === UserGroupRole.CAPTAIN ? (
                      <Captain />
                    ) : (
                      <Moderator />
                    )
                  }
                  text=""
                  sx={styles.tag}
                />
              )}
              {row.role !== UserGroupRole.STUDENT && !isMobile && (
                <Tag
                  text={roleNamesMapper[row.role]}
                  variant={TagVariant.DARKER}
                  size={TagSize.SMALL}
                />
              )}
            </Grid>

            <Grid item desktop={3}>
              {!isMobile && (
                <Typography className="email">{row.email}</Typography>
              )}
            </Grid>
            <Grid item mobile={2} desktop={3}>
              {<EditingColumn student={row} refetch={refetch} />}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default StudentsTable;
