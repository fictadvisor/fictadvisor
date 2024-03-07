import React, { FC } from 'react';
import {
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  CathedraColors,
  RoleColors,
  TagText,
} from '@/components/common/ui/cards/card-roles/CardRoles';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Teacher } from '@/types/teacher';

import TableActions from './components/table-actions';
import TeachersSkeleton from './components/teachers-skeleton';
import * as styles from './TeachersTable.styles';

interface TeachersAdminSearchProps {
  teachers?: Teacher[];
  isLoading?: boolean;
  count: number;
  deleteTeacher: (id: string) => Promise<void>;
}

const TeachersTable: FC<TeachersAdminSearchProps> = ({
  teachers,
  isLoading,
  count,
  deleteTeacher,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={mergeSx(styles.headItem, { minWidth: '525px' })}>
          Викладач
        </TableCell>
        <TableCell sx={styles.headItem}>Кафедри</TableCell>
        <TableCell sx={styles.headItem}>Теги</TableCell>
        <TableCell sx={styles.headItem} />
      </TableHead>
      <TableBody>
        {isLoading && (
          <>
            {Array.from({ length: count }, (_, index) => (
              <TeachersSkeleton key={index} />
            ))}
          </>
        )}
        {teachers &&
          teachers.map((teacher, index) => (
            <TableRow key={index}>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Avatar src={teacher.avatar} sx={{ width: 36, height: 36 }} />
                  <Typography sx={{ ml: '16px' }}>
                    {teacher.lastName} {teacher.firstName[0]}.{' '}
                    {teacher.middleName[0]}.
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  {teacher.cathedras.map(cathedra => (
                    <Tag
                      key={cathedra.id}
                      text={cathedra.abbreviation}
                      variant={TagVariant.OUTLINE}
                      color={CathedraColors[cathedra.abbreviation]}
                      size={TagSize.SMALL}
                      sx={styles.tag}
                    />
                  ))}
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  {teacher.roles.map(role => (
                    <Tag
                      key={role}
                      text={TagText[role]}
                      variant={TagVariant.FILL}
                      color={RoleColors[role]}
                      size={TagSize.SMALL}
                      sx={styles.tag}
                    />
                  ))}
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <TableActions teacher={teacher} deleteTeacher={deleteTeacher} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TeachersTable;
