import React, { useState } from 'react';
import { PERMISSION } from '@fictadvisor/utils/security';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Avatar, Box, Grid, Typography, useMediaQuery } from '@mui/material';

import roleNamesMapper from '@/app/(main)/account/components/group-tab/components/table/constants';
import EditingColumn from '@/app/(main)/account/components/group-tab/components/table/student-table/components/editing-column/EditingColumn';
import { TextAreaPopup } from '@/app/(main)/account/components/group-tab/components/text-area-popup';
import { Captain } from '@/components/common/icons/Captain';
import { Moderator } from '@/components/common/icons/Moderator';
import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { IconButtonColor } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonShape } from '@/components/common/ui/icon-button-mui/types';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import ExportButton from '@/components/common/ui/icon-button-mui/variants/ExportButton/ExportButton';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import Tooltip from '@/components/common/ui/tooltip';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';
import GroupService from '@/lib/services/group/GroupService';
import theme from '@/styles/theme';
import { UserGroupRole } from '@/types/user';

import * as gridStyles from '../grid.styles';
import { StudentsTableProps } from '../types';

import * as styles from './StudentsTable.styles';

const StudentsTable: React.FC<StudentsTableProps> = ({
  permissions,
  rows,
  refetch,
  onSortButtonClick,
  order,
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

  const handleExport = async () => {
    try {
      if (user.group?.id) {
        const linkResponse = await GroupAPI.getGroupListUrl(user.group?.id);

        if (linkResponse.url) {
          window.open(linkResponse.url);
        }
      }
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
      <Box sx={styles.dividerWrapper}>
        <Divider
          text="Студенти"
          textAlign={DividerTextAlign.LEFT}
          sx={{ flexGrow: 1 }}
        />
        {permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_ADD] && (
          <>
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
          </>
        )}
        <IconButton
          sx={styles.iconButton(isMobile)}
          shape={IconButtonShape.SQUARE}
          icon={
            order === GroupService.Order.ascending ? (
              <BarsArrowDownIcon />
            ) : (
              <BarsArrowUpIcon />
            )
          }
          color={IconButtonColor.SECONDARY}
          onClick={onSortButtonClick}
        />
        {permissions[PERMISSION.GROUPS_$GROUPID_LIST_GET] && (
          <>
            {isMobile ? (
              <ExportButton
                size={IconButtonSize.NORMAL}
                onClick={handleExport}
              />
            ) : (
              <Tooltip title="Список студентів у форматі CSV">
                <Box>
                  <ExportButton
                    sx={styles.iconButtonSeparated(isMobile)}
                    size={IconButtonSize.NORMAL}
                    onClick={handleExport}
                  />
                </Box>
              </Tooltip>
            )}
          </>
        )}
      </Box>
      <Grid container sx={gridStyles.studentsGrid}>
        {rows.map((row, index) => (
          <Grid container key={index} sx={gridStyles.row}>
            <Grid item desktop={4} mobile={9}>
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
              {
                <EditingColumn
                  student={row}
                  permissions={permissions}
                  refetch={refetch}
                  rows={rows}
                />
              }
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default StudentsTable;
